// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $templateCache, $rootScope) {

  var homeStr="";
  homeStr += "    <style>";
  homeStr += "      .knob-container {";
  homeStr += "        margin: auto;";
  homeStr += "        position: absolute;";
  homeStr += "        top: 0; left: 0; bottom: 0; right: 0;";
  homeStr += "        height: 200px;";
  homeStr += "        width: 200px;";
  homeStr += "      }";
  homeStr += "";
  homeStr += "      .measure-button {";
  homeStr += "        position: fixed; ";
  homeStr += "        bottom: 0px; ";
  homeStr += "        width: 100%; ";
  homeStr += "        padding: 10px 20px;";
  homeStr += "      }";
  homeStr += "";
  homeStr += "      .app-title {";
  homeStr += "        color: rgb(53, 188, 228); ";
  homeStr += "        text-align:center; ";
  homeStr += "        margin-top: 30px!important; ";
  homeStr += "        font-size:24px;";
  homeStr += "      }";
  homeStr += "    <\/style>";
  homeStr += "";
  homeStr += "    <h1 class=\"title app-title\">";
  homeStr += "      <span style=\"font-weight:200;\">Fat<\/span>Analyzer";
  homeStr += "    <\/h1>";
  homeStr += "";
  homeStr += "    <div class=\"knob-container\" ng-show='knobInitiated'>";
  homeStr += "         <input class=\"knob\" data-width=\"200\"";
  homeStr += "          data-fgColor=\"#35BCE4\"";
  homeStr += "          data-skin=\"tron\"";
  homeStr += "          data-thickness=\".2\"";
  homeStr += "          data-displayPrevious=true";
  homeStr += "          value=\"{{currentValue}}\"";
  homeStr += "          data-readOnly=true";
  homeStr += "          >";
  homeStr += "    <\/div>";
  homeStr += "";
  homeStr += "    <div class=\"measure-button\">";
  homeStr += "      <button class=\"button button-block button-positive\" ui-sref=\"enterWeight\">";
  homeStr += "      MEASURE";
  homeStr += "      <\/button>";
  homeStr += "    <\/div>";
  homeStr += "";

  var enterWeightStr="";
  enterWeightStr += "    <style>";
  enterWeightStr += "      .input-container {";
  enterWeightStr += "        margin: auto;";
  enterWeightStr += "        position: absolute;";
  enterWeightStr += "        top: 0; left: 0; bottom: 0; right: 0;";
  enterWeightStr += "        height: 100px;";
  enterWeightStr += "        width: 250px;";
  enterWeightStr += "      }";
  enterWeightStr += "";
  enterWeightStr += "      .measure-button {";
  enterWeightStr += "        position: fixed; ";
  enterWeightStr += "        bottom: 0px; ";
  enterWeightStr += "        width: 100%; ";
  enterWeightStr += "        padding: 10px 20px;";
  enterWeightStr += "      }";
  enterWeightStr += "";
  enterWeightStr += "      .app-title {";
  enterWeightStr += "        color: rgb(53, 188, 228); ";
  enterWeightStr += "        text-align:center; ";
  enterWeightStr += "        margin-top: 30px!important; ";
  enterWeightStr += "        font-size:24px;";
  enterWeightStr += "      }";
  enterWeightStr += "    <\/style>";
  enterWeightStr += "";
  enterWeightStr += "    <h1 class=\"title app-title\">";
  enterWeightStr += "      <span style=\"font-weight:200;\">Fat<\/span>Analyzer";
  enterWeightStr += "    <\/h1>";
  enterWeightStr += "";
  enterWeightStr += "    <div class=\"input-container\"";
  enterWeightStr += "      <div class=\"list list-inset\">";
  enterWeightStr += "        <label class=\"item item-input\">";
  enterWeightStr += "          <i class=\"icon ion-ios7-timer-outline placeholder-icon\"><\/i>";
  enterWeightStr += "          <input type=\"number\" placeholder=\"Enter weight in grams\">";
  enterWeightStr += "        <\/label>";
  enterWeightStr += "        <div style=\"color: white; margin-top:20px;\"><span ui-sref='home'>cancel<\/span><\/div>";
  enterWeightStr += "      <\/div>";
  enterWeightStr += "    <\/div>";
  enterWeightStr += "";
  enterWeightStr += "    ";
  enterWeightStr += "";
  enterWeightStr += "    <div class=\"measure-button\">";
  enterWeightStr += "      <button class=\"button button-block button-balanced\" ui-sref=\"measuring\">";
  enterWeightStr += "      START";
  enterWeightStr += "      <\/button>";
  enterWeightStr += "    <\/div>";
  enterWeightStr += "";

  var measuringStr="";
  measuringStr += "    <style>";
  measuringStr += "      .input-container {";
  measuringStr += "        margin: auto;";
  measuringStr += "        position: absolute;";
  measuringStr += "        top: 0; left: 0; bottom: 0; right: 0;";
  measuringStr += "        height: 100px;";
  measuringStr += "        width: 250px;";
  measuringStr += "      }";
  measuringStr += "";
  measuringStr += "      .measure-button {";
  measuringStr += "        position: fixed; ";
  measuringStr += "        bottom: 0px; ";
  measuringStr += "        width: 100%; ";
  measuringStr += "        padding: 10px 20px;";
  measuringStr += "      }";
  measuringStr += "";
  measuringStr += "      .app-title {";
  measuringStr += "        color: rgb(53, 188, 228); ";
  measuringStr += "        text-align:center; ";
  measuringStr += "        margin-top: 30px!important; ";
  measuringStr += "        font-size:24px;";
  measuringStr += "      }";
  measuringStr += "";
  measuringStr += "    <\/style>";
  measuringStr += "";
  measuringStr += "    <h1 class=\"title app-title\">";
  measuringStr += "      <span style=\"font-weight:200;\">Fat<\/span>Analyzer";
  measuringStr += "    <\/h1>";
  measuringStr += "";
  measuringStr += "    <div class=\"input-container\">";
  measuringStr += "    <progress max=\"100\" value=\"{{progressValue}}\"><\/progress>";
  measuringStr += "    <p style=\"text-align:right; color: white;\">{{progressValue}}%<\/p>";
  measuringStr += "<!--       <div class=\"list list-inset\">";
  measuringStr += "        <label class=\"item item-input\">";
  measuringStr += "          <i class=\"icon ion-ios7-timer-outline placeholder-icon\"><\/i>";
  measuringStr += "          <input type=\"number\" placeholder=\"Enter weight in grams\">";
  measuringStr += "        <\/label>";
  measuringStr += "        <div style=\"color: white; margin-top:20px;\"><span ui-sref='home'>cancel<\/span><\/div>";
  measuringStr += "      <\/div> -->";
  measuringStr += "    <\/div>";
  measuringStr += "";
  measuringStr += "    ";
  measuringStr += "";
  measuringStr += "    <div class=\"measure-button\">";
  measuringStr += "      <button class=\"button button-block button-assertive\" ui-sref=\"home\">";
  measuringStr += "      CANCEL";
  measuringStr += "      <\/button>";
  measuringStr += "    <\/div>";
  measuringStr += "";

  // Load our template strings into the template cache
  $templateCache.put("home.html",homeStr);
  $templateCache.put("enter-weight.html",enterWeightStr);
  $templateCache.put("measuring.html",measuringStr);

  // Load a random value to populate the knob
  $rootScope.currentValue = 41;

  $ionicPlatform.ready(function() {
        
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
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
    
    // Run the code to initiate our body fat percentage knob (this should ideally be within a directive)
    initiateKnob();

    // Set knobInitiated to true so we can unhide the now not-so-ugly knob
    $scope.knobInitiated = true;
  })
  
             
})

.controller('measuringCtrl', function($scope, $rootScope, $timeout, $interval, $state) {
  console.log($rootScope.currentValue)
  
  $scope.progressValue = 0;

  incrementProgress = $interval(function(){
    console.log("interval called")
    if($scope.progressValue < 100)
      $scope.progressValue++;

    else{

      // cancel the interval since it appears to be global accross all controllers
      $interval.cancel(incrementProgress);

      // set a random value for the new body fat percentage from (0-100)
      $rootScope.currentValue = Math.floor(Math.random() * 100) + 1;

      // Go back to the home state to display the new bodyfat percentage
      $state.go('home');
    }
  }, 20)

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
