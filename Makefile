.PHONY: image test citest integration yarn.lock

IMAGE_NAME ?= codeclimate/codeclimate-eslint

SLIM_IMAGE_NAME ?= codeclimate/codeclimate-eslint:slim

NPM_TEST_TARGET ?= test
NPM_INTEGRATION_TARGET ?= integration

DEBUG ?= false
ifeq ($(DEBUG),true)
	NPM_TEST_TARGET = test.debug
	NPM_INTEGRATION_TARGET = integration.debug
endif

image:
	docker build --rm -t $(IMAGE_NAME) .

slim: image
	docker-slim build --tag $(SLIM_IMAGE_NAME) --http-probe=false --exec '/usr/src/app/bin/eslint.js || continue' --mount "$$PWD/test/example:/code" --workdir '/code' --preserve-path-file 'paths.txt' $(IMAGE_NAME) && prettier --write slim.report.json

integration: yarn.lock
	docker run -ti --rm \
		-v $(PWD):/usr/src/app \
		--workdir /usr/src/app \
		$(IMAGE_NAME) npm run $(NPM_INTEGRATION_TARGET)

# test: yarn.lock
# 	docker run -ti --rm \
# 		-v $(PWD):/usr/src/app \
# 		--workdir /usr/src/app \
# 		$(IMAGE_NAME) npm run $(NPM_TEST_TARGET)

test: slim
	container-structure-test test --image $(IMAGE_NAME) --config test/container-test-config.yaml && container-structure-test test --image $(SLIM_IMAGE_NAME) --config test/container-test-config.yaml


citest:
	docker run --rm \
		--workdir /usr/src/app \
		$(IMAGE_NAME) sh -c "npm run test && npm run integration"

yarn.lock: package.json Dockerfile
	$(MAKE) image
	./bin/yarn install
	touch yarn.lock
