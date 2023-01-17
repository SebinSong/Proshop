(()=>{"use strict";var e,t,n,a={443:(e,t,n)=>{var a=n(294),r=n(745),o=n(655),c=n(250),i=n(697),l=n.n(i),s=function(e){var t=e.tag,n=void 0===t?"span":t,r=e.name,o=void 0===r?"":r,c=e.classes,i=void 0===c?"":c,l=e.children,s=void 0===l?null:l;return a.createElement(n,{className:"fa-".concat(o," ").concat(i)},s)};s.propTypes={tag:l().string,name:l().string,classes:l().string,children:l().node};const m=s;function u(e){var t=e.children,n=void 0===t?null:t,r=e.classes,o=void 0===r?"":r;return a.createElement("div",{className:"ps-container ".concat(o)},n)}u.propTypes={children:l().node,classes:l().string};const p=u;var d=n(152),h=n(466),f=n(671),g=n(136),v=n(930),E=n(120);function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,E.Z)(e);if(t){var r=(0,E.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,v.Z)(this,n)}}const y=function(e){(0,g.Z)(n,e);var t=b(n);function n(){var e,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return(0,f.Z)(this,n),(e=t.call(this,a)).name="CustomHookError",e.date=new Date,e}return(0,h.Z)(n)}((0,n(407).Z)(Error));var _=769,w={desktop:"(min-width: ".concat(1200,"px)"),"till-tablet":"(max-width: ".concat(_,"px)"),tablet:"(min-width: ".concat(_,"px) and (max-width: ").concat(1200,"px)"),"from-tablet":"(min-width: ".concat(_,"px)"),"from-smallphone":"(min-width: ".concat(428,"px)"),"from-smallphone-till-tablet":"(min-width: ".concat(428,"px) and (max-width: ").concat(_,"px)"),smallphone:"(max-width: ".concat(429,"px)")};const N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,n=t||w[e]||"";if(!n)throw new y("useMQ hook error: invalid deviceOption parameter - ".concat(e));var r=(0,a.useState)(!1),o=(0,d.Z)(r,2),c=o[0],i=o[1],l=function(){var e=window.matchMedia(n).matches;i((function(t){return e!==t?e:t}))};return(0,a.useEffect)((function(){return window.addEventListener("resize",l),l(),function(){window.removeEventListener("resize",l)}}),[]),c};function x(e){var t=e.deviceOption,n=void 0===t?"":t,r=e.customQueryString,o=void 0===r?"":r,c=e.children,i=void 0===c?null:c;return N(n,o)?a.createElement(a.Fragment,null,i):null}x.propTypes={deviceOption:l().string,customQueryString:l().string,children:l().node};const k=x;function S(e){var t=e.classes,n=void 0===t?"":t,r=e.children,o=void 0===r?null:r;return a.createElement("div",{className:"p-content"},a.createElement(p,{classes:"page-template ".concat(n)},o))}S.propTypes={classes:l().string,children:l().node},a.Global={Icon:m,Container:p,Mq:k,PageTemplate:S};var O={primary:"#003459",secondary:"#F7DBA7",background_0:"#FDFDFD",background_1:"#EBEEEF",text_0:"#00171F",text_1:"#003459",warning:"#FF564F",neautral_light:"#FDFDFD",neautral_light_1:"#EBEEEF",neautral_light_2:"#CCD1D2",neautral_dark:"#242B33",neautral_dark_1:"#667479",neautral_dark_2:"#99A2A5",green_light:"#34C759",orange_shine:"#FF912C",blue_sea:"#00A7E7"}||{};const j=function(){var e=Object.entries(O).map((function(e){var t=(0,d.Z)(e,2),n=t[0],a=t[1];return"  --".concat(n,": ").concat(a,";\r\n")})).join("");return a.createElement("style",null,":root {\r\n"+e+"}")};var C=a.Global,P=C.Icon,D=C.Container,F=[{name:"github",url:"https://github.com/SebinSong"},{name:"heart",url:"https://www.linkedin.com/in/sebinsong/"}],A=function(){return F.map((function(e){var t=e.name,n=void 0===t?"":t,r=e.url,o=void 0===r?"#":r;return a.createElement("a",{className:"app-footer__sns-icon-link",href:o,key:n,target:"_blank"},a.createElement(P,{name:n,tag:"i"}))}))};const R=function(){return a.createElement("footer",{className:"p-footer app-footer"},a.createElement(D,{classes:"app-footer__container"},a.createElement("div",{className:"app-footer__logo"},a.createElement("img",{src:"/images/logo.svg"}),a.createElement("h1",null,"Proshop")),a.createElement("div",{className:"app-footer__right-statement"},"© Copyright 2022",a.createElement("span",{className:"shop-name"},"Proshop"),".",a.createElement("br",{className:"right-statement__line-break"}),"All Rights Reserved."),a.createElement("div",{className:"app-footer__sns-icons"},a.createElement(A,null))))};var T=a.Global.Icon;const G=function(e){var t=e.placeholder,n=void 0===t?"":t;return a.createElement("div",{className:"searchbar app-header__searchbar"},a.createElement("input",{className:"searchbar-input",type:"text","aria-label":"Header search bar",autoComplete:"off",placeholder:n}),a.createElement("button",{className:"searchbar-icon icon",type:"button","aria-label":"Search button"},a.createElement(T,{name:"search"})))};var I=a.Global,M=I.Icon,B=I.Mq;const Z=function(){var e="(max-width: 600px)",t=N(null,e),n=(0,a.useState)(!1),r=(0,d.Z)(n,2),o=r[0],i=r[1],l=(0,c.s0)(),s=function(e){return l(e)};return a.createElement("header",{className:"l-toolbar app-header"},a.createElement("div",{className:"app-header__content"},a.createElement("div",{className:"app-header__branding"},a.createElement("img",{className:"app-header__logo",src:"/images/logo.svg",alt:"A tiny shop logo"}),a.createElement("h1",{className:"app-header__app-title"},"Proshop")),a.createElement("div",{className:"app-header__menu-container"},a.createElement("button",{className:"app-header__menu-btn",onClick:function(){return s("/cart")}},a.createElement("span",{className:"menu-btn__wrap"},a.createElement("span",{className:"text"},"Cart"),a.createElement(M,{tag:"i",name:"cart"}))),a.createElement("button",{className:"app-header__menu-btn",onClick:function(){return s("/sign-in")}},a.createElement("span",{className:"menu-btn__wrap"},a.createElement("span",{className:"text"},"Sign in"),a.createElement(M,{tag:"i",name:"sign-in",classes:"sign-in-icon"}))),a.createElement(B,{customQueryString:e},a.createElement("button",{className:"app-header__menu-btn",onClick:function(){return i((function(e){return!e}))}},a.createElement("span",{className:"menu-btn__wrap"},a.createElement(M,{tag:"i",name:"search"}))))),!t||o?a.createElement("div",{className:"app-header__search-bar-container"},a.createElement(G,{placeholder:"Serch Products..."})):null))};const L=function(e){return a.createElement(a.Fragment,null,a.createElement(j,null),a.createElement("div",{className:"app-container app-layout"},a.createElement(Z,null),a.createElement("main",{className:"l-page"},a.createElement(c.j3,null),a.createElement(R,null))))};function z(){var e=function(){return Math.random().toString(20).slice(2)};return"".concat(e(),"_").concat(e())}const H=[{id:z(),name:"Airpods Wireless Bluetooth Headphones",filename:"airpods.jpg",description:"Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",brand:"Apple",category:"Electronics",price:89.99,countInStock:10,rating:4.5,numReviews:12},{id:z(),name:"iPhone 11 Pro 256GB Memory",filename:"phone.jpg",description:"Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",brand:"Apple",category:"Electronics",price:599.99,countInStock:7,rating:4,numReviews:8},{id:z(),name:"Cannon EOS 80D DSLR Camera",filename:"camera.jpg",description:"Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",brand:"Cannon",category:"Electronics",price:929.99,countInStock:5,rating:3,numReviews:12},{id:z(),name:"Sony Playstation 4 Pro White Version",filename:"playstation.jpg",description:"The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",brand:"Sony",category:"Electronics",price:399.99,countInStock:11,rating:5,numReviews:12},{id:z(),name:"Logitech G-Series Gaming Mouse",filename:"mouse.jpg",description:"Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",brand:"Logitech",category:"Electronics",price:49.99,countInStock:7,rating:3.5,numReviews:10},{id:z(),name:"Amazon Echo Dot 3rd Generation",filename:"alexa.jpg",description:"Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",brand:"Amazon",category:"Electronics",price:29.99,countInStock:0,rating:4,numReviews:12}];function q(e){var t=e.rate,n=void 0===t?0:t,r=e.text,o=void 0===r?"":r,c=e.color,i=void 0===c?"":c,l=Array(Math.floor(n)).fill("full");return n%1>=.5&&l.push("half"),a.createElement("span",{className:"rating"},a.createElement("span",{className:"rating-stars"},l.map((function(e,t){return a.createElement("i",{key:t,className:"fa-star".concat("half"===e?"-half":""),style:i?{color:i}:{}})}))),a.createElement("span",{className:"rating-text"},o))}function Q(e){var t=e.productData;if(!t)return null;var n=(0,c.s0)(),r=t.name,o=t.description,i=t.filename,l=t.price,s=t.rating,m=t.numReviews,u=t.brand,p=t.id,d="images/products/".concat(i);return a.createElement("div",{className:"home-product-card",onClick:function(){return n("product/".concat(p))}},a.createElement("img",{src:d,alt:r}),a.createElement("p",{className:"product-info"},a.createElement("span",{className:"product-info-name is-title-5 mb-20"},r),a.createElement("span",{className:"product-info-desc"},o),a.createElement("span",{className:"product-info-brand"},a.createElement("span",null,"Brand: "),a.createElement("span",{className:"is-desc-strong"},u)),a.createElement("span",{className:"product-info-ratings-reviews"},a.createElement(q,{rate:s,text:"".concat(s," (").concat(m," reviews)"),color:"var(--orange_shine)"}))),a.createElement("p",{className:"product-price has-yeseva"},"$ ",l))}q.propTypes={rate:l().number,text:l().string,color:l().string},Q.propTypes={productData:l().object.isRequired};var W=a.Global.PageTemplate;function V(){return a.createElement(W,{classes:"page-home"},a.createElement("h1",{className:"page-heading"},"Latest products"),a.createElement("div",{className:"latest-product-list"},H.map((function(e){return a.createElement(Q,{key:e.id,productData:e})}))))}var Y=a.Global.PageTemplate;function $(){return a.createElement(Y,{classes:"page-product"},a.createElement("h1",{className:"page-heading"},"Product details"))}function J(){return a.createElement("h3",null,"404 Not found")}var K=(0,o.aj)([{path:"/",element:a.createElement(L,null),errorElement:a.createElement(J,null),children:[{errorElement:a.createElement(J,null),children:[{index:!0,element:a.createElement(V,null)},{path:"product/:id",element:a.createElement($,null)}]}]}]);(0,r.s)(document.querySelector("#root")).render(a.createElement(c.pG,{router:K}))}},r={};function o(e){var t=r[e];if(void 0!==t)return t.exports;var n=r[e]={exports:{}};return a[e](n,n.exports,o),n.exports}o.m=a,e=[],o.O=(t,n,a,r)=>{if(!n){var c=1/0;for(m=0;m<e.length;m++){for(var[n,a,r]=e[m],i=!0,l=0;l<n.length;l++)(!1&r||c>=r)&&Object.keys(o.O).every((e=>o.O[e](n[l])))?n.splice(l--,1):(i=!1,r<c&&(c=r));if(i){e.splice(m--,1);var s=a();void 0!==s&&(t=s)}}return t}r=r||0;for(var m=e.length;m>0&&e[m-1][2]>r;m--)e[m]=e[m-1];e[m]=[n,a,r]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var r=Object.create(null);o.r(r);var c={};t=t||[null,n({}),n([]),n(n)];for(var i=2&a&&e;"object"==typeof i&&!~t.indexOf(i);i=n(i))Object.getOwnPropertyNames(i).forEach((t=>c[t]=()=>e[t]));return c.default=()=>e,o.d(r,c),r},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var a,r,[c,i,l]=n,s=0;if(c.some((t=>0!==e[t]))){for(a in i)o.o(i,a)&&(o.m[a]=i[a]);if(l)var m=l(o)}for(t&&t(n);s<c.length;s++)r=c[s],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(m)},n=self.webpackChunkproshop=self.webpackChunkproshop||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var c=o.O(void 0,[49],(()=>o(443)));c=o.O(c)})();