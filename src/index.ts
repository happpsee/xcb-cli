import { Command } from "commander";
import {version} from "../package.json"
import { create } from "./command/create";

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


program.parseAsync(process.argv);

