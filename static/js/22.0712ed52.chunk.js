"use strict";(self.webpackChunkhexa_lite=self.webpackChunkhexa_lite||[]).push([[22,223],{9223:function(t,e,r){r.r(e),r.d(e,{GESTURE_CONTROLLER:function(){return d},createGesture:function(){return b}});var i,n=r(7762),s=r(5671),a=r(3144),u=function(){function t(){(0,s.Z)(this,t),this.gestureId=0,this.requestedStart=new Map,this.disabledGestures=new Map,this.disabledScroll=new Set}return(0,a.Z)(t,[{key:"createGesture",value:function(t){var e;return new c(this,this.newID(),t.name,null!==(e=t.priority)&&void 0!==e?e:0,!!t.disableScroll)}},{key:"createBlocker",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new o(this,this.newID(),t.disable,!!t.disableScroll)}},{key:"start",value:function(t,e,r){return this.canStart(t)?(this.requestedStart.set(e,r),!0):(this.requestedStart.delete(e),!1)}},{key:"capture",value:function(t,e,r){if(!this.start(t,e,r))return!1;var i=this.requestedStart,n=-1e4;if(i.forEach((function(t){n=Math.max(n,t)})),n===r){this.capturedId=e,i.clear();var s=new CustomEvent("ionGestureCaptured",{detail:{gestureName:t}});return document.dispatchEvent(s),!0}return i.delete(e),!1}},{key:"release",value:function(t){this.requestedStart.delete(t),this.capturedId===t&&(this.capturedId=void 0)}},{key:"disableGesture",value:function(t,e){var r=this.disabledGestures.get(t);void 0===r&&(r=new Set,this.disabledGestures.set(t,r)),r.add(e)}},{key:"enableGesture",value:function(t,e){var r=this.disabledGestures.get(t);void 0!==r&&r.delete(e)}},{key:"disableScroll",value:function(t){this.disabledScroll.add(t),1===this.disabledScroll.size&&document.body.classList.add(l)}},{key:"enableScroll",value:function(t){this.disabledScroll.delete(t),0===this.disabledScroll.size&&document.body.classList.remove(l)}},{key:"canStart",value:function(t){return void 0===this.capturedId&&!this.isDisabled(t)}},{key:"isCaptured",value:function(){return void 0!==this.capturedId}},{key:"isScrollDisabled",value:function(){return this.disabledScroll.size>0}},{key:"isDisabled",value:function(t){var e=this.disabledGestures.get(t);return!!(e&&e.size>0)}},{key:"newID",value:function(){return this.gestureId++,this.gestureId}}]),t}(),c=function(){function t(e,r,i,n,a){(0,s.Z)(this,t),this.id=r,this.name=i,this.disableScroll=a,this.priority=1e6*n+r,this.ctrl=e}return(0,a.Z)(t,[{key:"canStart",value:function(){return!!this.ctrl&&this.ctrl.canStart(this.name)}},{key:"start",value:function(){return!!this.ctrl&&this.ctrl.start(this.name,this.id,this.priority)}},{key:"capture",value:function(){if(!this.ctrl)return!1;var t=this.ctrl.capture(this.name,this.id,this.priority);return t&&this.disableScroll&&this.ctrl.disableScroll(this.id),t}},{key:"release",value:function(){this.ctrl&&(this.ctrl.release(this.id),this.disableScroll&&this.ctrl.enableScroll(this.id))}},{key:"destroy",value:function(){this.release(),this.ctrl=void 0}}]),t}(),o=function(){function t(e,r,i,n){(0,s.Z)(this,t),this.id=r,this.disable=i,this.disableScroll=n,this.ctrl=e}return(0,a.Z)(t,[{key:"block",value:function(){if(this.ctrl){if(this.disable){var t,e=(0,n.Z)(this.disable);try{for(e.s();!(t=e.n()).done;){var r=t.value;this.ctrl.disableGesture(r,this.id)}}catch(i){e.e(i)}finally{e.f()}}this.disableScroll&&this.ctrl.disableScroll(this.id)}}},{key:"unblock",value:function(){if(this.ctrl){if(this.disable){var t,e=(0,n.Z)(this.disable);try{for(e.s();!(t=e.n()).done;){var r=t.value;this.ctrl.enableGesture(r,this.id)}}catch(i){e.e(i)}finally{e.f()}}this.disableScroll&&this.ctrl.enableScroll(this.id)}}},{key:"destroy",value:function(){this.unblock(),this.ctrl=void 0}}]),t}(),l="backdrop-no-scroll",d=new u,h=function(t,e,r,i){var n,s,a=v(t)?{capture:!!i.capture,passive:!!i.passive}:!!i.capture;return t.__zone_symbol__addEventListener?(n="__zone_symbol__addEventListener",s="__zone_symbol__removeEventListener"):(n="addEventListener",s="removeEventListener"),t[n](e,r,a),function(){t[s](e,r,a)}},v=function(t){if(void 0===i)try{var e=Object.defineProperty({},"passive",{get:function(){i=!0}});t.addEventListener("optsTest",(function(){}),e)}catch(r){i=!1}return!!i},f=function(t){return t instanceof Document?t:t.ownerDocument},b=function(t){var e=!1,r=!1,i=!0,n=!1,s=Object.assign({disableScroll:!1,direction:"x",gesturePriority:0,passive:!0,maxAngle:40,threshold:10},t),a=s.canStart,u=s.onWillStart,c=s.onStart,o=s.onEnd,l=s.notCaptured,v=s.onMove,b=s.threshold,S=s.passive,k=s.blurOnStart,g={type:"pan",startX:0,startY:0,startTime:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,currentTime:0,event:void 0,data:void 0},X=function(t,e,r){var i=r*(Math.PI/180),n="x"===t,s=Math.cos(i),a=e*e,u=0,c=0,o=!1,l=0;return{start:function(t,e){u=t,c=e,l=0,o=!0},detect:function(t,e){if(!o)return!1;var r=t-u,i=e-c,d=r*r+i*i;if(d<a)return!1;var h=Math.sqrt(d),v=(n?r:i)/h;return l=v>s?1:v<-s?-1:0,o=!1,!0},isGesture:function(){return 0!==l},getDirection:function(){return l}}}(s.direction,s.threshold,s.maxAngle),w=d.createGesture({name:t.gestureName,priority:t.gesturePriority,disableScroll:t.disableScroll}),Y=function(){e&&(n=!1,v&&v(g))},G=function(){return!!w.capture()&&(e=!0,i=!1,g.startX=g.currentX,g.startY=g.currentY,g.startTime=g.currentTime,u?u(g).then(_):_(),!0)},_=function(){k&&function(){if("undefined"!==typeof document){var t=document.activeElement;(null===t||void 0===t?void 0:t.blur)&&t.blur()}}(),c&&c(g),i=!0},E=function(){e=!1,r=!1,n=!1,i=!0,w.release()},D=function(t){var r=e,n=i;E(),n&&(y(g,t),r?o&&o(g):l&&l(g))},I=function(t,e,r,i,n){var s,a,u,c,o,l,d,v=0,b=function(i){v=Date.now()+2e3,e(i)&&(!a&&r&&(a=h(t,"touchmove",r,n)),u||(u=h(i.target,"touchend",p,n)),c||(c=h(i.target,"touchcancel",p,n)))},y=function(i){v>Date.now()||e(i)&&(!l&&r&&(l=h(f(t),"mousemove",r,n)),d||(d=h(f(t),"mouseup",m,n)))},p=function(t){S(),i&&i(t)},m=function(t){k(),i&&i(t)},S=function(){a&&a(),u&&u(),c&&c(),a=u=c=void 0},k=function(){l&&l(),d&&d(),l=d=void 0},g=function(){S(),k()},X=function(){arguments.length>0&&void 0!==arguments[0]&&!arguments[0]?(s&&s(),o&&o(),s=o=void 0,g()):(s||(s=h(t,"touchstart",b,n)),o||(o=h(t,"mousedown",y,n)))};return{enable:X,stop:g,destroy:function(){X(!1),i=r=e=void 0}}}(s.el,(function(t){var e=m(t);return!(r||!i)&&(p(t,g),g.startX=g.currentX,g.startY=g.currentY,g.startTime=g.currentTime=e,g.velocityX=g.velocityY=g.deltaX=g.deltaY=0,g.event=t,(!a||!1!==a(g))&&(w.release(),!!w.start()&&(r=!0,0===b?G():(X.start(g.startX,g.startY),!0))))}),(function(t){e?!n&&i&&(n=!0,y(g,t),requestAnimationFrame(Y)):(y(g,t),X.detect(g.currentX,g.currentY)&&(X.isGesture()&&G()||T()))}),D,{capture:!1,passive:S}),T=function(){E(),I.stop(),l&&l(g)};return{enable:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];t||(e&&D(void 0),E()),I.enable(t)},destroy:function(){w.destroy(),I.destroy()}}},y=function(t,e){if(e){var r=t.currentX,i=t.currentY,n=t.currentTime;p(e,t);var s=t.currentX,a=t.currentY,u=(t.currentTime=m(e))-n;if(u>0&&u<100){var c=(s-r)/u,o=(a-i)/u;t.velocityX=.7*c+.3*t.velocityX,t.velocityY=.7*o+.3*t.velocityY}t.deltaX=s-t.startX,t.deltaY=a-t.startY,t.event=e}},p=function(t,e){var r=0,i=0;if(t){var n=t.changedTouches;if(n&&n.length>0){var s=n[0];r=s.clientX,i=s.clientY}else void 0!==t.pageX&&(r=t.pageX,i=t.pageY)}e.currentX=r,e.currentY=i},m=function(t){return t.timeStamp||Date.now()}},5022:function(t,e,r){r.r(e),r.d(e,{createSwipeBackGesture:function(){return a}});var i=r(1811),n=r(9507),s=r(9223),a=function(t,e,r,a,u){var c=t.ownerDocument.defaultView,o=(0,n.i)(t),l=function(t){return o?-t.deltaX:t.deltaX};return(0,s.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(r){return o=(0,n.i)(t),function(t){var e=t.startX;return o?e>=c.innerWidth-50:e<=50}(r)&&e()},onStart:r,onMove:function(t){var e=l(t)/c.innerWidth;a(e)},onEnd:function(t){var e=l(t),r=c.innerWidth,n=e/r,s=function(t){return o?-t.velocityX:t.velocityX}(t),a=s>=0&&(s>.2||e>r/2),d=(a?1-n:n)*r,h=0;if(d>5){var v=d/Math.abs(s);h=Math.min(v,540)}u(a,n<=0?.01:(0,i.m)(0,n,.9999),h)}})}}}]);
//# sourceMappingURL=22.0712ed52.chunk.js.map