import {input,select} from "@inquirer/prompts"
import { clone } from "../utils/clone";


interface TemplateInfo {
    name:string;//模板名称
    downLoadUrl:string//下载路径
    description:string//描述
    branch:string//模板分支
}


const templates:Map<string,TemplateInfo>=new Map([
    ['Vue-Template',{
        name:'Vue-Template',
        downLoadUrl:'https://gitee.com/sohucw/admin-pro.git',
        description:'这是一个基于Vue3的模板',
        branch:'dev10'
    }],
    ['React-Template',{
        name:'React-Template',  
        downLoadUrl:'https://gitee.com/sohucw/admin-pro.git',
        description:'这是一个基于React的模板',
        branch:'dev9'
    }],
])



export const create=async (projectName?:string)=>{
       //提供可选模板列表
       const templateList=Array.from(templates).map((item:[string,TemplateInfo])=>{
        const [name,info]=item
        return {
            name,
            value:info.name,
            description:info.description,
        }
       })
       if(!projectName) {
        projectName=await input({message:'请输入项目名称:'})
       }
       const selectName=await select({message:'请选择一个模板',choices:templateList})
       const info=templates.get(selectName) as TemplateInfo
       console.log("选择的模块为: ",info)
      await clone({url:info.downLoadUrl,localPath:info.name,options:['-b',info.branch]})
    }