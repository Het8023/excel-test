import{r as k,u as d,w as y,F as S}from"./FileSaver.min-CcbRIssf.js";import{_ as I}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{r as p,b as f,d as B,w as D,u as C,c as E,e as h,f as m,o as F,g as v,p as N,h as G,a as _}from"./index-smnFP8Mu.js";const x=c=>(N("data-v-72d7a900"),c=c(),G(),c),L={class:"container"},T=x(()=>_("i",{class:"el-icon-upload"},null,-1)),V=x(()=>_("div",{class:"el-upload__text"},[v("将文件拖到此处，或"),_("em",null,"点击上传")],-1)),A={__name:"one",setup(c){let w=p(!1);const n=p([]),u=p([]),g=async(t,r)=>{const e=t.raw;if(e.length<=0)return!1;if(!/\.(xls|xlsx)$/.test(e.name.toLowerCase()))return console.log("上传格式不正确，请上传xls或者xlsx格式"),!1;const o=new FileReader;o.onload=l=>{const i=k(l.target.result,{type:"binary"}),a=i.SheetNames[0],s=d.sheet_to_json(i.Sheets[a]);n.value.push(s)},o.readAsBinaryString(e)},b=async()=>{n.value.forEach(a=>{a.forEach(s=>{s.GeneID})});const t={},r=[];n.value.flat().forEach(a=>{const s=a.GeneID;t[s]=(t[s]||0)+1,t[s]==n.value.length&&r.push(a)});const e=d.json_to_sheet(r),o=d.book_new();d.book_append_sheet(o,e,"Sheet1");const l=y(o,{bookType:"xlsx",type:"array"}),i=new Blob([l],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});S.saveAs(i,"test.xlsx"),n.value=[],u.value=[]};return(t,r)=>{const e=f("el-upload"),o=f("el-button"),l=B("loading");return D((F(),E("div",L,[h(e,{class:"upload-demo","file-list":u.value,action:"",drag:"","auto-upload":!1,multiple:"","on-change":g,limit:9},{default:m(()=>[T,V]),_:1},8,["file-list"]),h(o,{onClick:b},{default:m(()=>[v("导出重复数据")]),_:1})])),[[l,C(w)]])}}},$=I(A,[["__scopeId","data-v-72d7a900"]]);export{$ as default};
