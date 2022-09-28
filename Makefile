# Build local docker images
.PHONY: docker
docker:
	docker build --platform linux/amd64 -f Dockerfile -t oryd/hydra-login-consent-node:latest .
