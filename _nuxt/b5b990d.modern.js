(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{150:function(t,r,n){},182:function(t,r,n){"use strict";var e={data:()=>({drawer:!1,title:"Blug"})},o=n(42),v=n(63),c=n.n(v),l=n(284),d=n(290),_=n(285),h=n(183),x=n(291),f=n(286),V=n(287),A=n(288),w=n(289),component=Object(o.a)(e,(function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("v-app",{attrs:{dark:""}},[n("v-app-bar",{attrs:{app:"",dense:""}},[n("v-app-bar-nav-icon",{attrs:{to:{path:"/"}}},[n("div",{style:{border:"2px solid",padding:"4px"}},[t._v("ATM")])]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{nuxt:"",to:{path:"/notes"}}},[t._v(" N & R ")]),t._v(" "),n("v-btn",{staticClass:"text-truncate",attrs:{nuxt:"",to:{path:"/drafts"}}},[t._v("\n      Drafts\n    ")]),t._v(" "),n("v-btn",{staticClass:"text-truncate",attrs:{nuxt:"",to:{path:"/articles"}}},[t._v("\n      Articles\n    ")]),t._v(" "),n("v-divider",{staticClass:"mx-4",attrs:{vertical:""}}),t._v(" "),n("v-btn",{attrs:{nuxt:"",to:{path:"/about"}}},[t._v(" About ")]),t._v(" "),n("v-spacer")],1),t._v(" "),n("v-main",[n("v-container",[n("nuxt")],1)],1),t._v(" "),n("v-footer",{attrs:{app:""}},[n("span",[t._v("© "+t._s((new Date).getFullYear()))])])],1)}),[],!1,null,null,null);r.a=component.exports;c()(component,{VApp:l.a,VAppBar:d.a,VAppBarNavIcon:_.a,VBtn:h.a,VContainer:x.a,VDivider:f.a,VFooter:V.a,VMain:A.a,VSpacer:w.a})},193:function(t,r,n){n(194),t.exports=n(195)},227:function(t,r,n){"use strict";n(150)},34:function(t,r,n){"use strict";var e=n(284),o={components:{VApp:e.a},layout:"empty",props:{error:{type:Object,default:null}},data:()=>({pageNotFound:"404 Not Found",otherError:"An error occurred"}),head(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},v=(n(227),n(42)),c=n(63),l=n.n(c),component=Object(v.a)(o,(function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("VApp",{attrs:{dark:""}},[404===t.error.statusCode?n("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):n("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),n("NuxtLink",{attrs:{to:"/"}},[t._v(" Home page ")])],1)}),[],!1,null,"6d4cc180",null);r.a=component.exports;l()(component,{VApp:e.a})}},[[193,12,2,13]]]);