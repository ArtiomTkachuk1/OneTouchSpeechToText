(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{120:function(e,t,n){},121:function(e,t,n){"use strict";n.r(t);var a=n(21),r=n(22),i=n(25),o=n(24),l=n(0),s=n.n(l),c=n(6),p=n.n(c),u=n(76),m=n(164),d=n(75),g=n.n(d),h=n(74),f=n.n(h),v=n(27),b=n(156),y=n(129),_=n(165),E=n(125),w=n(124),O=n(126),k=n(161),j=n(159),C=n(72),x=n.n(C);function S(e){var t=Object(b.a)((function(t){return{container:{display:"flex",flexWrap:"wrap"},textField:{display:"flex",width:e.width,marginTop:e.marginTop,margin:"auto"},button:{display:"flex",width:e.width,marginTop:e.marginTop,margin:"auto"},FormHelperText:{display:"flex",width:e.width,margin:"auto",marginTop:7,color:"red "},input:{display:"none"},rightIcon:{marginLeft:t.spacing(1)},iconSmall:{fontSize:20}}}))(),a=s.a.useState(""),r=Object(v.a)(a,2),i=r[0],o=r[1],l=s.a.useState(""),c=Object(v.a)(l,2),p=c[0];c[1];return e.values.name===e.types[0]?s.a.createElement("div",null,s.a.createElement(j.a,{label:"YouTube url",id:"margin-normal",defaultValue:"",className:t.textField,onChange:function(e){o(e.target.value)},helperText:"",margin:"normal"}),s.a.createElement(k.a,{variant:"outlined",color:"primary",className:t.button,onClick:function(t){t.preventDefault(),console.log(p);var a=e.default_check();if(!0===a){var r=!1,o=!1;if(void 0!==x.a.parse(i)&&(r=!0),!1===r){var l=i.indexOf(".link");0===i.indexOf("http://")&&l===i.length-5&&(o=!0)}if(!1===r&&!1===o)0===i.indexOf("rtsp://")&&!0;if(!1===r&&!1===o&&!1===o){var s=i.indexOf(".mjpg");if(0!==i.indexOf("http://")||s!==i.length-5)return void e.seterror_mesage(e.error_mesage_strings[3]);!0}n(53)({method:"post",url:"/file_from_ref",data:{ref:i,t_model:e.nn}}).then((function(t){e.set_page_to_1(),console.log(t)})).catch((function(e){return console.warn(e)}))}else e.seterror_mesage(a)}},"Go"),s.a.createElement(E.a,{className:t.FormHelperText},e.error_mesage)):null}var T=n(73),I=n.n(T),N=n(162);function D(e){var t=Object(b.a)((function(t){return{div:{display:"flex",flexWrap:"wrap"},textField:{display:"flex",width:e.width,marginTop:e.marginTop,margin:"auto"},button:{display:"flex",width:e.width,marginTop:e.marginTop,margin:"auto"},FormHelperText:{display:"flex",width:e.width,margin:"auto",marginTop:7,color:"red "},input:{display:"none"},rightIcon:{marginLeft:t.spacing(1)},iconSmall:{fontSize:20}}}))(),a=s.a.useState(""),r=Object(v.a)(a,2),i=r[0],o=r[1],l=s.a.useState(""),c=Object(v.a)(l,2),p=(c[0],c[1]),u=n(113),m="";return e.values.name===e.types[1]?s.a.createElement("div",{key:u()},s.a.createElement(N.a,{key:u()},s.a.createElement("input",{accept:"video/*,audio/*",className:t.input,id:"contained-button-file",multiple:!0,type:"file",name:"inputFile",ref:function(e){return m=e},onChange:function(e){e.preventDefault(),o(m.files[0]),p(m.files[0].name)}})),s.a.createElement("label",{htmlFor:"contained-button-file"},s.a.createElement(k.a,{variant:"contained",component:"span",className:t.button},"Upload",s.a.createElement(I.a,{className:t.rightIcon})),s.a.createElement(k.a,{type:"submit",variant:"outlined",color:"primary",className:t.button,onClick:function(t){t.preventDefault();var a=e.default_check();if(!0===a)if(""!==i){var r=i,o=new FormData;o.append("media",r);var l={t_model:e.nn},s=JSON.stringify(l),c=new Blob([s],{type:"application/json"});o.append("settings",c),function(t){n(53).post("/file_from_form",t).then((function(t){e.set_page_to_1(),console.log(t)})).catch((function(e){return console.warn(e)}))}(o)}else e.seterror_mesage(e.error_mesage_strings[0]);else e.seterror_mesage(a)}},"Go"),s.a.createElement(E.a,{className:t.FormHelperText},e.error_mesage))):null}var F=n(45),A=n(31),W=(n(120),n(55),[s.a.createElement(A.b,{title:s.a.createElement("span",{className:"submenu-title-wrapper"},"Choose transcribe model"),key:"0",popupOffset:[10,15],style:{width:"100%",backgroundColor:"white"}},s.a.createElement(A.a,{key:"1"},"Deep Speech"),s.a.createElement(A.b,{key:"2-2",title:s.a.createElement("span",{className:"submenu-title-wrapper"},"Silero")},s.a.createElement(A.a,{key:"2"},"English"),s.a.createElement(A.a,{key:"3"},"German"),s.a.createElement(A.a,{key:"4"},"Spaninsh")))]);function z(e){console.log("onOpenChange",e)}var H=s.a.createElement("span",null,"Add More Items"),L=function(e){Object(i.a)(n,e);var t=Object(o.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).state={children:W,overflowedIndicator:void 0},r.toggleOverflowedIndicator=function(){r.setState({overflowedIndicator:void 0===r.state.overflowedIndicator?H:void 0})},r.handleClick=r.handleClick.bind(Object(F.a)(r)),r}return Object(r.a)(n,[{key:"handleClick",value:function(e){console.log("clicked ".concat(e.key)),console.log(e),this.props.set_nn(e.key)}},{key:"render",value:function(){var e=this.props.triggerSubMenuAction,t=this.state,n=t.children,a=t.overflowedIndicator;return s.a.createElement("div",null,this.props.updateChildrenAndOverflowedIndicator&&s.a.createElement("div",null,s.a.createElement("button",{onClick:this.toggleChildren},"toggle children"),s.a.createElement("button",{onClick:this.toggleOverflowedIndicator},"toggle overflowedIndicator")),s.a.createElement(A.c,{onClick:this.handleClick,triggerSubMenuAction:e,onOpenChange:z,selectedKeys:["0"],mode:this.props.mode,openAnimation:this.props.openAnimation,defaultOpenKeys:this.props.defaultOpenKeys,overflowedIndicator:a,style:{width:"100%"}},n))}}]),n}(s.a.Component);function M(e){return s.a.createElement(L,{backgroundColor:"red",set_nn:e.set_nn,mode:"horizontal",openAnimation:"slide-up"})}function G(e){var t=["YouTube","File with record"],n=Object(b.a)((function(e){return{formControl:{display:"flex",margin:"auto",width:"40%",marginTop:"6%"}}}))(),a=s.a.useState({type:"",name:""}),r=Object(v.a)(a,2),i=r[0],o=r[1],l=["deepspeech","silero/en","silero/de","silero/es"],c=["Upload file first","Choose type of transcribe model first","Number of seconds must be natural number","Link is incorrect"],p=s.a.useState(""),u=Object(v.a)(p,2),m=u[0],d=u[1],g=s.a.useState(""),h=Object(v.a)(g,2),f=h[0],k=h[1],C=function(){return""!==f?(!0,!0):c[1]};return 0===e.page?s.a.createElement("div",null,s.a.createElement("div",{className:n.formControl},s.a.createElement(M,{set_nn:k})),s.a.createElement(w.a,{className:n.formControl},s.a.createElement(j.a,{value:["Deep Speech","Silero English","Silero German","Silero Spanish"][f-1],margin:"normal",helperText:"Choose transcribe model",InputProps:{readOnly:!0}})),s.a.createElement(w.a,{className:n.formControl},s.a.createElement(y.a,{htmlFor:"type-helper"},"Type of video"),s.a.createElement(O.a,{value:i.type,onChange:function(e){d(""),o({type:e.target.value,name:t[e.target.value]})},inputProps:{name:"type",id:"type-helper"}},s.a.createElement(_.a,{value:""},s.a.createElement("em",null,"None")),s.a.createElement(_.a,{value:0},t[0]),s.a.createElement(_.a,{value:1},t[1])),s.a.createElement(E.a,null,"Choose type of media")),s.a.createElement(S,{set_im_src:e.set_im_src,set_page_to_1:e.set_page_to_1,width:"40%",values:i,types:t,nn:l[f-1],default_check:C,marginTop:"4%",seterror_mesage:d,error_mesage:m,error_mesage_strings:c}),s.a.createElement(D,{set_im_src:e.set_im_src,set_page_to_1:e.set_page_to_1,width:"40%",values:i,types:t,nn:l[f-1],default_check:C,marginTop:"6%",seterror_mesage:d,error_mesage:m,error_mesage_strings:c})):null}var K=n(163),U=function(e){Object(i.a)(n,e);var t=Object(o.a)(n);function n(e){return Object(a.a)(this,n),t.call(this,e)}return Object(r.a)(n,[{key:"render",value:function(){return!0===this.props.loading?s.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",margin:"auto",marginTop:"20%"}},s.a.createElement(K.a,{style:{width:"200px",height:"200px"}})):null}}]),n}(s.a.Component),J=function(e){Object(i.a)(n,e);var t=Object(o.a)(n);function n(e){return Object(a.a)(this,n),t.call(this,e)}return Object(r.a)(n,[{key:"render",value:function(){return 0==this.props.loading?s.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",margin:"auto",width:"60%"}},s.a.createElement(j.a,{style:{width:"100%"},value:this.props.transcribtion,margin:"normal",multiline:!0,rowsMax:10,helperText:"result of transcribtion",InputProps:{readOnly:!0}})):null}}]),n}(s.a.Component),P=function(e){Object(i.a)(l,e);var t=Object(o.a)(l);function l(e){var n;return Object(a.a)(this,l),(n=t.call(this,e)).state={loading:!0},n}return Object(r.a)(l,[{key:"componentDidUpdate",value:function(e){var t=this;1===this.props.page&&this.props.page!==e.page&&(console.log("kra"),n(53).get("http://127.0.0.1:5000/get_transcribtion",{headers:{"Access-Control-Allow-Origin":"Kra"}}).then((function(e){var n=e.data;console.log(n),t.props.set_transcribtion(n),t.setState({loading:!1})})))}},{key:"render",value:function(){return 1===this.props.page?s.a.createElement("div",{style:{width:"100%",height:"100%",display:"flex",margin:"auto"}},s.a.createElement(U,{loading:this.state.loading}),s.a.createElement(J,{loading:this.state.loading,transcribtion:this.props.transcribtion})):null}}]),l}(s.a.Component),B=f.a,Y=g.a,V=(B[500],Y[300],Object(u.a)({spacing:4,palette:{type:"light",primary:B,secondary:Y},status:{danger:"orange"}})),q=function(e){Object(i.a)(n,e);var t=Object(o.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).set_page_to_1=function(){r.setState({page:1})},r.set_transcribtion=function(e){r.setState({transcribtion:e})},r.updateWindowDimensions=function(){r.setState({width:window.innerWidth,height:window.innerHeight})},r.state={page:0,transcribtion:""},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}},{key:"render",value:function(){return s.a.createElement(m.a,{theme:V},s.a.createElement("div",null,s.a.createElement(G,{page:this.state.page,set_page_to_1:this.set_page_to_1}),s.a.createElement(P,{page:this.state.page,transcribtion:this.state.transcribtion,set_transcribtion:this.set_transcribtion})))}}]),n}(s.a.Component);p.a.render(s.a.createElement(q,null),document.getElementById("root"))},88:function(e,t,n){e.exports=n(121)}},[[88,1,2]]]);
//# sourceMappingURL=main.d937e88f.chunk.js.map