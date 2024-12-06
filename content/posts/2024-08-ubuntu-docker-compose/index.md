--- 
slug: setting-up-ubuntu-server-docker-compose
title: "Technical Notes: Setting Up an Ubuntu Server for Docker Compose"

date: 2024-08-02

tags: 
  - AI
  - MLOps
  - Linux
--- 

# 

In this technical notes, I'll walk through the process of setting up an Ubuntu server to host Docker Compose services. This setup includes installing Docker, configuring the NVIDIA Container Toolkit (if required for GPU-based workloads), and running a sample service with Docker Compose.

---

## Prerequisites

Before start, ensure you have the following:

- A fresh Ubuntu server with SSH access.
- Administrative (root) privileges on the server.

---

## Step 1: Update and Upgrade the System

First, connect to your server via SSH and update the package list. It's always a good practice to ensure your system is up-to-date.

```bash
sudo apt update
sudo apt upgrade -y
```

---

## Step 2: Install Docker

Docker is a platform that allows you to build, ship, and run applications in lightweight containers. To install Docker, use the official installation script:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

After installation, add your user to the `docker` group so you can run Docker commands without `sudo`:

```bash
sudo usermod -aG docker $USER
```

Apply the group changes by logging out and logging back in, or use:

```bash
su - $USER
```

Verify the Docker installation:

```bash
docker --version
```

---

## Step 3: Install NVIDIA Container Toolkit (Optional for GPU Workloads)

If your service requires GPU acceleration, install the NVIDIA Container Toolkit.

1. Configure the repository:

```bash
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

2. Update the package list and install the toolkit:

```bash
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
```

3. Install `nvidia-docker2`:

```bash
sudo apt-get install -y nvidia-docker2
```

4. Restart the Docker service:

```bash
sudo systemctl restart docker
```

---

## Step 4: Install Docker Compose

Docker Compose simplifies the process of defining and running multi-container Docker applications. Install it as follows:

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Make the binary executable:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

Verify the installation:

```bash
docker-compose --version
```

---

## Step 5: Build Docker Images

Navigate to the directory containing your `docker-compose.yml` file. This file defines the services for your application. Build the Docker images:

```bash
cd /path/to/your/project
docker-compose build
```

---

## Step 6: Run Your Docker Containers

Start your service with Docker Compose:

```bash
docker-compose up -d
```

Check the running containers:

```bash
docker-compose ps
```

---

## Conclusion

We now have a fully functional Ubuntu server configured to run Docker Compose services. With this setup, you can deploy microservices, web applications, and other containerized workloads efficiently. If our application requires GPU acceleration, the NVIDIA Container Toolkit ensures seamless integration.