(this["webpackJsonpags-trs-editor"]=this["webpackJsonpags-trs-editor"]||[]).push([[0],{179:function(e,t,n){e.exports=n(288)},184:function(e,t,n){},185:function(e,t,n){},288:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(9),r=n.n(o),l=(n(184),n(19)),s=n(15),c=n(29),u=n(30),h=n(31),d=(n(185),n(167)),p=n(336),m=n(324),f=i.a.createContext({}),g=function(e){return e.replace(/^\s+/,"")},v=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).focus=function(){n.input&&n.input.focus()},n.onLineChanged=function(e){n.context.lines[n.props.index]=e.target.value,n.setState({to:e.target.value})},n.onFocus=function(e){n.context.focused=n.props.index},n.state={to:e.to},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.context.lines[this.props.index]=this.state.to,this.context.focus[this.props.index]=this.focus}},{key:"componentWillUnmount",value:function(){this.context.focus[this.props.index]=null}},{key:"render",value:function(){var e=this,t=g(this.props.from),n=t,a="";t&&t.length>200&&(n="",a=t);var o=this.state.to?g(this.state.to):"";return i.a.createElement(m.a,{container:!0,alignItems:"center",direction:"row",spacing:0,style:{marginTop:5}},i.a.createElement(m.a,{item:!0,xs:1},i.a.createElement("span",null,this.props.index+1)),i.a.createElement(m.a,{item:!0,xs:11},i.a.createElement(p.a,{label:n,helperText:a,placeholder:"Missing translation",margin:"normal",fullWidth:!0,value:o,onChange:this.onLineChanged,onFocus:this.onFocus,inputRef:function(t){t&&(e.input=t)},inputProps:{spellCheck:!0}})))}}]),t}(i.a.Component);v.contextType=f;var x=n(154),b=n.n(x),y=n(155),E=n.n(y),T=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).onSearch=function(e){if(e){var t={},a={},i=0;e=e.toLowerCase();var o=!0,r=!1,l=void 0;try{for(var s,c=n.props.lines.entries()[Symbol.iterator]();!(o=(s=c.next()).done);o=!0){var u=s.value,h=Object(d.a)(u,2),p=h[0],m=h[1];(m.from.toLowerCase().includes(e)||n.getTo(m).toLowerCase().includes(e))&&(t[i]=p,a[p]=i,i+=1)}}catch(f){r=!0,l=f}finally{try{o||null==c.return||c.return()}finally{if(r)throw l}}n.context.searchRealToVisual=a,n.context.searchVisualToReal=t,n.setState({search:t,searchText:e})}else n.context.searchRealToVisual=null,n.context.searchVisualToReal=null,n.setState({search:null,searchText:""})},n.getTo=function(e){var t=n.context.lines[e.index];return void 0===t?e.to:t},n.rowRenderer=function(e){var t=e.key,a=e.index,o=(e.isScrolling,e.isVisible),r=e.style;n.state.search&&(a=n.state.search[a]);var l=n.props.lines[a],s=n.context.lines[a];return void 0===s&&(s=l.to),o&&(n.context.lastRendered=a),i.a.createElement("div",{key:t,style:r},i.a.createElement(v,{from:l.from,to:s,index:a}))},n.state={search:null,searchText:""},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;this.context.onSearch=this.onSearch;var t=this.state.search?Object.keys(this.state.search).length:this.props.lines.length;return i.a.createElement("div",{style:{paddingLeft:10,paddingTop:60,paddingBottom:10,height:"100%",flexGrow:1}},i.a.createElement(E.a,null,(function(n){var a=n.height,o=n.width;return i.a.createElement(b.a,{key:e.state.searchText,width:o,height:a,rowCount:t,rowHeight:80,rowRenderer:e.rowRenderer,ref:function(t){t&&(e.context.list=t)},style:{paddingBottom:10}})})))}}]),t}(i.a.Component);T.contextType=f;var k=n(329),C=n(151),w=n(330),j=n(293),S=n(339),R=n(163),L=n.n(R),V=n(160),O=n.n(V),P=n(161),J=n.n(P),A=n(162),F=n.n(A),H=n(159),M=n.n(H),N=n(158),B=n.n(N),I=n(166),U=n.n(I),G=n(165),D=n.n(G),W=n(328),z=n(331),_=n(156),$=n.n(_),q=n(335),K=n(338),Q=n(333),X=n(334),Y=n(332),Z=n(164),ee=n.n(Z),te=n(5),ne=Object(te.a)({colorPrimary:{backgroundColor:"darkblue"},barColorPrimary:{backgroundColor:"lightblue"}})(W.a),ae=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).getAt=function(e){return n.context.searchVisualToReal&&(e=n.context.searchVisualToReal[e]),n.props.lines[e]},n.getTo=function(e){var t=n.context.lines[e.index];return void 0===t?e.to:t},n.isMissing=function(e){return!!n.isVisible(e)&&!n.getTo(e)},n.isVisible=function(e){return!n.context.searchRealToVisual||e.index in n.context.searchRealToVisual},n.trackProgress=function(){if(n.props.lines&&n.context.lines){var e=0,t=!0,a=!1,i=void 0;try{for(var o,r=n.props.lines[Symbol.iterator]();!(t=(o=r.next()).done);t=!0){var l=o.value;n.isMissing(l)||(e+=1)}}catch(s){a=!0,i=s}finally{try{t||null==r.return||r.return()}finally{if(a)throw i}}n.setState({full:e})}setTimeout(n.trackProgress,500)},n.getFocused=function(){return n.context.searchRealToVisual?n.context.searchRealToVisual[n.context.focused]||-1:n.context.focused||-1},n.focusLine=function(e){e.index in n.context.focus&&n.context.focus[e.index]&&n.context.focus[e.index]()},n.findNext=function(e){var t=n.getFocused();t<0&&(t=0);var a=t,i=n.props.lines.length;n.context.searchRealToVisual&&(i=Object.keys(n.context.searchRealToVisual).length);for(var o=function(){a=(a+1)%i;var o=n.getAt(a);if(e(o)||a===t)return a>=i-1&&(a=i-2),a<0&&(a=-1),n.context.list.scrollToRow(a+1),setTimeout((function(){n.focusLine(o)}),100),"break"};;){if("break"===o())break}},n.findPrev=function(e){var t=n.getFocused(),a=n.props.lines.length;n.context.searchRealToVisual&&(a=Object.keys(n.context.searchRealToVisual).length),t<0&&(t=a-1);for(var i=t,o=function(){(i=(i-1)%a)<0&&(i=a-1);var o=n.getAt(i);if(e(o)||i===t)return i<=0&&(i=1),n.context.list.scrollToRow(i-1),setTimeout((function(){n.focusLine(o)}),100),"break"};;){if("break"===o())break}},n.onNextClicked=function(){n.findNext(n.isVisible)},n.onPreviousClicked=function(){n.findPrev(n.isVisible)},n.onNextMissingClicked=function(){n.findNext(n.isMissing)},n.onPreviousMissingClicked=function(){n.findPrev(n.isMissing)},n.genFile=function(){var e="".concat(n.props.comments,"\r\n"),t=!0,a=!1,i=void 0;try{for(var o,r=n.props.lines[Symbol.iterator]();!(t=(o=r.next()).done);t=!0){var l=o.value;e+="".concat(l.from,"\r\n").concat(n.getTo(l)||"","\r\n")}}catch(s){a=!0,i=s}finally{try{t||null==r.return||r.return()}finally{if(a)throw i}}n.download(e)},n.download=function(e){var t=document.createElement("a"),n=new Blob([e],{type:"text/plain"});t.href=URL.createObjectURL(n),t.download="ags.trs",document.body.appendChild(t),t.click()},n.upload=function(){n.props.upload()},n.onSearch=function(e){n.setState({searchValue:e}),setTimeout((function(){if(n.state.searchValue===e){var t=n.context.lastRendered;if(n.context.onSearch(e),t){var a=n.findVisibleVisualIndex(t);if(0!==a&&!a)return;n.context.list.scrollToRow(a+1)}}}),200)},n.onHelpClicked=function(){n.setState({showHelp:!0})},n.onJumpToLineClicked=function(){n.setState({showJumpToLine:!0})},n.findVisibleVisualIndex=function(e){if(!n.context.searchVisualToReal)return e;for(;!(e in n.context.searchRealToVisual)&&e>=0;)e-=1;return n.context.searchRealToVisual[e]},n.onJumpToLine=function(){var e=parseInt(n.state.jumpLine);e>=n.props.lines.length?(e=n.props.lines.length-1,n.setState({jumpLine:e})):e<1&&(e=1,n.setState({jumpLine:e}));var t=n.props.lines[e],a=n.findVisibleVisualIndex(e);(0===a||a)&&(n.context.list.scrollToRow(a+1),setTimeout((function(){n.focusLine(t)}),100))},n.state={searchValue:"",showHelp:!1,showJumpToLine:!1,jumpLine:1},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){setTimeout(this.trackProgress,500)}},{key:"render",value:function(){var e=this;return i.a.createElement(i.a.Fragment,null,i.a.createElement(k.a,{position:"fixed"},i.a.createElement(w.a,null,i.a.createElement(j.a,{variant:"h6",style:{paddingRight:50}},"AGS TRS Editor"),i.a.createElement(S.a,{title:"Load","aria-label":"load"},i.a.createElement(C.a,{edge:"start",color:"inherit",onClick:this.upload},i.a.createElement(B.a,null))),this.props.lines&&i.a.createElement(i.a.Fragment,null,i.a.createElement(S.a,{title:"Save","aria-label":"save"},i.a.createElement(C.a,{edge:"start",color:"inherit",onClick:this.genFile,style:{marginRight:50}},i.a.createElement(M.a,null))),i.a.createElement(S.a,{title:"Previous missing line","aria-label":"previous missing line"},i.a.createElement(C.a,{edge:"start",color:"inherit",onClick:this.onPreviousMissingClicked},i.a.createElement(O.a,null))),i.a.createElement(S.a,{title:"Previous line (SHIFT + TAB)","aria-label":"previous line"},i.a.createElement(C.a,{edge:"start",color:"inherit",onClick:this.onPreviousClicked},i.a.createElement(J.a,null))),i.a.createElement(S.a,{title:"Next line (TAB)","aria-label":"next line"},i.a.createElement(C.a,{edge:"start",color:"inherit",onClick:this.onNextClicked},i.a.createElement(F.a,null))),i.a.createElement(S.a,{title:"Next missing line","aria-label":"next missing line"},i.a.createElement(C.a,{edge:"start",color:"inherit",onClick:this.onNextMissingClicked},i.a.createElement(L.a,null))),i.a.createElement(S.a,{title:"Jump to line","aria-label":"jump to line"},i.a.createElement(C.a,{edge:"start",color:"inherit",style:{marginLeft:40},onClick:this.onJumpToLineClicked},i.a.createElement(ee.a,null)))),this.props.loading&&i.a.createElement(z.a,null),i.a.createElement("div",{style:{flexGrow:1}}),this.props.lines&&i.a.createElement($.a,{value:this.state.searchValue,style:{paddingLeft:20},onChange:this.onSearch,onCancelSearch:function(){return e.onSearch("")}}),i.a.createElement(S.a,{title:"Help","aria-label":"help"},i.a.createElement(C.a,{color:"inherit",target:"_blank",onClick:this.onHelpClicked},i.a.createElement(D.a,null))),i.a.createElement(S.a,{title:"Source Code","aria-label":"source code"},i.a.createElement(C.a,{color:"inherit",target:"_blank",href:"https://github.com/tzachshabtay/ags-trs-editor/"},i.a.createElement(U.a,null)))),this.renderProgress()),this.renderHelpDialog(),this.renderJumpToLineDialog())}},{key:"renderProgress",value:function(){if(!this.props.lines)return null;var e=this.state&&this.state.full||0,t=Math.round(e/this.props.lines.length*100),n="".concat(e,"/").concat(this.props.lines.length," Completed (").concat(t,"%)");return i.a.createElement(S.a,{title:n,"aria-label":"progress"},i.a.createElement(ne,{variant:"determinate",value:t}))}},{key:"renderHelpDialog",value:function(){var e=this;return i.a.createElement(K.a,{open:this.state.showHelp,onClose:function(){return e.setState({showHelp:!1})},"aria-labelledby":"help-dialog-title","aria-describedby":"help-dialog-description"},i.a.createElement(Y.a,{id:"help-dialog-title"},"AGS TRS Editor- Help"),i.a.createElement(Q.a,{dividers:!0,id:"help-dialog-description"},i.a.createElement(j.a,{gutterBottom:!0},"AGS TRS Editor helps edit trs file for translating AGS (Adventure Game Studio) games. Click the load button to load a trs file, make your edits and then click the save button to download it."),i.a.createElement(j.a,null,"- If you don't want to translate a line, just leave the following line blank."),i.a.createElement(j.a,null,"- Special characters such as [ and %%s symbolize things within the game, so should be left in an appropriate place in the message.")))}},{key:"renderJumpToLineDialog",value:function(){var e=this;return i.a.createElement(K.a,{open:this.state.showJumpToLine,onClose:function(){return e.setState({showJumpToLine:!1})},"aria-labelledby":"jump-dialog-title","aria-describedby":"jump-dialog-description"},i.a.createElement(Y.a,{id:"jump-dialog-title"},"Jump To Line"),i.a.createElement(Q.a,{dividers:!0,id:"jump-dialog-description"},i.a.createElement(j.a,{gutterBottom:!0},"Select line number to jump:"),i.a.createElement(p.a,{autoFocus:!0,margin:"dense",id:"lineNumber",label:"Line Number",type:"number",InputLabelProps:{shrink:!0},inputProps:{min:"1",step:"1"},value:this.state.jumpLine,onChange:function(t){return e.setState({jumpLine:t.target.value})},fullWidth:!0})),i.a.createElement(X.a,null,i.a.createElement(q.a,{onClick:function(){return e.setState({showJumpToLine:!1})},color:"primary"},"Close"),i.a.createElement(q.a,{onClick:this.onJumpToLine,color:"primary"},"Jump")))}}]),t}(i.a.Component);ae.contextType=f;var ie=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement(f.Provider,{value:{focus:{}}},i.a.createElement(oe,null))}}]),t}(i.a.Component),oe=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).startUpload=function(){n.setState({loading:!0},n.upload)},n.upload=function(){var e=document.createElement("input");e.type="file",e.style.display="none",e.onchange=function(t){var n=t.target.files[0];if(n){var a=new FileReader;a.onload=function(t){var n=t.target.result;e.func(n),document.body.removeChild(e)},a.readAsText(n)}},e.func=n.onUploaded,document.body.appendChild(e),e.click()},n.onUploaded=function(e){var t=e.replace(/\r/g,"").split("\n"),a=[],i=null,o=null,r="",l=0,s=!0,c=!1,u=void 0;try{for(var h,d=t[Symbol.iterator]();!(s=(h=d.next()).done);s=!0){var p=h.value;p.startsWith("//")?r=r?"".concat(r,"\r\n").concat(p):p:null===i?i=p:null===o?o=p:(a.push({from:i,to:o,index:l}),l+=1,i=p,o=null)}}catch(m){c=!0,u=m}finally{try{s||null==d.return||d.return()}finally{if(c)throw u}}i&&(a.push({from:i,to:o,index:l}),l+=1),n.context.lines=new Array(a.length),n.setState({lines:a,comments:r},(function(){n.context.list&&setTimeout((function(){n.context.list.forceUpdateGrid(),n.context.list.forceUpdate(),n.context.list.scrollToRow(0)}),500)}))},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"App",style:{height:"100%"}},i.a.createElement(ae,{lines:this.state&&this.state.lines,comments:this.state&&this.state.comments,upload:this.startUpload,loading:this.state&&this.state.loading}),this.state&&this.state.lines&&i.a.createElement(T,{lines:this.state.lines,comments:this.state.comments}),(!this.state||!this.state.lines)&&i.a.createElement(j.a,{style:{paddingTop:100,paddingLeft:50}},"Please load a TRS file."))}}]),t}(i.a.Component);oe.contextType=f;var re=ie;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(re,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[179,1,2]]]);
//# sourceMappingURL=main.d8722e5b.chunk.js.map