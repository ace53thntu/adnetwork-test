APP := portal
IMAGE_REPOSITORY = aicactus-prod/adsnetwork
IMAGE_LOCAL = local-$(CI_PIPELINE_ID)-$(APP)
IMAGE_REGISTRY_ASIA = asia.gcr.io/$(IMAGE_REPOSITORY)/$(APP)
IMAGE_DEPS_REGISTRY_EU = eu.gcr.io/$(IMAGE_REPOSITORY)/$(APP)-deps:${CI_COMMIT_REF_SLUG}

build:
	docker build -t $(IMAGE_LOCAL) .

ifeq (,$(CI_COMMIT_TAG))
build-ci: YARN_BUILD=build
else
build-ci: YARN_BUILD=build
endif
build-ci:
#	docker pull $(IMAGE_DEPS_REGISTRY_EU) || :
#	docker build --target deps --cache-from $(IMAGE_DEPS_REGISTRY_EU) -t $(IMAGE_DEPS_REGISTRY_EU) .
#	docker push $(IMAGE_DEPS_REGISTRY_EU)
	docker build --build-arg YARN_BUILD=$(YARN_BUILD) --cache-from $(IMAGE_DEPS_REGISTRY_EU) -t $(IMAGE_LOCAL) .

push: IMAGE_TAG ?= latest
push: build-ci
	docker tag $(IMAGE_LOCAL) $(IMAGE_REGISTRY_ASIA):$(IMAGE_TAG)
	docker push $(IMAGE_REGISTRY_ASIA):$(IMAGE_TAG)

deploy-staging: CLUSTER_NAME ?= dmp-build
deploy-staging: CLUSTER_LOCATION ?= europe-west1-d
deploy-staging: CLUSTER_NAMESPACE ?= staging
deploy-staging: HELM_RELEASE ?= adnetwork
deploy-staging:
# gcloud container clusters get-credentials $(CLUSTER_NAME) --zone $(CLUSTER_LOCATION)
	kubectl -n $(CLUSTER_NAMESPACE) rollout restart deployment.apps/$(HELM_RELEASE)-$(APP)

up:
	docker-compose up -d postgresql
	docker-compose exec -T postgresql bash -c \
		"POSTGRES_USER=root POSTGRES_PASSWORD=secret /tmp/scripts/wait-for-postgres.sh localhost 5432 echo \"createdb aicactus_auth; createdb aicactus_audience; createdb aicactus_category\""
	docker-compose up -d auth-api audience-api category-api

down:
	docker-compose down

update:
	docker-compose pull
	docker-compose up -d
