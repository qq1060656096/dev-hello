package main

import (
	"demo/handler"
	pb "demo/proto"

	"go-micro.dev/v4"
	log "go-micro.dev/v4/logger"
	"github.com/asim/go-micro/plugins/registry/etcd/v4"
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
