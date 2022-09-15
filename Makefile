# Build local docker images
.PHONY: docker
docker:
		docker build -f Dockerfile -t oryd/hydra-login-consent-node:latest .
