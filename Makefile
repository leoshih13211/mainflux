BUILD_DIR = build
SERVICES = users things http normalizer ws influxdb-writer influxdb-reader mongodb-writer mongodb-reader cassandra-writer cassandra-reader cli
SERVICES_DEBUG = $(addprefix debug_,$(SERVICES))
DOCKERS = $(addprefix docker_,$(SERVICES))
DOCKERS_DEBUG = $(addprefix docker_debug_,$(SERVICES))
DOCKERS_DEV = $(addprefix docker_dev_,$(SERVICES))
CGO_ENABLED ?= 0
GOOS ?= linux

define compile_service
	CGO_ENABLED=$(CGO_ENABLED) GOOS=$(GOOS) GOARCH=$(GOARCH) GOARM=$(GOARM) go build -ldflags "-s -w" -o ${BUILD_DIR}/mainflux-$(1) cmd/$(1)/main.go
endef

define debug_compile_service
	CGO_ENABLED=$(CGO_ENABLED) GOOS=$(GOOS) GOARCH=$(GOARCH) GOARM=$(GOARM) go build -gcflags "all=-N -l" -o ${BUILD_DIR}/mainflux-$(1) cmd/$(subst debug_,,$(1))/main.go
endef

define make_docker
	docker build --no-cache --build-arg SVC_NAME=$(subst docker_,,$(1)) --tag=mainflux/$(subst docker_,,$(1)) -f docker/Dockerfile .
endef

define make_docker_dev
	docker build --build-arg SVC_NAME=$(subst docker_dev_,,$(1)) --tag=mainflux/$(subst docker_dev_,,$(1)) -f docker/Dockerfile.dev ./build
endef

define make_docker_debug
	docker build --build-arg SVC_NAME=$(subst docker_,,$(1)) --tag=mainflux/$(subst docker_,,$(1)) -f docker/Dockerfile.debug .
endef

all: $(SERVICES) mqtt

.PHONY: all $(SERVICES) dockers dockers_dev latest release mqtt

clean:
	rm -rf ${BUILD_DIR}
	rm -rf mqtt/node_modules

install:
	cp ${BUILD_DIR}/* $(GOBIN)

test:
	GOCACHE=off go test -v -race -tags test $(shell go list ./... | grep -v 'vendor\|cmd')

proto:
	protoc --go_out=plugins=grpc:. *.proto

$(SERVICES_DEBUG):
	$(call debug_compile_service,$(@))

$(SERVICES):
	$(call compile_service,$(@))

$(DOCKERS):
	$(call make_docker,$(@))

dockers: $(DOCKERS)
	docker build --tag=mainflux/dashflux -f dashflux/docker/Dockerfile dashflux
	docker build --tag=mainflux/mqtt -f mqtt/Dockerfile .

$(DOCKERS_DEBUG):
	$(call make_docker_debug,$(@))

$(DOCKERS_DEV):
	$(call make_docker_dev,$(@))

dockers_dev: $(DOCKERS_DEV)

mqtt:
	cd mqtt && npm install

define docker_push
	for svc in $(SERVICES); do \
		docker push mainflux/$$svc:$(1); \
	done
	docker push mainflux/dashflux:$(1)
	docker push mainflux/mqtt:$(1)
endef

latest: dockers
	$(call docker_push,latest)

release:
	$(eval version = $(shell git describe --abbrev=0 --tags))
	git checkout $(version)
	$(MAKE) dockers
	for svc in $(SERVICES); do \
		docker tag mainflux/$$svc mainflux/$$svc:$(version); \
	done
	docker tag mainflux/dashflux mainflux/dashflux:$(version)
	docker tag mainflux/mqtt mainflux/mqtt:$(version)
	$(call docker_push,$(version))

rundev:
	cd scripts && ./run.sh

run:
	docker-compose -f docker/docker-compose.yml up

rundebug:
	docker-compose -f docker/docker-compose-debug.yml up -d

stop_debug:
	docker-compose -f docker/docker-compose.yml down

log_debug:
	cd docker && docker-compose logs -f
