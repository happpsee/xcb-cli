
import chalk from 'chalk';
import process from 'child_process';
import ora from 'ora';

const spinner = ora({
    text:'xcb-cli is updating...',
    spinner:{
        frames:['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'].map((item:string)=>{
            return chalk.blueBright(item)    
        }),
        interval:100
    }
});

export const update=()=>{
    spinner.start();
    process.exec('npm install xcb-cli@latest -g',(err)=>{
        spinner.stop();
        if(!err){
            console.log(chalk.green('xcb-cli 已成功更新到最新版本！'));
            console.log(chalk.blueBright('请重新打开终端或运行 `xcb` 命令以使用最新版本。'));
            return;
        }
        else{
        console.error(chalk.red('更新失败，请检查网络连接或权限问题。'),err);
        }
    });
}