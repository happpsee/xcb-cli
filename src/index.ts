import { Command } from "commander";
import {version} from "../package.json"
import { create } from "./command/create";
import { update } from "./command/update";

const program=new Command()

program.version(version,'-v,--version')



program.command('create')
.description('创建一个新的项目')
.argument('[name]')
.action((dirname)=>{
    if(dirname){
    create(dirname)
    }else {
        create()
    }
})


program.command('update')
.description('更新xcb-cli到最新版本')
.action(async ()=>{
     update()
})


program.parseAsync(process.argv);

