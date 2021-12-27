#!/bin/bash
# 执行命令
executeCmd="php ./sleep.php"
# 日志文件
log="sleep.log"
# 错误日志文件
errLog="sleep.err.log"


# 代码
shellDir=$(dirname "$0")
cd $shellDir
executeCmdPid=""
function getExecuteCmdPid() {
  executeCmdPid=""
  executeCmdPid=$(pgrep -d" " -f "${executeCmd}")
}

function start() {
    getExecuteCmdPid
    echo "starting"
    echo "command: " $executeCmd
    if [ "$executeCmdPid" == "" ]
    then
      nohup ${executeCmd} >> $log 2>>$errLog &
#      ${executeCmd}
      sleep 1
      getExecuteCmdPid
      if [ "$executeCmdPid" != "" ]
      then
          echo "success"
      else
        echo "fail! "
      fi
    else
      echo "command: " $executeCmd
      echo "already running"
    fi
    sleep 1
}

function restart() {
  echo "restarting"
  getExecuteCmdPid
  if [ "$executeCmdPid" == "" ]
  then
    start
  else
    stop
    echo ""
    start
  fi
}

function stop() {
  getExecuteCmdPid
  echo "stopping"
  echo "command: " $executeCmd
  if [ "$executeCmdPid" == "" ]
  then
    echo "not started"
  else
      killResult=$(kill $executeCmdPid)
      getExecuteCmdPid
      if [ "$executeCmdPid" == "" ]
      then
        echo "success"
      else
        echo "fail"
      fi
  fi
}


case $1 in
  start)
      start
    ;;

  stop)
    stop
  ;;

  restart)
      restart
    ;;
    *)
      echo "Usage: start|stop|restart"
    ;;
esac

