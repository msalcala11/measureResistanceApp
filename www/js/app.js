// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $templateCache, $rootScope, $interval, $timeout) {

  // Load a random value to populate the knob
  $rootScope.currentValue = 41;
  $rootScope.weight = 0;

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
    $rootScope.newResistance = parseFloat(data);
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
      templateUrl: 'enter-weight.html',
      controller: 'enterWeightCtrl'
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
    initiateLoader($rootScope.currentValue);

    // Set knobInitiated to true so we can unhide the now not-so-ugly knob
    $scope.knobInitiated = true;
  })
  
             
})

.controller('enterWeightCtrl', function($scope, $rootScope, $timeout, $interval, $state) {
  $scope.fullWeight = 0;

  $scope.storeWeight = function(){
    $rootScope.weight = parseFloat($scope.fullWeight);
    $state.go("measuring");
  }
  //console.log($rootScope.currentValue)
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
    if($scope.progressValue < 99 && typeof $rootScope.newResistance === "undefined")
      $scope.progressValue++;

    else if(typeof $rootScope.newResistance === "undefined"){
      // wait to get resistance
    }
    else {
      $scope.progressValue = 100;
      // cancel the interval since it appears to be global accross all controllers
      $interval.cancel(incrementProgress);

      console.log("about to compute regression")
      // Define our leanMass regression coefficients
      var B0 = -13.36117;
      var B1 = 0.0085998;
      var B2 = 0.5964701;

      // Define our waterMass regression coefficients
      var C0 = 14.35698;
      var C1 = -0.0079816;
      var C2 = 0.3226745;

      $rootScope.newResistance = 600;
      console.log("$rootScope.weight: " + $rootScope.weight);
      //$rootScope.weight = 130;
      // Let's compute the regressionjquery.classyloader.js
      var leanMass = B0 + B1*$rootScope.newResistance + B2*$rootScope.weight;
      console.log("leanMass: " + leanMass)
      var waterMass = 0.35*$rootScope.weight;//C0 + C1*$rootScope.newResistance + C2*$rootScope.weight;
      console.log("waterMass: " + waterMass)
      var fatMass = $rootScope.weight - leanMass - waterMass;
      console.log("fatMass: " + fatMass)

      // set a random value for the new body fat percentage from (0-100)
      $rootScope.currentValue = Math.floor(100*(fatMass/($rootScope.weight - waterMass))); //Math.floor(Math.random() * 100) + 1;
      console.log("fatPercentage: " + $rootScope.currentValue);
      delete $rootScope.newResistance;
      // Go back to the home state to display the new bodyfat percentage
      $state.go('home');
    }
  }, 100)

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

function initiateLoader(pct){
  console.log("about to do classy")
$('.loader').ClassyLoader({
    speed: 50,
    diameter: 80,
    fontSize: '30px',
    fontFamily: 'Arial',
    fontColor: 'rgb(53, 188, 228)',
    lineColor: 'rgb(53, 188, 228)',
    remainingLineColor: 'rgba(73, 125, 164, 0.1)',
    percentage: pct,
    lineWidth: 20,
    start: 'top',
    //remainingLineColor: 'rgba(200,200,200,0.1)'
});
}
