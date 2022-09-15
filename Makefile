# Build local docker images
.PHONY: docker
docker:
		docker build -f Dockerfile -t oryd/hydra-login-consent-node:v2.0.0-alpha.0.pre.0 .
