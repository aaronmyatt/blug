(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{293:function(t,e,n){},294:function(t,e,n){"use strict";n.r(e);n(5),n(6);var r=n(10),o={props:{contentType:{type:String,default:"notes"},title:{type:String,require:!1,default:""}},data:()=>({content:[],categories:[]}),created(){var t=this;return Object(r.a)((function*(){var content=yield t.$content(t.contentType,{deep:!0}).only(["title","description","category","slug","path"]).sortBy("updatedAt").limit(10).fetch(),e=content.map(t=>t.category);e=new Set(e),t.content=content,t.categories=e}))()},methods:{filterByCategory(t){return this.content.filter(e=>e.category===t)}}},c=n(42),l=n(63),d=n.n(l),f=n(297),h=n(295),v=n(292),y=n(3),m=(n(293),n(24)),O=n(13);function j(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?j(Object(source),!0).forEach((function(e){Object(y.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):j(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var w=Object(O.a)(m.a).extend({name:"v-subheader",props:{inset:Boolean},render(t){return t("div",{staticClass:"v-subheader",class:_({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}}),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.title?n("h2",[t._v(t._s(t.title))]):t._e(),t._v(" "),n("v-list",{attrs:{subheader:"","two-line":""}},t._l(t.categories,(function(e){return n("div",{key:e},[n("v-subheader",[t._v(" "+t._s(e)+" ")]),t._v(" "),t._l(t.filterByCategory(e),(function(e){return n("v-list-item",{key:e.path,staticClass:"elevation-1",attrs:{to:{path:e.path},nuxt:""}},[n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),t._v(" "),n("v-list-item-subtitle",{domProps:{textContent:t._s(e.description)}})],1)],1)}))],2)})),0)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VList:f.a,VListItem:h.a,VListItemContent:v.a,VListItemSubtitle:v.b,VListItemTitle:v.c,VSubheader:w})},314:function(t,e,n){"use strict";n.r(e);var r={},o=n(42),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("ContentTypeList",{attrs:{"content-type":this.$route.name,title:"Notes and Resources"}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ContentTypeList:n(294).default})}}]);