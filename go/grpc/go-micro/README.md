
go get github.com/micro/micro/v2


1. 安装 pb 插件
go get github.com/micro/micro/v2/cmd/protoc-gen-micro@master

2. 生成 pb
protoc --proto_path=$GOPATH/src:. --micro_out=. --go_out=. ./api/hello/demo.proto

3. 运行
go run cmd/hello/main.go

go run cmd/hello/client.go



