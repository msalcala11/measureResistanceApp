// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $templateCache, $rootScope, $interval, $timeout) {

  // Load a random value to populate the knob
  $rootScope.currentValue = 41;

  // Create a global ble connected status variable for use with ng-show/ng-hide
  $rootScope.connected = false;

  $ionicPlatform.ready(function() {
        
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // monitor ble connectivity status every second
    $rootScope.monitorConnectivity = function(){
      $interval(function(){
        bluetoothSerial.isConnected(
            function() {
                console.log("bluetooth connected");
                $rootScope.connected = true;
            },
            function() {
                $rootScope.connected = false;

                // If we are not already trying to connect, attempt to reconnect
                if(!$rootScope.connecting){

                  $timeout(function(){
                    console.log("attempting to RECONNECT")
                    $rootScope.connecting = true;
                    $rootScope.initiateConnection();

                  }, 1000)

                }
                console.log("Bluetooth is *not* connected");
            }
        );
      }, 1000)
    }();

    $rootScope.initiateConnection = function(){
      console.log("running initiateConnection..")
      // Let's scan the environment for a ble device with the name "BLE Shield"
      bluetoothSerial.list(function(devices) {
          console.log("in success callback")

          if(devices.length === 0)
            return $rootScope.connecting = false;

          var bleShield = _.findWhere(devices, {name: "BLE Shield"});

          // JSON output of bleShield looks like this:
          //[{"id":"55174456-779D-D60E-82D4-EA927560790C","name":"BLE Shield","uuid":"55174456-779D-D60E-82D4-EA927560790C"}]
          
          // Now that we have found the bleShield and have its id, lets connect!
          bluetoothSerial.connect(bleShield.uuid, $rootScope.connnectSuccess, function(){$rootScope.connecting = false;});
      }, function(){
        console.log("in fail callback")
      });

    }

  $rootScope.gotMessage = function(data){
    // This function gets called when we receive the resistance measurement from the arduino
    console.log(data)
    $rootScope.newResistance = data;
    // console.log("about to write back")
    // bluetoothSerial.write("got it!", function(){
    //   console.log("wrote");
    // }, function(){
    //   console.log("failed write");
    // });
  }

  $rootScope.connnectSuccess = function (){
    console.log("We connected via bluetooth");
    console.log("attempting to subscribez")
    $rootScope.connecting = false;
    // $rootScope.connected = true;
    // $scope.connected = true;
    console.log("connected: " + $rootScope.connected)

    bluetoothSerial.subscribe("\n", $rootScope.gotMessage, function(){
      console.log("got an error..");
    });
  }


  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('home', {
      url: '/',
      //template: '<p style="color: white;">Hello, world!</p>'
      templateUrl: 'home.html',
      controller: 'homeCtrl'
    })

    .state('enterWeight', {
      url: '/enterWeight',
      templateUrl: 'enter-weight.html'
    })

    .state('measuring', {
      url: '/measuring',
      templateUrl: 'measuring.html',
      controller: 'measuringCtrl'
    })
})

.controller('homeCtrl', function($scope, $rootScope, $timeout) {

  $timeout(function(){

    if(!$rootScope.connected)
      $rootScope.initiateConnection();

    // // Let's scan the environment for a ble device with the name "BLE Shield"
    // bluetoothSerial.list(function(devices) {
    //     console.log("in success callback")
    //     var bleShield = _.findWhere(devices, {name: "BLE Shield"});

    //     // JSON output of bleShield looks like this:
    //     //[{"id":"55174456-779D-D60E-82D4-EA927560790C","name":"BLE Shield","uuid":"55174456-779D-D60E-82D4-EA927560790C"}]
        
    //     // Now that we have found the bleShield and have its id, lets connect!
    //     bluetoothSerial.connect(bleShield.uuid, $scope.connnectSuccess, connectFailure);
    // }, function(){
    //   console.log("in fail callback")
    // });

  }, 1000)


  // $scope.gotMessage = function(data){
  //   // This function gets called when we receive the resistance measurement from the arduino
  //   console.log(data)
  //   $rootScope.newResistance = data;
  //   // console.log("about to write back")
  //   // bluetoothSerial.write("got it!", function(){
  //   //   console.log("wrote");
  //   // }, function(){
  //   //   console.log("failed write");
  //   // });
  // }

  // $scope.connnectSuccess = function (){
  //   console.log("We connected via bluetooth");
  //   console.log("attempting to subscribez")

  //   // $rootScope.connected = true;
  //   // $scope.connected = true;
  //   console.log("connected: " + $rootScope.connected)

  //   bluetoothSerial.subscribe("\n", $scope.gotMessage, function(){
  //     console.log("got an error..");
  //   });
  // }

  function connectFailure(){
    console.log("Could not connect");
  }

	function gotMessageError(error){
    // If there is an error receiving the resistance measurement from the arduino, this function 
    // gets called
		console.log("error")
	}

  $timeout(function(){
    
    // Run the code to initiate our body fat percentage knob (this should ideally be within a directive)
    initiateKnob();

    // Set knobInitiated to true so we can unhide the now not-so-ugly knob
    $scope.knobInitiated = true;
  })
  
             
})

.controller('measuringCtrl', function($scope, $rootScope, $timeout, $interval, $state) {
  console.log($rootScope.currentValue)

  bluetoothSerial.write("start_test", function(){
      console.log("started_test");
    }, function(){
      console.log("failed to start_test");
    });
  
  $scope.progressValue = 0;

  incrementProgress = $interval(function(){
    console.log("interval called")
    if($scope.progressValue < 99)
      $scope.progressValue++;

    else if(typeof $rootScope.newResistance === "undefined"){
      // wait to get resistance
    }
    else {

      // cancel the interval since it appears to be global accross all controllers
      $interval.cancel(incrementProgress);

      // set a random value for the new body fat percentage from (0-100)
      $rootScope.currentValue = Math.floor(Math.random() * 100) + 1;

      delete $rootScope.newResistance;
      // Go back to the home state to display the new bodyfat percentage
      $state.go('home');
    }
  }, 130)

  $scope.cancelMeasurement = function(){
    $interval.cancel(incrementProgress);
    $state.go('home');
  }

})

function initiateKnob(){

  // This function is used to initialize the jQuery knob used to display the body fat percentage
  // to the user in the home state

   $(function($) {
                $(".knob").knob({
                    change : function (value) {
                        //console.log("change : " + value);
                    },
                    release : function (value) {
                        //console.log(this.$.attr('value'));
                        console.log("release : " + value);
                    },
                    cancel : function () {
                        console.log("cancel : ", this);
                    },
                    /*format : function (value) {
                        return value + '%';
                    },*/
                    draw : function () {
                        // "tron" case
                        if(this.$.data('skin') == 'tron') {
                            this.cursorExt = 0.3;
                            var a = this.arc(this.cv)  // Arc
                                , pa                   // Previous arc
                                , r = 1;
                            this.g.lineWidth = this.lineWidth;
                            if (this.o.displayPrevious) {
                                pa = this.arc(this.v);
                                this.g.beginPath();
                                this.g.strokeStyle = this.pColor;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                                this.g.stroke();
                            }
                            this.g.beginPath();
                            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                            this.g.stroke();
                            this.g.lineWidth = 2;
                            this.g.beginPath();
                            this.g.strokeStyle = this.o.fgColor;
                            this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                            this.g.stroke();
                            return false;
                        }
                    }
                });
                // Example of infinite knob, iPod click wheel
                var v, up=0,down=0,i=0
                    ,$idir = $("div.idir")
                    ,$ival = $("div.ival")
                    ,incr = function() { i++; $idir.show().html("+").fadeOut(); $ival.html(i); }
                    ,decr = function() { i--; $idir.show().html("-").fadeOut(); $ival.html(i); };
                $("input.infinite").knob(
                                    {
                                    min : 0
                                    , max : 20
                                    , stopper : false
                                    , change : function () {
                                                    if(v > this.cv){
                                                        if(up){
                                                            decr();
                                                            up=0;
                                                        }else{up=1;down=0;}
                                                    } else {
                                                        if(v < this.cv){
                                                            if(down){
                                                                incr();
                                                                down=0;
                                                            }else{down=1;up=0;}
                                                        }
                                                    }
                                                    v = this.cv;
                                                }
                                    });
            });

}
