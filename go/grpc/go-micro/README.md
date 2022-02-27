```shell
go install go-micro.dev/v4/cmd/micro@master

micro new service helloworld

go get -u google.golang.org/protobuf/proto go install github.com/golang/protobuf/protoc-gen-go@latest go install go-micro.dev/v4/cmd/protoc-gen-micro@v4

cd helloworld make proto tidy micro run

micro call helloworld Helloworld.Call '{"name": "John"}'


go install github.com/asim/go-micro/cmd/dashboard/v4@latest

etcd

dashboard --registry etcd --server_address :4000

http://localhost:4000 deafult admin@micro

micro --registry=etcd  --registry_address=127.0.0.1:2380 run
```



```shell
package main

import (
	"demo/handler"
	pb "demo/proto"

	"go-micro.dev/v4"
	log "go-micro.dev/v4/logger"
	"github.com/asim/go-micro/plugins/registry/etcd/v4"// etcd注册
)

var (
	service = "demo"
	version = "latest"
)

func main() {
	// Create service
	srv := micro.NewService(
		micro.Name(service),
		micro.Version(version),
		micro.Registry(etcd.NewRegistry()),
	)
	srv.Init()

	// Register handler
	pb.RegisterDemoHandler(srv.Server(), new(handler.Demo))

	// Run service
	if err := srv.Run(); err != nil {
		log.Fatal(err)
	}
}

```
