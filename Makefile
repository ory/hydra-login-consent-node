# Build local docker images
.PHONY: docker
docker:
	docker build --platform linux/amd64 -f Dockerfile -t oryd/hydra-login-consent-node:latest .

format: node_modules
	npm exec -- prettier --write .

licenses: .bin/licenses node_modules  # checks open-source licenses
	.bin/licenses

.bin/licenses: Makefile
	curl https://raw.githubusercontent.com/ory/ci/master/licenses/install | sh

node_modules: package-lock.json
	npm ci
	touch node_modules
