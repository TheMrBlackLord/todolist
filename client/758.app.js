"use strict";(self.webpackChunktodolist=self.webpackChunktodolist||[]).push([[758],{2758:(e,r,t)=>{t.r(r),t.d(r,{default:()=>d});var o=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"container"},[t("div",{staticClass:"row justify-content-center"},[t("div",{staticClass:"col-md-8"},[t("div",{staticClass:"card"},[t("div",{staticClass:"card-header"},[e._v("Login")]),e._v(" "),t("div",{staticClass:"card-body"},[e._l(e.errors,(function(r,o){return t("div",{key:o,staticClass:"alert alert-danger",staticStyle:{display:"flex","justify-content":"space-between"}},[e._v("\n            "+e._s(r)+"\n            "),t("span",{on:{click:function(r){return e.removeError(o)}}},[e._v("×")])])})),e._v(" "),t("form",{on:{submit:function(r){return r.preventDefault(),e.submit.apply(null,arguments)}}},[t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"email"}},[e._v("Email address")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.form.email,expression:"form.email",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"email",id:"email",placeholder:"Enter email",autocomplete:"email"},domProps:{value:e.form.email},on:{input:function(r){r.target.composing||e.$set(e.form,"email",r.target.value.trim())},blur:function(r){return e.$forceUpdate()}}})]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"password"}},[e._v("Password")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.password,expression:"form.password"}],staticClass:"form-control",attrs:{type:"password",id:"password",placeholder:"Password",autocomplete:"current-password"},domProps:{value:e.form.password},on:{input:function(r){r.target.composing||e.$set(e.form,"password",r.target.value)}}})]),e._v(" "),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit",disabled:e.isLoading}},[e._v("\n              Login\n              "),e.isLoading?t("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}):e._e()])])],2)])])])])};o._withStripped=!0;var s=t(3851);function a(e,r,t,o,s,a,n){try{var i=e[a](n),c=i.value}catch(e){return void t(e)}i.done?r(c):Promise.resolve(c).then(o,s)}function n(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?n(Object(t),!0).forEach((function(r){c(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}const l={data:function(){return{form:{email:"",password:""},isLoading:!1}},computed:i({},(0,s.Se)(["errors"])),methods:i(i({},(0,s.OI)(["addError","removeError"])),{},{submit:function(){var e,r=this;return(e=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r.form.email||!r.form.password){e.next=7;break}return r.isLoading=!0,e.next=4,r.$store.dispatch("loginUser",r.form);case 4:r.isLoading=!1,e.next=8;break;case 7:r.addError("Fill all necessary fields");case 8:case"end":return e.stop()}}),e)})),function(){var r=this,t=arguments;return new Promise((function(o,s){var n=e.apply(r,t);function i(e){a(n,o,s,i,c,"next",e)}function c(e){a(n,o,s,i,c,"throw",e)}i(void 0)}))})()}})};var u=(0,t(1900).Z)(l,o,[],!1,null,null,null);u.options.__file="static/components/auth/Login.vue";const d=u.exports}}]);