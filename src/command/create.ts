import {input,select} from "@inquirer/prompts"
import { clone } from "../utils/clone";
import {name,version} from "../../package.json"
import axios, { type AxiosResponse } from "axios";
import chalk from "chalk";
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


export const getNpmInfo=async (npmName:string)=>{
    const npmUrl=`https://registry.npmjs.org/${name}`
    try {
       const  res=await axios.get(npmUrl) 
         return res
    }catch(error){
        console.error(`获取npm包${npmName}的最新版本失败:`, error)
    }
}
export const getNpmLatestVersion=async (name:string)=>{
   const {data}= await getNpmInfo(name) as AxiosResponse

   return data['dist-tags']?.latest
}


export const checkVersion=async (name:string,version:string)=>{
   const latestVersion= await getNpmLatestVersion(name)
   const need=latestVersion>version?true:false//看看远程库的版本是不是领先了
   //如果版本领先，version需要更新
   if(need){
    console.warn(`当前xcb-cli版本为${chalk.blackBright(version)},最新版本为${chalk.blackBright(latestVersion)},请更新到最新版本`)
    console.log(`可使用: ${chalk.yellow('pnpm add -g xcb-cli')}, 或者使用:${chalk.yellow('xcb update')}`)   
}
return ;
}

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

       //检查版本更新
       await checkVersion(projectName,version)

       //版本没有问题后，我们再去进行下面的操作

       const selectName=await select({message:'请选择一个模板',choices:templateList})
       const info=templates.get(selectName) as TemplateInfo
       console.log("选择的模块为: ",info)
      await clone({url:info.downLoadUrl,localPath:info.name,options:['-b',info.branch]})
    }