import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import createLogger from "progress-estimator"
import chalk from 'chalk';

const GitOptions: Partial<SimpleGitOptions> = {
   baseDir: process.cwd(),
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};



const logger=createLogger({

})

export const clone=async ({url,localPath,options}:cloneOptions)=>{
    const git:SimpleGit=simpleGit(GitOptions);
   try {
    await logger(
 git.clone(url,localPath,options),
 "克隆项目中...",{
    estimate:7000
 }   )


 console.log(chalk.blueBright("================================="))
    console.log(chalk.greenBright("================================="))
 console.log(chalk.blackBright("================================="))
 console.log(chalk.white("(♥◠‿◠)ﾉﾞ  代码下载成功   ლ(´ڡ`ლ)ﾞ  \n" +
                " .-------.       ____     __        \n" +
                " |  _ _   \\      \\   \\   /  /    \n" +
                " | ( ' )  |       \\  _. /  '       \n" +
                " |(_ o _) /        _( )_ .'         \n" +
                " | (_,_).' __  ___(_ o _)'          \n" +
                " |  |\\ \\  |  ||   |(_,_)'         \n" +
                " |  | \\ `'   /|   `-'  /           \n" +
                " |  |  \\    /  \\      /           \n" +
                " ''-'   `'-'    `-..-'              "))
 console.log(chalk.blackBright("================================="))
  console.log(chalk.greenBright("================================="))
console.log(chalk.blueBright("================================="))
}catch(error){
    console.error(chalk.red('下载失败'))
    console.log(error)
}
}

interface cloneOptions{
    url:string
    localPath:string
    options:string[]
}