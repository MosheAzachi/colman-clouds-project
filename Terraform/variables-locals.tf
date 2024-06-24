locals {
  vpc_name = "colman-cloud_project"
  vpc_cidr_block = "20.10.0.0/16"
  public_subnets = ["20.10.0.0/20","20.10.16.0/20","20.10.32.0/20"]
  common_tags = {
    project = "colman"
  }
  ec2_key_name = "keypair"
  app_ami = "ami-0891f74a1f6070222"
  instance_type = "t2.micro"
} 