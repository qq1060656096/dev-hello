# app-run


### app-run.sh
平时我们写项目时都会运行一些常住命令，有时候进程会挂掉，导致我们的程序停止运行。所以我们需要一个要维护常住进程的脚本，监听我们的进程，如果挂了就自动重启。公司用的 pm2 或者 supervisor之类的。有时候帮朋友搞搞小项目，又不想简单些，就搞了个脚本，然后通过计划任务每分钟检测，挂了就重启，所以本脚本多次调用没有副作用。



linux shell 通用常住脚本，让你的程序挂了自动重启


1. app-run.sh 放入到指定目录中（我一般是放在项目目录中）
2. 修改 app-run.sh 中 executeCmd 执行的命令 和 日志存放的位置
3. 设置linux定时任务每分钟执行一次
1. app-run.sh 放入到指定目录中（我一般是放在项目目录中）

这里我使用demo目录演示

cd ~/demo
2. 修改 app-run.sh 中 executeCmd 执行的命令 和 日志存放的位置

# 执行命令
executeCmd="php ./sleep.php"
# 日志文件
log="sleep.log"
# 错误日志文件
errLog="sleep.err.log"
3. 设置linux定时任务每分钟执行一次

chmod 755 ~/demo/app-run.sh # 设置脚本执行权限
crontab -e # 执行命令，并输入一下内容保存
*/1 * * * * ~/demo/app-run.sh start
crontab -l # 列出定时任务
ps -ef | grep sleep # 查看 php sleep是否在运行
等会1分钟执行后就会生成日志文件。