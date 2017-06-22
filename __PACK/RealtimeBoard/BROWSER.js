RealtimeBoard.ArticleModel=OBJECT({preset:()=>{return RealtimeBoard.MODEL},params:()=>{let e={title:{notEmpty:!0,size:{max:255}},content:{notEmpty:!0,size:{max:3e3}}};return{name:"Article",methodConfig:{create:{valid:VALID(e)},update:{valid:VALID(e)}}}}});RealtimeBoard.MAIN=METHOD({run:t=>{RealtimeBoard.MATCH_VIEW({uri:["","list/{page}"],target:RealtimeBoard.List}),RealtimeBoard.MATCH_VIEW({uri:["write","update/{id}"],target:RealtimeBoard.Form}),RealtimeBoard.MATCH_VIEW({uri:"view/{id}",target:RealtimeBoard.View})}}),RealtimeBoard.Form=CLASS({preset:()=>{return VIEW},init:(t,e,o)=>{let i,n,a,r,d=Yogurt.Wrapper({c:[n=Yogurt.Toolbar({left:Yogurt.BackButton({on:{tap:()=>{RealtimeBoard.GO("")}}})}),DIV({style:{padding:20},c:[a=UUI.VALID_FORM({errorMsgs:{title:{notEmpty:"글 제목을 입력해주세요."},content:{notEmpty:"글 내용을 입력해주세요."}},errorMsgStyle:{color:"red",marginTop:5},c:[Yogurt.Input({name:"title",placeholder:"글 제목"}),Yogurt.Textarea({style:{marginTop:10},name:"content",placeholder:"글 내용"}),Yogurt.Submit({style:{marginTop:20},value:"작성 완료"})],on:{submit:(t,e)=>{let o=e.getData();void 0===i?RealtimeBoard.ArticleModel.create(o,{notValid:e.showErrors,success:t=>{RealtimeBoard.GO("")}}):(o.id=i,RealtimeBoard.ArticleModel.update(o,{notValid:e.showErrors,success:t=>{RealtimeBoard.GO("view/"+t.id)}}))}}})]})]}).appendTo(BODY);t.on("paramsChange",t=>{i=t.id,void 0!==r&&(r.exit(),r=void 0),void 0===i?(TITLE("글 작성"),n.setTitle("글 작성")):(TITLE("글 수정"),n.setTitle("글 수정"),r=RealtimeBoard.ArticleModel.getWatching(i,(t,e,o)=>{void 0!==d&&(a.setData(t),o(()=>{RealtimeBoard.GO("")}))}))}),t.on("close",()=>{d.remove(),d=void 0,void 0!==r&&(r.exit(),r=void 0)})}}),RealtimeBoard.List=CLASS({preset:()=>{return VIEW},init:(t,e)=>{TITLE("실시간 게시판");let o,i,n=Yogurt.Wrapper({c:[Yogurt.Toolbar({title:A({c:"실시간 게시판",on:{tap:()=>{RealtimeBoard.GO("")}}}),right:Yogurt.ToolbarButton({icon:FontAwesome.GetIcon("pencil"),title:"글 작성",on:{tap:()=>{RealtimeBoard.GO("write")}}})}),DIV({style:{padding:20},c:[o=UUI.LIST(),i=DIV({style:{marginTop:15}})]})]}).appendTo(BODY),a=10;RealtimeBoard.ArticleModel.count(t=>{REPEAT(Math.ceil(t/a),t=>{t+=1,i.append(A({style:{marginRight:5},c:t,on:{tap:()=>{RealtimeBoard.GO("list/"+t)}}}))})});let r;t.on("paramsChange",t=>{let e=REAL(t.page);void 0===e&&(e=1),o.removeAllItems(),void 0!==r&&r.exit(),r=RealtimeBoard.ArticleModel.onNewAndFindWatching({sort:{createTime:-1},start:(e-1)*a,count:a},(t,i,n,a,r)=>{if(1===e||r!==!0){let e,a;o.addItem({isFirst:!0,key:t.id,item:e=LI({style:{cursor:"pointer",border:"1px solid #ddd",marginTop:-1},c:a=DIV({style:{padding:10},c:t.title}),on:{tap:()=>{RealtimeBoard.GO("view/"+t.id)}}})}),r===!0&&ANIMATE({node:e,keyframes:{from:{height:0,overflow:"hidden",backgroundColor:"yellow"},to:{height:e.getInnerHeight(),overflow:e.getStyle("overflow"),backgroundColor:"#fff"}}}),i(t=>{a.empty(),a.append(t.title)}),n(()=>{UANI.HIDE_SLIDE_UP({node:e},()=>{o.removeItem(t.id)})})}})}),t.on("close",()=>{n.remove(),n=void 0,void 0!==r&&(r.exit(),r=void 0)})}}),RealtimeBoard.View=CLASS({preset:()=>{return VIEW},init:(t,e,o)=>{let i,n,a,r,d=Yogurt.Wrapper({c:[i=Yogurt.Toolbar({left:Yogurt.BackButton({on:{tap:()=>{RealtimeBoard.GO("")}}}),right:a=Yogurt.ToolbarButton({icon:FontAwesome.GetIcon("pencil"),title:"글 수정"})}),n=DIV({style:{padding:20}})]}).appendTo(BODY);t.on("paramsChange",t=>{let e=t.id;void 0!==r&&(r.exit(),r=void 0),r=RealtimeBoard.ArticleModel.getWatching(e,(t,o,r)=>{if(void 0!==d){TITLE(t.title),i.setTitle(t.title),a.on("tap",()=>{RealtimeBoard.GO("update/"+t.id)});let d;n.append(d=P({c:t.content})),n.append(DIV({c:A({c:"글 삭제",on:{tap:()=>{confirm("정말 글을 삭제하시겠습니까?")===!0&&RealtimeBoard.ArticleModel.remove(e,()=>{RealtimeBoard.GO("")})}}})})),o(t=>{TITLE(t.title),i.setTitle(t.title),d.empty(),d.append(t.content)}),r(()=>{RealtimeBoard.GO("")})}})}),t.on("close",()=>{d.remove(),d=void 0,void 0!==r&&(r.exit(),r=void 0)})}});