(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{15:function(t,e,n){t.exports=n(40)},20:function(t,e,n){},21:function(t,e,n){t.exports=n.p+"static/media/logo.5d5d9eef.svg"},22:function(t,e,n){},40:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(14),c=n.n(r),i=(n(20),n(21),n(22),n(1)),u=n(4),l=function(t){var e=t.note,n=t.toggleImportance,a=t.deleteNote,r=e.important?"make not imporant":"make imporant";return o.a.createElement("li",null,o.a.createElement("button",{onClick:a},"delete"),e.content,o.a.createElement("button",{onClick:n},r))},m=n(3),f=n.n(m),s=function(){return f.a.get("/api/notes").then((function(t){return t.data}))},p=function(t){return f.a.post("/api/notes",t).then((function(t){return t.data}))},d=function(t,e){return f.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))},h=function(t){return f.a.delete("".concat("/api/notes","/").concat(t))},v=function(){var t=Object(a.useState)([]),e=Object(i.a)(t,2),n=e[0],r=e[1],c=Object(a.useState)("a new note..."),m=Object(i.a)(c,2),f=m[0],v=m[1],E=Object(a.useState)(!0),g=Object(i.a)(E,2),b=g[0],w=g[1];Object(a.useEffect)((function(){s().then((function(t){r(t)}))}),[]);var k=b?n:n.filter((function(t){return t.important})),O=function(t){return function(){h(t).then((function(e){r(n.filter((function(e){return e.id!==t})))}))}};return o.a.createElement("div",null,o.a.createElement("h1",null,"Notes"),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){return w(!b)}},"show ",b?"important":"all")),o.a.createElement("ul",null,k.map((function(t){return o.a.createElement(l,{key:t.id,note:t,toggleImportance:(e=t.id,function(){var t=n.find((function(t){return t.id===e})),a=Object(u.a)({},t,{important:!t.important});d(e,a).then((function(t){r(n.map((function(n){return n.id!==e?n:t})))}))}),deleteNote:O(t.id)});var e}))),o.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:f,date:(new Date).toISOString(),important:Math.random()>.5,id:n.length+1};p(e).then((function(t){r(n.concat(t)),v("")}))}},o.a.createElement("input",{value:f,onChange:function(t){v(t.target.value)}}),o.a.createElement("button",{type:"submit"},"save")))};var E=function(t){return t.notes,o.a.createElement(o.a.Fragment,null,o.a.createElement(v,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.7a79f152.chunk.js.map