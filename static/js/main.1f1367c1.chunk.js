(this["webpackJsonpcovid19-dashboard"]=this["webpackJsonpcovid19-dashboard"]||[]).push([[0],{203:function(e,a,t){"use strict";t.r(a);var c=t(0),r=t.n(c),n=t(7),o=t.n(n),l=(t(89),t(10)),s=t(235),i=t(5),d=t(234),m=t(80),u=t.n(m),v=t(77),f=t(50),b=t(183),h=Object(i.a)({root:{"& input":{color:"whitesmoke"},"& label":{color:"whitesmoke"},"& label.Mui-focused":{color:"#448aff"},"& .MuiInput-underline:after":{borderBottomColor:"#448aff"},"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:"whitesmoke"},"&:hover fieldset":{borderColor:"whitesmoke"},"&.Mui-focused fieldset":{borderColor:"#448aff"}}}})(s.a),E=Object(d.a)((function(e){return{root:{display:"flex",flexWrap:"wrap"},margin:{margin:"1vw 1vw 1vw 0",width:"90%"}}})),p=function(){var e=E(),a=Object(c.useState)({}),t=Object(l.a)(a,2),n=t[0],o=t[1],s=Object(c.useState)({}),i=Object(l.a)(s,2),d=i[0],m=i[1],p=Object(c.useState)([]),N=Object(l.a)(p,2),g=N[0],C=N[1],O=Object(c.useState)(""),j=Object(l.a)(O,2),w=j[0],k=j[1],y=Object(c.useState)([]),D=Object(l.a)(y,2),M=D[0],Y=D[1],S=Object(c.useState)([]),I=Object(l.a)(S,2),A=I[0],B=I[1],W=Object(c.useState)([]),x=Object(l.a)(W,2),J=x[0],P=x[1],R=Object(c.useState)([]),T=Object(l.a)(R,2),_=T[0],G=T[1],L=Object(c.useState)({name:"India",alpha3Code:"IND"}),V=Object(l.a)(L,2),H=V[0],U=V[1],$=new Date,q=function(e){U(e)},z=function(e){return r.a.createElement("div",{key:e.alpha3Code,className:"country-row",onClick:q.bind(null,e)},e.name)};return Object(c.useEffect)((function(){b.get("https://covidapi.info/api/v1/global").then((function(e){o(e.data.result)}),(function(e){}))}),[]),Object(c.useEffect)((function(){var e;(e=H.alpha3Code,b.get("https://covidapi.info/api/v1/country/".concat(e,"/latest"))).then((function(e){Object.keys(e.data.result).forEach((function(a){m(e.data.result[a])}))}),(function(e){m({confirmed:"N/A",deaths:"N/A",recovered:"N/A",active:"N/A"})})),function(e){return b.get("https://covidapi.info/api/v1/country/".concat(e,"/timeseries/").concat(f($).subtract(30,"days").format("YYYY-MM-DD"),"/").concat(f($).format("YYYY-MM-DD")))}(H.alpha3Code).then((function(e){var a=Object.keys(e.data.result),t=[],c=[],r=[],n=[];a.forEach((function(a){c.push(e.data.result[a].confirmed),r.push(e.data.result[a].recovered),n.push(e.data.result[a].deaths),t.push(f(e.data.result[a].date,"YYYY-MM-DD").format("MMM DD"))})),Y(t),B(c),P(n),G(r)}),(function(e){}))}),[H]),Object(c.useEffect)((function(){b.get("https://restcountries.eu/rest/v2/all").then((function(e){[].push(e.data.map((function(e){return{name:e.name,code:e.alpha3Code}}))),C(e.data)}))}),[]),r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"main-container"},r.a.createElement("div",{className:"header"},r.a.createElement("span",{className:"title"},"COVID19"),r.a.createElement("span",{className:"date"},f($).format("DD/MM/YYYY"))),r.a.createElement("div",{className:"display-flex"},r.a.createElement("div",{className:"card-block"},r.a.createElement("div",{className:"card-container-title"},"Global"),r.a.createElement("div",{className:"card-container"},r.a.createElement("div",{className:"cards"},r.a.createElement("div",{className:"confirmed-card"},"Confirmed"),r.a.createElement("div",{className:"count"},n.confirmed)),r.a.createElement("div",{className:"cards"},r.a.createElement("div",{className:"death-card"},"Death"),r.a.createElement("div",{className:"count"},n.deaths)),r.a.createElement("div",{className:"cards"},r.a.createElement("div",{className:"recovered-card"},"Recovered"),r.a.createElement("div",{className:"count"},n.recovered)),r.a.createElement("div",{className:"cards"},r.a.createElement("div",{className:"active-card"},"Active"),r.a.createElement("div",{className:"count"},n.confirmed-n.recovered-n.deaths)))),r.a.createElement("div",{className:"card-block no-boder"},r.a.createElement("div",{className:"card-container-title"},H.name),r.a.createElement("div",{className:"card-container"},r.a.createElement("div",{className:"cards"},r.a.createElement("div",{className:"confirmed-card"},"Confirmed"),r.a.createElement("div",{className:"count"},d.confirmed)),r.a.createElement("div",{className:"cards"},r.a.createElement("div",{className:"death-card"},"Death"),r.a.createElement("div",{className:"count"},d.deaths)),r.a.createElement("div",{className:"cards"},r.a.createElement("div",{className:"recovered-card"},"Recovered"),r.a.createElement("div",{className:"count"},d.recovered)),r.a.createElement("div",{className:"cards"},r.a.createElement("div",{className:"active-card"},"Active"),d.active?r.a.createElement("div",{className:"count"},d.active):r.a.createElement("div",{className:"count"},d.confirmed-d.recovered-d.deaths))))),r.a.createElement("div",{className:"details-container"},r.a.createElement("div",{className:"left-panel"},r.a.createElement(h,{onChange:function(e){var a=e.target.value;k(a)},value:w,className:e.margin,label:"Search by Country",variant:"outlined",id:"custom-css-outlined-input"}),r.a.createElement("div",{className:"country-list"},g&&g.length?w?g.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())})).map((function(e){return z(e)})):g.map((function(e){return z(e)})):r.a.createElement("span",null,"No list"))),r.a.createElement("div",{className:"right-panel"},r.a.createElement("div",{className:"chart-container"},r.a.createElement(v.a,{width:500,height:180,data:{labels:M,datasets:[{label:"Confirmed",fill:!1,lineTension:.5,color:"rgb(239,245,252,1)",backgroundColor:"rgb(68,138,255,1)",pointBackgroundColor:"rgb(68,138,255,0.8)",borderColor:"rgb(68,138,255,1)",borderWidth:2,data:A},{label:"Deaths",fill:!1,lineTension:.5,color:"rgb(239,245,252,1)",backgroundColor:"rgb(255,82,82,1)",pointBackgroundColor:"rgb(255,82,82,0.8)",borderColor:"rgb(255,82,82,1)",borderWidth:2,data:J},{label:"Recovered",fill:!1,lineTension:.5,color:"rgb(239,245,252,1)",backgroundColor:"rgb(178,255,89,1)",pointBackgroundColor:"rgb(178,255,89,0.8)",borderColor:"rgb(178,255,89,1)",borderWidth:2,data:_}]},options:{title:{display:!1},legend:{display:!0,position:"top"}}})))),r.a.createElement("div",{className:"footer"},r.a.createElement("div",{className:"credits"},r.a.createElement("div",null,"API : ",r.a.createElement("code",null,r.a.createElement("a",{href:"https://covidapi.info/",rel:"noopener noreferrer",target:"_blank"}," covidapi.info"))),r.a.createElement("div",{className:"margin-left-20"},"Dataset : ",r.a.createElement("code",null,r.a.createElement("a",{href:"https://github.com/CSSEGISandData/COVID-19",rel:"noopener noreferrer",target:"_blank"}," John Hopkins University"))),r.a.createElement("div",{className:"margin-15"},r.a.createElement("code",{className:"made-by"},"Coded with ",r.a.createElement(u.a,{className:"love"})," by Prajwal",r.a.createElement("a",{href:"https://github.com/PrajwalMathad",rel:"noopener noreferrer",target:"_blank"},r.a.createElement("i",{className:"fab fa-github"}))))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},84:function(e,a,t){e.exports=t(203)},89:function(e,a,t){}},[[84,1,2]]]);
//# sourceMappingURL=main.1f1367c1.chunk.js.map