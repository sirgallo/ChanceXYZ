# AWS

## VPC

  `What is it?` --> basically just a virtual network, or isolated resources within aws

  VPCs are created in a specific region and can have 

  `In AWS VPC Console -->` 
    Create a VPC with an assigned cidr group (assigning private ip address range to systems), say `IPv4 10.0.0.0/16`. The prefix assigns the base IP, so `10.0.x.x` and has a range from `10.0.0.0-10.0.255.255`. The `16` represents the subnet mask, which in this case spans the last two zeros of the ip prefix, leading to a total of `65,536` options.

## Subnets

  `What are they?` --> subnets are again isolated resources within an aws VPC. They can exist on different availability zones within the VPC.

  When creating subnets, they need to in total encompass less than or equal to the size of the VPC cidr block. So:

  ```
    ip ranges of individual subnets <= ip range of VPC
  ```

  In this case, a subnet is chosen to span `IPv4 10.0.0.0/24`, so only the last digit is the subnet mask. This limits the total amount of ip addresses per subnet to `255`.

  In total, with the current setup, each VPC can have `255` subnets, each with `255` individual ip addresses

## Route Tables

  The route tables determine how traffic is routed within the VPC/subnets. On local route tables between systems communicating internally to each other, set the destination to the current cidr block.
  
## Security Groups

  Security Groups determine what traffic is allowed to flow between the systems in the VPC/subnets and the outside world. For the most part, it is good practice to try and enclose most systems by only making them accessible internally, and then making a single facing load balancer the only point facing the world.

## Elastic IP

  Elastic IP addresses are a way to assign static IP addresses to a system. Assign these to something like a load balancer, while any apis or worker systems can assume dynamic IP addresses since they are not outward facing.

## Route 53

  Currently using `GoDaddy` for domain names, but should transition to `Route 53`