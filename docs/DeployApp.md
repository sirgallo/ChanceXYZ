# Deploy App

## Hosted

```
  ===> serve frontend with Docker
    ===> build static files and serve over nginx
```

##  Nginx.conf

```
  ===> modify this to change nginx configuration
```

## Run Docker with single instance and nginx (Prod build)

```
  docker-compose -f docker-compose.nginx.dev.yml up --build
```


## Host on EC2 with HAPROXY

Tested with free tier t2.micro

```
  ssh -i <keypair> ec2-user@<public-domain>

  ...

  sudo yum update -y
  sudo yum install docker -y
  sudo service docker start
  sudo usermod -a -G docker ec2-user
  docker -v

  ...

  npm run build:<service>
  rsync -avP -e "ssh -i <keypair>" <service> ec2-user@<public-domain>

  ...

  docker build -f <path to dockerfile> -t <image name> .  
  docker run --network host <service> 
  
  or

  docker run --network host -p <host port:container port> <service>
```