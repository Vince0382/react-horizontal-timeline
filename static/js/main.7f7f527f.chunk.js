(this["webpackJsonpreact-planning"]=this["webpackJsonpreact-planning"]||[]).push([[0],[,,,,,,function(e,t,n){e.exports={Content:"App_Content__ZaMNr",Elements:"App_Elements__fmpcd",Timeline:"App_Timeline__3mVrs",Switch:"App_Switch__3kBoA",Slider:"App_Slider__15T2R",Round:"App_Round__R_A5H",Options:"App_Options__3b1fw",Option:"App_Option__LaFRR"}},function(e,t,n){e.exports={DefaultDetailedElement:"DefaultDetailedElement_DefaultDetailedElement__1V0-c",ItemFlex:"DefaultDetailedElement_ItemFlex__1rPhV",Content:"DefaultDetailedElement_Content__3uCSu",Line1:"DefaultDetailedElement_Line1__1nSWm",Line2:"DefaultDetailedElement_Line2__2mvUB",ImagesWrapper:"DefaultDetailedElement_ImagesWrapper__x4yNN",Images:"DefaultDetailedElement_Images__ZJtUN"}},,function(e,t,n){e.exports={GroupViewGrid:"GroupItemsGrid_GroupViewGrid__3FsQm",SpacerLeft:"GroupItemsGrid_SpacerLeft__36had",SpacerRight:"GroupItemsGrid_SpacerRight__1vchy",Groups:"GroupItemsGrid_Groups__1vwVr",Items:"GroupItemsGrid_Items__NgMxq",CustomItem:"GroupItemsGrid_CustomItem__2WG5V",Shadowed:"GroupItemsGrid_Shadowed__3rZlP"}},,function(e,t,n){e.exports={DropZone:"DropZone_DropZone__2s4Wl",DropZoneOver:"DropZone_DropZoneOver__3EXCR",Day:"DropZone_Day__1qXhK",WeekendStyle:"DropZone_WeekendStyle__Y1XuY"}},function(e,t,n){e.exports={DaysGrid:"DaysGrid_DaysGrid__4XRd_",DropZones:"DaysGrid_DropZones__Wzy6s",MonthWrapper:"DaysGrid_MonthWrapper__3zPa-",Month:"DaysGrid_Month__1fD2E"}},function(e,t,n){e.exports={ElementWrapper:"ElementWrapper_ElementWrapper__9x_0b",ElementOccurences:"ElementWrapper_ElementOccurences__2XeAh",Overlay:"ElementWrapper_Overlay__3bzJw",RemoveButton:"ElementWrapper_RemoveButton__X7ZSA"}},,function(e,t,n){e.exports={MonthSelector:"MonthSelector_MonthSelector__3sY2k",Button:"MonthSelector_Button__2J3Yp"}},function(e,t,n){e.exports={DragPreview:"DragPreview_DragPreview__33G3v",ItemStyle:"DragPreview_ItemStyle__2mXbq",ImageSytle:"DragPreview_ImageSytle__33Xd4"}},,,,,,,,,function(e,t,n){e.exports={ResizeHandle:"ResizeHandle_ResizeHandle__TTbS9"}},function(e,t,n){e.exports={DefaultBasicElement:"DefaultBasicElement_DefaultBasicElement__1DLOn"}},function(e,t,n){e.exports={ItemsGrid:"ItemsGrid_ItemsGrid__3gVWX"}},function(e,t,n){e.exports={PlannerDefault:"Planner_PlannerDefault__s3zFP"}},function(e,t,n){e.exports=n.p+"static/media/logo1.c2891fdd.png"},function(e,t,n){e.exports=n.p+"static/media/logo2.8d314fc0.png"},function(e,t,n){e.exports=n.p+"static/media/logo3.7cae2123.png"},function(e,t,n){e.exports=n.p+"static/media/logo4.f2ce6af0.png"},function(e,t,n){e.exports=n.p+"static/media/logo5.fb95f4c3.png"},function(e,t,n){e.exports=n.p+"static/media/logo6.e5e58d31.png"},function(e,t,n){e.exports=n.p+"static/media/logo7.6acd8367.png"},,function(e,t,n){e.exports=n(48)},,,,,function(e,t,n){},,,,,,function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(21),c=n.n(o),i=(n(42),n(3)),l=n(2),s=n(5),u=n(24),m=n.n(u),p=n(6),d=n.n(p),f=n(10),g=function(e,t){return new Date(t,e,0).getDate()},O=function(e,t){return Math.round(Math.abs((new Date(e).getTime()-new Date(t).getTime())/864e5))},b=function(e,t){return e&&3===e.length?"rgba(".concat(e.join(","),", ").concat(t||1,")"):null},y=["","January","February","March","April","May","June","July","August","September","October","November","December"],h=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],D=[[252,226,194],[179,200,200],[108,178,209],[79,158,196],[193,231,227],[220,255,251],[255,220,244],[218,191,222],[193,187,221]],v=n(15),E=n.n(v),j=function(e){var t=e.monthList[e.currentMonth]?y[e.monthList[e.currentMonth].month]:"",n=e.monthList[e.currentMonth]?e.monthList[e.currentMonth].year:"",r=a.a.createElement("p",{className:E.a.Button,style:{color:0===e.currentMonth?"#ccc":"black"},onClick:e.previousMonthHandler},"<"),o=a.a.createElement("p",{className:E.a.Button,style:{color:e.currentMonth===e.monthList.length-1?"#ccc":"black"},onClick:e.nextMonthHandler},">");return a.a.createElement("div",{className:E.a.MonthSelector},e.scroll?null:r,a.a.createElement("p",{style:{margin:0}},"".concat(t," - ").concat(n)),e.scroll?null:o)};j.defaultProps={monthList:[]};var _=j,w=n(36),P=n(11),S=n.n(P),I=function(e){var t=Object(s.e)({accept:"ELEMENT",drop:function(t){var n=t;t.resizing||t.moving||(n=g(t)),e.onDrop(n,!0)},hover:function(t,n){if(!m&&(t.resizing||t.moving)){var r=t;t.resizing?r=d(t):t.moving&&(r=f(t)),e.onDrop(r),p(!0)}},collect:function(e){return{isOver:!!e.isOver()}}}),n=Object(l.a)(t,2),o=n[0].isOver,c=n[1],i=Object(r.useState)(!1),u=Object(l.a)(i,2),m=u[0],p=u[1];Object(r.useEffect)((function(){p(!1)}),[o]);var d=function(t){return"right"===t.resizing?(t.endDate=e.dropDate,t):"left"===t.resizing?(t.startDate=e.dropDate,t):null},f=function(t){var n,r,a=t.startDate?(n=e.dropDate,r=t.startDate,new Date(n).getTime()-new Date(r).getTime()):0;return t.startDate=new Date(e.dropDate),t.endDate=new Date(t.endDate),t.endDate.setTime(t.endDate.getTime()+a),t},g=function(t){return t.startDate=new Date(e.dropDate),t.endDate=new Date(e.dropDate),t.endDate.setTime(t.endDate.getTime()+864e5),t},O=e.dropDate.getDay(),b=6===O||0===O,y=o?S.a.DropZoneOver:null,D=b&&!e.includeWeekend?S.a.WeekendStyle:null,v=!b||e.includeWeekend;return a.a.createElement("div",{ref:v?c:null,className:[S.a.DropZone,y,D].join(" "),style:e.style},a.a.createElement("div",{className:S.a.Day,style:{color:b||o?"white":"#7787a8"}},a.a.createElement("div",null,h[O].substr(0,3)),a.a.createElement("div",null,e.dropDate.getDate())))};I.defaultProps={includeWeekend:!1};var x=I,k=n(12),M=n.n(k);function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var T=function(e){for(var t=e.month,n=e.width,r=e.offset,o=Object(w.a)(e,["month","width","offset"]),c=[],i=g(t.month,t.year),l=n-r,s={width:l/i},u=1;u<=i;u++)u===i&&(s=C({},s,{border:"none"})),c.push(a.a.createElement(x,Object.assign({},o,{style:s,key:"grid_".concat(t.month,"_").concat(u),dropDate:new Date(t.year,t.month-1,u)})));var m={borderLeftStyle:e.grouped||0!==e.index?"solid":"none"};return a.a.createElement("div",{className:M.a.DaysGrid,style:{width:l,left:r}},a.a.createElement("div",{className:M.a.MonthWrapper,style:C({},e.style,{width:l},m)},a.a.createElement("div",{className:M.a.Month},"".concat(y[e.month.month]," ").concat(e.month.year))),a.a.createElement("div",{className:M.a.DropZones,style:C({},e.style,{},m,{width:l})},c))};T.defaultProps={width:0,grouped:!1,index:0,offset:0};var G=T,L=n(7),W=n.n(L);function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function B(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var F={outerElement:[204,204,204],innerElement:[70,130,180]},A=function(e){return a.a.createElement("div",{className:[W.a.DefaultDetailedElement,e.className].join(" "),style:B({background:e.innerElement?b(e.bgColor,.7):b(F.outerElement,.7),boxShadow:e.shadowed?"4px 4px 6px -6px rgba(0,0,0,0.75)":"none"},e.style)},a.a.createElement("div",{className:W.a.ItemFlex},a.a.createElement("div",{className:W.a.ImagesWrapper},a.a.createElement("img",{className:W.a.Images,src:e.item.content.logo,alt:"Logo",draggable:"false",onMouseDown:function(e){return e.preventDefault()}})),a.a.createElement("div",{className:W.a.Content},a.a.createElement("div",{className:W.a.Line1},e.item.content.line1),a.a.createElement("div",{className:W.a.Line2},e.item.content.line2))))};A.defaultProps={item:{id:null,content:{},description:"",startDate:"",endDate:"",type:"range"},randomColor:!1,innerElement:!1,shadowed:!1,bgColor:F.innerElement};var z=A,Z=n(16),X=n.n(Z),V=function(e,t){if(!e||!t)return{display:"none"};var n=t.x,r=t.y,a="translate(".concat(n,"px, ").concat(r,"px)");return{transform:a,WebkitTransform:a}},H=function(e){var t=Object(s.d)((function(e){return{item:e.getItem(),itemType:e.getItemType(),initialOffset:e.getInitialSourceClientOffset(),currentOffset:e.getSourceClientOffset(),isDragging:e.isDragging()}})),n=t.itemType,r=t.isDragging,o=t.item,c=t.initialOffset,i=t.currentOffset;return!r||o.id?null:a.a.createElement("div",{className:X.a.DragPreview},a.a.createElement("div",{className:X.a.ItemStyle,style:V(c,i)},function(){switch(n){case"ELEMENT":return a.a.createElement("img",{className:X.a.ImageSytle,src:o.content.logo,alt:""});default:return null}}()))},J=n(25),Y=n.n(J);function U(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?U(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):U(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var K=function(e){var t=Object(s.c)({item:q({type:"ELEMENT"},e.item,{resizing:e.orientation,moving:!1})}),n=Object(l.a)(t,2)[1],r="left"===e.orientation?{left:0}:{right:0};return a.a.createElement("div",{className:Y.a.ResizeHandle,style:q({},r,{backgroundColor:e.bgColor}),ref:n})};K.defaultProps={item:{}};var Q=K,$=n(13),ee=n.n($);function te(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ne(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?te(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):te(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var re={shared:{position:"absolute",right:"14px",top:"7.5px",height:"15px",width:"2px",backgroundColor:"#E76E54"},first:{transform:"rotate(45deg)"},second:{transform:"rotate(-45deg)"}},ae=function(e){var t=Object(s.c)({item:ne({type:"ELEMENT"},e.item,{resizing:null,moving:e.innerElement}),collect:function(e){return{isDragging:!!e.isDragging()}}}),n=Object(l.a)(t,2),o=(n[0].isDragging,n[1]),c={border:"2px solid ".concat(b(e.bgColor)),borderStyle:"solid none solid none"},i=Object(r.useState)(null),u=Object(l.a)(i,2),m=u[0],p=u[1];return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{onClick:e.onClick,ref:o,className:ee.a.ElementWrapper,style:{cursor:e.move?"move":"grab"}},a.a.createElement(e.customElementType,e),e.showOccurences&&e.occurences>0?a.a.createElement("div",{className:ee.a.ElementOccurences},e.occurences):null,e.overlay?a.a.createElement("div",{className:ee.a.Overlay,style:m,onMouseOver:function(){return p(c)},onMouseLeave:function(){return p(null)}},a.a.createElement("div",{className:ee.a.RemoveButton,onClick:e.remove},a.a.createElement("div",{style:ne({},re.shared,{},re.first)}),a.a.createElement("div",{style:ne({},re.shared,{},re.second)})),a.a.createElement(Q,{orientation:"left",item:e.item,bgColor:b(e.bgColor)}),a.a.createElement(Q,{orientation:"right",item:e.item,bgColor:b(e.bgColor)})):null),e.innerElement?null:a.a.createElement(H,null))};ae.defaultProps={item:{id:null,logo:"",description:"",startDate:"",endDate:"",elementType:"range"},overlay:!1,move:!1,customElementType:z,occurences:0,showOccurences:!1};var oe=n(26),ce=n.n(oe);function ie(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function le(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ie(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ie(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var se=function(e){return a.a.createElement("div",{className:[ce.a.DefaultBasicElement,e.className].join(" "),style:le({},e.style,{background:b(e.bgColor,.7)})})};se.defaultProps={};var ue=se,me=n(27),pe=n.n(me);function de(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function fe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?de(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):de(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ge=function(e){var t=Object(r.useState)(),n=Object(l.a)(t,2),o=n[0],c=n[1],i={width:e.width*e.monthList.length,gridTemplateColumns:function(){var t=[];return e.monthList.forEach((function(n){for(var r=g(n.month,n.year),a=e.width/r,o=0;o<r;o++)t.push("".concat(a,"px"))})),t}().join(" ")};return Object(r.useEffect)((function(){var t=[],n=e.items.map((function(n,r){var o=e.startDate.getMonth(),c=e.startDate.getFullYear(),i=Math.round(O(n.startDate,new Date(c,o,1)))+1,l=null;if(e.colorIndex)l=D[e.colorIndex];else{var s=t.find((function(e){return e.itemId===n.itemId}));s?l=s.color:(l=D[t.length],t.push({itemId:n.itemId,color:l}))}return console.log(e.grouped,"test"),a.a.createElement("div",{style:{gridColumn:"".concat(i," / ").concat(i+O(n.endDate,n.startDate)+1)},key:"item_".concat(n.id,"_").concat(r)},a.a.createElement(ae,{item:n,overlay:!0,move:!0,bgColor:l,elementClassName:e.elementClassName,innerElement:!0,customElementType:e.grouped?ue:e.customInnerElementType,style:{marginLeft:0},onClick:function(){return console.log(n)},remove:function(){return e.onRemove(n.id)}}))}));c(n)}),[e.items,e.startDate]),a.a.createElement("div",{className:pe.a.ItemsGrid,style:fe({},i,{},e.style)},o)};ge.defaultProps={items:[],monthList:[],grouped:!1};var Oe=ge,be=n(9),ye=n.n(be);function he(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function De(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?he(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):he(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ve=function(e){var t=Object(r.useState)({}),n=Object(l.a)(t,2),o=n[0],c=n[1],i=Object(r.useState)(null),s=Object(l.a)(i,2),u=s[0],m=s[1];Object(r.useEffect)((function(){var t={};e.items.forEach((function(e){var n="group_".concat(e.itemId);t[n]||(t[n]=[]),t[n].push(e)})),c(t)}),[e.items,e.startDate]);var p={background:"rgba(250, 250, 250, 1"},d=Object.keys(o).map((function(t,n){var r=n<Object.keys(o).length-1?{borderBottom:"1px solid #f1f1f1"}:null;return a.a.createElement(a.a.Fragment,{key:"groups_items_".concat(t).concat(n)},a.a.createElement("div",{className:ye.a.Groups,style:u===n?De({},p,{},r):r,onMouseOver:function(){return m(n)},onMouseLeave:function(){return m(null)}},a.a.createElement(z,{item:o[t][0],className:ye.a.CustomItem,style:{background:"transparent"}})),a.a.createElement("div",{className:ye.a.Items,style:u===n?p:null,onMouseOver:function(){return m(n)},onMouseLeave:function(){return m(null)}},a.a.createElement(Oe,Object.assign({},e,{width:e.width-e.leftWidth,style:De({},e.style,{},r,{marginTop:0}),items:o[t],colorIndex:n,grouped:!0}))))}));return a.a.createElement("div",{className:ye.a.GroupViewGrid,style:{width:"".concat((e.width-e.leftWidth)*e.monthList.length+e.leftWidth,"px"),gridTemplateColumns:"".concat(e.leftWidth,"px ").concat((e.width-e.leftWidth)*e.monthList.length,"px")}},a.a.createElement("div",{className:ye.a.SpacerLeft}),a.a.createElement("div",{className:ye.a.SpacerRight}),d)};ve.defaultProps={items:[],customElementType:ue,leftWidth:220};var Ee=ve,je=function(e){var t=function(t,n){return e.monthList.map((function(r,o){return a.a.createElement(G,{key:"daysGrid_".concat(r.month,"_").concat(r.year),onDrop:e.onDrop,month:r,index:o,scroll:e.scroll,grouped:e.grouped,offset:n,width:t,style:{transform:"translateX(".concat(100*o-100*e.currentMonth,"%)")}})}))},n=a.a.createElement(a.a.Fragment,null,t(e.width),a.a.createElement(Oe,Object.assign({},e,{style:{transform:"translateX(-".concat(e.width*e.currentMonth,"px)")}}))),r=a.a.createElement(a.a.Fragment,null,t(e.width,220),a.a.createElement(Ee,Object.assign({},e,{width:e.width,leftWidth:220,style:{transform:"translateX(-".concat((e.width-220)*e.currentMonth,"px)")}})));return a.a.createElement(a.a.Fragment,null,e.grouped?r:n)};je.defaultProps={monthList:[],currentMonth:0,scroll:!1};var _e=je,we=n(28),Pe=n.n(we);function Se(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ie(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Se(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Se(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var xe=function(e){var t=Object(r.useRef)(),n=Object(r.useState)([]),o=Object(l.a)(n,2),c=o[0],i=o[1],s=Object(r.useState)(0),u=Object(l.a)(s,2),m=u[0],p=u[1],d=Object(r.useState)([]),g=Object(l.a)(d,2),O=g[0],b=g[1],y=Object(r.useState)(0),h=Object(l.a)(y,2),D=h[0],v=h[1];Object(r.useEffect)((function(){var t=[];e.items.forEach((function(e,n){var r=Ie({},e,{startDate:e.startDate?new Date(e.startDate):null,endDate:e.endDate?new Date(e.endDate):null});e.id?t.push(r):t.push(Ie({},r,{id:1e8+n}))})),t.sort((function(e,t){return(e=e.startDate)<(t=t.startDate)?-1:e>t?1:0})),i(t)}),[e.items]),Object(r.useEffect)((function(){for(var t=[],n=new Date(e.options.startDate),r=function(e,t){var n;return n=12*(t.getFullYear()-e.getFullYear()),n-=e.getMonth(),(n+=t.getMonth())<=0?0:n+1}(n,new Date(e.options.endDate)),a=0;a<r;a++)t.push({month:n.getMonth()+a+1,year:n.getFullYear()});return b(t),E(),window.addEventListener("resize",E),function(){return window.removeEventListener("resize",E)}}),[e.options.startDate,e.options.endDate]);var E=function(){var e=t.current.getBoundingClientRect();p(e.width-2)},j={items:c,width:m,monthList:O,currentMonth:D,onRemove:function(t){var n=Object(f.a)(c),r=null,a=n.findIndex((function(e){return e.id===t}));-1!==a?(r=n[a],n.splice(a,1),i(n)):console.log("ID : ".concat(t," not found")),e.options.callBacks.onRemove&&e.options.callBacks.onRemove({item:Ie({},r),items:Object(f.a)(n)})},onDrop:function(t,n){var r=Object(f.a)(c),a=-1,o=Ie({},t,{id:t.id?t.id:Math.max.apply(Math,c.map((function(e){return e.id})))+1});t.id&&(a=r.findIndex((function(e){return e.id===t.id}))),-1===a?(r.push(o),e.options.callBacks.onAdd&&n&&e.options.callBacks.onAdd({item:Ie({},o),items:Object(f.a)(r)})):(r[a]=o,e.options.callBacks.onUpdate&&n&&e.options.callBacks.onUpdate({item:Ie({},o),items:Object(f.a)(r)})),i(r)},grouped:e.grouped,scroll:e.scroll,customInnerElementType:e.customInnerElementType,elementClassName:e.elementClassName,startDate:new Date(e.options.startDate)};return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"".concat(e.className),style:Ie({border:"".concat(1,"px solid #ccc"),overflowX:e.scroll?"scroll":"hidden"},e.style),ref:t},a.a.createElement(_e,j)),e.scroll?null:a.a.createElement(_,{monthList:O,currentMonth:D,previousMonthHandler:function(){return v(D-1<=0?0:D-1)},nextMonthHandler:function(){return v(D+1>=O.length-1?O.length-1:D+1)}}))};xe.defaultProps={items:[],options:{callBacks:{onAdd:null,onRemove:null,onUpdate:null},startDate:(new Date).toISOString(),endDate:(new Date).setMonth((new Date).getMonth()+1)},scroll:!1,grouped:!1,className:Pe.a.PlannerDefault};var ke=n(29),Me=n.n(ke),Ne=n(30),Ce=n.n(Ne),Te=n(31),Ge=n.n(Te),Le=n(32),We=n.n(Le),Re=n(33),Be=n.n(Re),Fe=n(34),Ae=n.n(Fe),ze=n(35),Ze=n.n(ze);function Xe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ve(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Xe(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Xe(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var He=function(e){return a.a.createElement("div",{className:d.a.Option},a.a.createElement("span",{style:{marginRight:"10px",fontSize:"14px"}},e.children),a.a.createElement("label",{className:d.a.Switch},a.a.createElement("input",{type:"checkbox",checked:e.checked,onChange:e.onChange}),a.a.createElement("span",{className:"".concat(d.a.Slider," ").concat(d.a.Round)})))},Je=function(){var e=Object(r.useState)(!0),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(!0),u=Object(l.a)(c,2),p=u[0],f=u[1],g=Object(r.useState)(!0),O=Object(l.a)(g,2),b=O[0],y=O[1],h=[{itemId:1,content:{logo:Me.a,line1:"Caro Confort",line2:"Carrelage"}},{itemId:2,content:{logo:Ce.a,line1:"AB Menuiserie",line2:"Menuiserie"}},{itemId:3,content:{logo:Ge.a,line1:"Fournier",line2:"Electricit\xe9"}},{itemId:4,content:{logo:We.a,line1:"Kr\xebfel",line2:"Cuisine"}},{itemId:5,content:{logo:Be.a,line1:"MG Terrassements",line2:"Terrassement"}},{itemId:6,content:{logo:Ae.a,line1:"Roosens B\xe9tons",line2:"Ma\xe7on"}},{itemId:7,content:{logo:Ze.a,line1:"Sopi Fa\xe7ades",line2:"Fa\xe7ade"}}],D=Object(r.useState)([Ve({},h[0],{startDate:"2019-10-02",endDate:"2019-10-08",elementType:"range"}),Ve({},h[5],{startDate:"2019-10-08",endDate:"2019-10-12",elementType:"range"}),Ve({},h[3],{startDate:"2019-10-15",endDate:"2019-10-17",elementType:"range"}),Ve({},h[1],{startDate:"2019-10-25",endDate:"2019-10-29",elementType:"range"}),Ve({},h[2],{startDate:"2019-11-15",endDate:"2019-11-18",elementType:"range"}),Ve({},h[6],{startDate:"2019-11-14",endDate:"2019-11-21",elementType:"range"}),Ve({},h[1],{startDate:"2019-11-20",endDate:"2019-11-29",elementType:"range"}),Ve({},h[0],{startDate:"2019-12-07",endDate:"2019-12-17",elementType:"range"}),Ve({},h[2],{startDate:"2019-12-22",endDate:"2019-12-27",elementType:"range"})]),v=Object(l.a)(D,2),E=v[0],j=v[1],_=Object(r.useState)({}),w=Object(l.a)(_,2),P=w[0],S=w[1];Object(r.useEffect)((function(){if(b){var e={};E.forEach((function(t){e=Ve({},e,Object(i.a)({},t.itemId,e[t.itemId]?e[t.itemId]+1:1))})),S(e)}}),[E,b]);var I={callBacks:{onAdd:function(e){var t=e.item,n=e.items;console.log("Added : ".concat(t)),j(n)},onRemove:function(e){var t=e.item,n=e.items;console.log("Removed : ".concat(t)),j(n)},onUpdate:function(e){var t=e.item,n=e.items;console.log("Updated : ".concat(t)),j(n)}},startDate:"2019-10-01",endDate:"2019-12-31"};return a.a.createElement(s.b,{backend:m.a},a.a.createElement("div",{className:d.a.Content},a.a.createElement("p",null,"Options"),a.a.createElement("div",{className:d.a.Options},a.a.createElement(He,{checked:n,onChange:function(){return o(!n)}},"Enable Scroll"),a.a.createElement(He,{checked:p,onChange:function(){return f(!p)}},"Grouped View"),a.a.createElement(He,{checked:b,onChange:function(){return y(!b)}},"Show Occurences")),a.a.createElement("p",null,"Droppable Items"),a.a.createElement("div",{className:d.a.Elements},h.map((function(e,t){return a.a.createElement("div",{style:{marginRight:"10px"},key:"main_item_".concat(t)},a.a.createElement(ae,{item:e,shadowed:!0,showOccurences:b,occurences:P[e.itemId]}))}))),a.a.createElement("div",{className:d.a.Timeline},a.a.createElement(xe,{items:E,options:I,scroll:n,grouped:p}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(Je,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[37,1,2]]]);
//# sourceMappingURL=main.7f7f527f.chunk.js.map