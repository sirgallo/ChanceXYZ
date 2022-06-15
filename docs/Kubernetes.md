# Kubernetes 

## Basics and Local Deployment --> Testing


## Download Minikube on Linux

`Check out the documents for different systems at -->`

<a href="https://minikube.sigs.k8s.io/docs/start/">https://minikube.sigs.k8s.io/docs/start/</a>


## Tagging a Docker Image for Kubernetes Deployment

```
  docker build -f <docker-compose-file> -t <image-tag-from-docker-compose-file> <source-path>
```


## Convert docker-compose Files to Kubernetes Services

```
  kompose convert -f <docker-compose-file>
```

The `kompose` command is used to convert an existing docker-compose file into kubernetes services, where the underlying containers are running the docker runtime. Only major versions of docker-compose are supported and some features may not be compatible


## Minikube

For local testing, use `minikube`, the official test platform for running a local kubernetes cluster within docker. 

`Configure`

```
  minikube delete //  only if you need to delete the current running instance
  minikube config set memory <memory-limit>
  minikube config set cpus <num-cpus>
  minikube start

  eval $(minikube docker-env) //  set docker environment
  docker build -f <docker-compose-file> -t <image-tag-from-docker-compose-file> <source-path> //  need to rebuild image after local docker img repo is set
```

`Dashboard`

```
  minikube dashboard
```


## Deploying to Minikube using Kubectl

In <name>-deployment.yaml, add:

```
  imagePullPolicy: Never
```

```
for each kubernetes.yaml file, minus service file

  kubectl apply -f <name-of-service-file>
  kubectl expose deployment <deployment-name> --type=NodePort --port=<port-of-pods-to-expose> --name=<name-of-service>
```

## List Pods

```
  kubectl get pods -A
```

## Get a Service

```
  kubectl get services <service-name>
```

## Get Service URL

```
  minikube service <service-name> --url
```

## Delete a Service

```
  kubectl delete svc <service-name>
```