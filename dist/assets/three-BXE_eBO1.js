import{r as g,u as c,w as b,F as k}from"./FileSaver.min-BFMgho32.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{r as d,b as u,c as S,e as i,f as h,o as C,g as f,p as B,h as F,a as p}from"./index-BAIxjtUA.js";const m=n=>(B("data-v-46a0132a"),n=n(),F(),n),I={class:"container"},N=m(()=>p("i",{class:"el-icon-upload"},null,-1)),E=m(()=>p("div",{class:"el-upload__text"},[f("将文件拖到此处，或"),p("em",null,"点击上传")],-1)),T={__name:"three",setup(n){const r=d([]),l=d([]),x=async t=>{console.log(t);const e=t.raw;if(e.length<=0)return!1;if(!/\.(xls|xlsx)$/.test(e.name.toLowerCase()))return console.log("上传格式不正确，请上传xls或者xlsx格式"),!1;const o=new FileReader;o.onload=a=>{const s=g(a.target.result,{type:"binary"}),w=s.SheetNames[0],_=c.sheet_to_json(s.Sheets[w]);console.log(_),r.value=_},o.readAsBinaryString(e)},v=async()=>{r.value.forEach(s=>{s.logFC>-3&&s.logFC<3||l.value.push(s)}),console.log(l.value);const t=c.json_to_sheet(l.value),e=c.book_new();c.book_append_sheet(e,t,"Sheet1");const o=b(e,{bookType:"xlsx",type:"array"}),a=new Blob([o],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});k.saveAs(a,"test.xlsx"),r.value=[],l.value=[]};return(t,e)=>{const o=u("el-upload"),a=u("el-button");return C(),S("div",I,[i(o,{class:"upload-demo",action:"",drag:"","auto-upload":!1,"on-change":x,limit:1},{default:h(()=>[N,E]),_:1}),i(a,{onClick:v},{default:h(()=>[f("导出数据")]),_:1})])}}},L=y(T,[["__scopeId","data-v-46a0132a"]]);export{L as default};