(()=>{"use strict";var e,t,n,r={362:(e,t,n)=>{var r=n(294),a=n(745),o=n(655),c=n(250);const l=function(e){var t=e.tag,n=void 0===t?"span":t,a=e.name,o=void 0===a?"":a,c=e.classes,l=void 0===c?"":c,i=e.children,s=void 0===i?"":i;return r.createElement(n,{className:"fa-".concat(o," ").concat(l)},s)};const i=function(e){var t=e.children,n=void 0===t?null:t,a=e.classes,o=void 0===a?"":a;return r.createElement("div",{className:"ps-container ".concat(o)},n)};var s=n(152),u=n(466),m=n(671),p=n(136),f=n(930),d=n(120);function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,d.Z)(e);if(t){var a=(0,d.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,f.Z)(this,n)}}const v=function(e){(0,p.Z)(n,e);var t=h(n);function n(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return(0,m.Z)(this,n),(e=t.call(this,r)).name="CustomHookError",e.date=new Date,e}return(0,u.Z)(n)}((0,n(407).Z)(Error));var E=769,b={desktop:"(min-width: ".concat(1200,"px)"),"till-tablet":"(max-width: ".concat(E,"px)"),tablet:"(min-width: ".concat(E,"px) and (max-width: ").concat(1200,"px)"),"from-tablet":"(min-width: ".concat(E,"px)"),"from-smallphone":"(min-width: ".concat(428,"px)"),"from-smallphone-till-tablet":"(min-width: ".concat(428,"px) and (max-width: ").concat(E,"px)"),smallphone:"(max-width: ".concat(429,"px)")};const _=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,n=t||b[e]||"";if(!n)throw new v("useMQ hook error: invalid deviceOption parameter - ".concat(e));var a=(0,r.useState)(!1),o=(0,s.Z)(a,2),c=o[0],l=o[1],i=function(){var e=window.matchMedia(n).matches;l((function(t){return e!==t?e:t}))};return(0,r.useEffect)((function(){return window.addEventListener("resize",i),i(),function(){window.removeEventListener("resize",i)}}),[]),c};const g=function(e){var t=e.deviceOption,n=void 0===t?"":t,a=e.customQueryString,o=void 0===a?"":a,c=e.children,l=void 0===c?null:c;return _(n,o)?r.createElement(r.Fragment,null,l):null};r.Global={Icon:l,Container:i,Mq:g};var y={primary:"#003459",secondary:"#F7DBA7",background_0:"#FDFDFD",background_1:"#EBEEEF",text_0:"#00171F",text_1:"#003459",warning:"#FF564F",neautral_light:"#FDFDFD",neautral_light_1:"#EBEEEF",neautral_light_2:"#CCD1D2",neautral_dark:"#242B33",neautral_dark_1:"#667479",neautral_dark_2:"#99A2A5"}||{};const w=function(){var e=Object.entries(y).map((function(e){var t=(0,s.Z)(e,2),n=t[0],r=t[1];return"  --".concat(n,": ").concat(r,";\r\n")})).join("");return r.createElement("style",null,":root {\r\n"+e+"}")};var N=r.Global,x=N.Icon,O=N.Container,k=[{name:"github",url:"https://github.com/SebinSong"},{name:"heart",url:"https://www.linkedin.com/in/sebinsong/"}],F=function(){return k.map((function(e){var t=e.name,n=void 0===t?"":t,a=e.url,o=void 0===a?"#":a;return r.createElement("a",{className:"app-footer__sns-icon-link",href:o,key:n,target:"_blank"},r.createElement(x,{name:n,tag:"i"}))}))};const S=function(){return r.createElement("footer",{className:"p-footer app-footer"},r.createElement(O,{classes:"app-footer__container"},r.createElement("div",{className:"app-footer__logo"},r.createElement("img",{src:"images/logo.svg"}),r.createElement("h1",null,"Proshop")),r.createElement("div",{className:"app-footer__right-statement"},"© Copyright 2022",r.createElement("span",{className:"shop-name"},"Proshop"),".",r.createElement("br",{className:"right-statement__line-break"}),"All Rights Reserved."),r.createElement("div",{className:"app-footer__sns-icons"},r.createElement(F,null))))};var Z=r.Global.Icon;const j=function(e){var t=e.placeholder,n=void 0===t?"":t;return r.createElement("div",{className:"searchbar app-header__searchbar"},r.createElement("input",{className:"searchbar-input",type:"text","aria-label":"Header search bar",autoComplete:"off",placeholder:n}),r.createElement("button",{className:"searchbar-icon icon",type:"button","aria-label":"Search button"},r.createElement(Z,{name:"search"})))};var C=r.Global,P=C.Icon,R=C.Mq;const D=function(){var e="(max-width: 600px)",t=_(null,e),n=(0,r.useState)(!1),a=(0,s.Z)(n,2),o=a[0],c=a[1];return r.createElement("header",{className:"l-toolbar app-header"},r.createElement("div",{className:"app-header__content"},r.createElement("div",{className:"app-header__branding"},r.createElement("img",{className:"app-header__logo",src:"images/logo.svg",alt:"A tiny shop logo"}),r.createElement("h1",{className:"app-header__app-title"},"Proshop")),r.createElement("div",{className:"app-header__menu-container"},r.createElement("button",{className:"app-header__menu-btn"},r.createElement("span",{className:"menu-btn__wrap"},r.createElement("span",{className:"text"},"Cart"),r.createElement(P,{tag:"i",name:"cart"}))),r.createElement("button",{className:"app-header__menu-btn"},r.createElement("span",{className:"menu-btn__wrap"},r.createElement("span",{className:"text"},"Sign in"),r.createElement(P,{tag:"i",name:"sign-in"}))),r.createElement(R,{customQueryString:e},r.createElement("button",{className:"app-header__menu-btn",onClick:function(){return c((function(e){return!e}))}},r.createElement("span",{className:"menu-btn__wrap"},r.createElement(P,{tag:"i",name:"search"}))))),!t||o?r.createElement("div",{className:"app-header__search-bar-container"},r.createElement(j,{placeholder:"Serch Products..."})):null))};var B=r.Global.Container;const M=function(e){return r.createElement(r.Fragment,null,r.createElement(w,null),r.createElement("div",{className:"app-container app-layout"},r.createElement(D,null),r.createElement("main",{className:"l-page"},r.createElement(B,{classes:"p-content"},r.createElement(c.j3,null)),r.createElement(S,null))))};function A(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,d.Z)(e);if(t){var a=(0,d.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,f.Z)(this,n)}}const G=function(e){(0,p.Z)(n,e);var t=A(n);function n(e){var r;return(0,m.Z)(this,n),(r=t.call(this,e)).state={isError:!1},r}return(0,u.Z)(n,[{key:"componentDidCatch",value:function(e,t){console.error("error thrown: ",e)}},{key:"render",value:function(){return this.state.isError?r.createElement("main",null,"404 not found"):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{isError:!0}}}]),n}(r.Component);function I(){return r.createElement(r.Fragment,null,r.createElement("p",null,"This is 'Home' page"))}var q=(0,o.cP)([{path:"/",element:r.createElement(M,null),errorElement:r.createElement(G,null),children:[{index:!0,element:r.createElement(I,null)}]}]),H=(0,a.s)(document.querySelector("#root"));H.render(r.createElement(c.pG,{router:q})),console.log("init React App: ",H)}},a={};function o(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={exports:{}};return r[e](n,n.exports,o),n.exports}o.m=r,e=[],o.O=(t,n,r,a)=>{if(!n){var c=1/0;for(u=0;u<e.length;u++){for(var[n,r,a]=e[u],l=!0,i=0;i<n.length;i++)(!1&a||c>=a)&&Object.keys(o.O).every((e=>o.O[e](n[i])))?n.splice(i--,1):(l=!1,a<c&&(c=a));if(l){e.splice(u--,1);var s=r();void 0!==s&&(t=s)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,r,a]},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var a=Object.create(null);o.r(a);var c={};t=t||[null,n({}),n([]),n(n)];for(var l=2&r&&e;"object"==typeof l&&!~t.indexOf(l);l=n(l))Object.getOwnPropertyNames(l).forEach((t=>c[t]=()=>e[t]));return c.default=()=>e,o.d(a,c),a},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,a,[c,l,i]=n,s=0;if(c.some((t=>0!==e[t]))){for(r in l)o.o(l,r)&&(o.m[r]=l[r]);if(i)var u=i(o)}for(t&&t(n);s<c.length;s++)a=c[s],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(u)},n=self.webpackChunkproshop=self.webpackChunkproshop||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var c=o.O(void 0,[973],(()=>o(362)));c=o.O(c)})();