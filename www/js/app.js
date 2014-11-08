// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $templateCache) {

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
homeStr += "            <script>";
homeStr += "            $(function($) {";
homeStr += "                $(\".knob\").knob({";
homeStr += "                    change : function (value) {";
homeStr += "                        \/\/console.log(\"change : \" + value);";
homeStr += "                    },";
homeStr += "                    release : function (value) {";
homeStr += "                        \/\/console.log(this.$.attr('value'));";
homeStr += "                        console.log(\"release : \" + value);";
homeStr += "                    },";
homeStr += "                    cancel : function () {";
homeStr += "                        console.log(\"cancel : \", this);";
homeStr += "                    },";
homeStr += "                    \/*format : function (value) {";
homeStr += "                        return value + '%';";
homeStr += "                    },*\/";
homeStr += "                    draw : function () {";
homeStr += "                        \/\/ \"tron\" case";
homeStr += "                        if(this.$.data('skin') == 'tron') {";
homeStr += "                            this.cursorExt = 0.3;";
homeStr += "                            var a = this.arc(this.cv)  \/\/ Arc";
homeStr += "                                , pa                   \/\/ Previous arc";
homeStr += "                                , r = 1;";
homeStr += "                            this.g.lineWidth = this.lineWidth;";
homeStr += "                            if (this.o.displayPrevious) {";
homeStr += "                                pa = this.arc(this.v);";
homeStr += "                                this.g.beginPath();";
homeStr += "                                this.g.strokeStyle = this.pColor;";
homeStr += "                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);";
homeStr += "                                this.g.stroke();";
homeStr += "                            }";
homeStr += "                            this.g.beginPath();";
homeStr += "                            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;";
homeStr += "                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);";
homeStr += "                            this.g.stroke();";
homeStr += "                            this.g.lineWidth = 2;";
homeStr += "                            this.g.beginPath();";
homeStr += "                            this.g.strokeStyle = this.o.fgColor;";
homeStr += "                            this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 \/ 3, 0, 2 * Math.PI, false);";
homeStr += "                            this.g.stroke();";
homeStr += "                            return false;";
homeStr += "                        }";
homeStr += "                    }";
homeStr += "                });";
homeStr += "                \/\/ Example of infinite knob, iPod click wheel";
homeStr += "                var v, up=0,down=0,i=0";
homeStr += "                    ,$idir = $(\"div.idir\")";
homeStr += "                    ,$ival = $(\"div.ival\")";
homeStr += "                    ,incr = function() { i++; $idir.show().html(\"+\").fadeOut(); $ival.html(i); }";
homeStr += "                    ,decr = function() { i--; $idir.show().html(\"-\").fadeOut(); $ival.html(i); };";
homeStr += "                $(\"input.infinite\").knob(";
homeStr += "                                    {";
homeStr += "                                    min : 0";
homeStr += "                                    , max : 20";
homeStr += "                                    , stopper : false";
homeStr += "                                    , change : function () {";
homeStr += "                                                    if(v > this.cv){";
homeStr += "                                                        if(up){";
homeStr += "                                                            decr();";
homeStr += "                                                            up=0;";
homeStr += "                                                        }else{up=1;down=0;}";
homeStr += "                                                    } else {";
homeStr += "                                                        if(v < this.cv){";
homeStr += "                                                            if(down){";
homeStr += "                                                                incr();";
homeStr += "                                                                down=0;";
homeStr += "                                                            }else{down=1;up=0;}";
homeStr += "                                                        }";
homeStr += "                                                    }";
homeStr += "                                                    v = this.cv;";
homeStr += "                                                }";
homeStr += "                                    });";
homeStr += "            });";
homeStr += "        <\/script>";
homeStr += "";
homeStr += "    <h1 class=\"title app-title\">";
homeStr += "      <span style=\"font-weight:200;\">Fat<\/span>Analyzer";
homeStr += "    <\/h1>";
homeStr += "";
homeStr += "    <div class=\"knob-container\">";
homeStr += "         <input class=\"knob\" data-width=\"200\"";
homeStr += "          data-fgColor=\"#35BCE4\"";
homeStr += "          data-skin=\"tron\"";
homeStr += "          data-thickness=\".2\"";
homeStr += "          data-displayPrevious=true";
homeStr += "          value=\"35\"";
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
enterWeightStr += "        height: 180px;";
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
enterWeightStr += "      <button class=\"button button-block button-balanced\" ui-sref=\"test\">";
enterWeightStr += "      START";
enterWeightStr += "      <\/button>";
enterWeightStr += "    <\/div>";
enterWeightStr += "";









  $templateCache.put("home.html",homeStr);
  $templateCache.put("enter-weight.html",enterWeightStr);

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
      //template: '<p style="color: white;">Hello, world!</p>'
      templateUrl: 'enter-weight.html'
    })
})

.controller('homeCtrl', function($scope) {
  console.log("in home ctrl!")
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
})
