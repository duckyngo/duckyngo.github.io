--- 
slug: proxmox-create-ubuntu-container-enabll-ssh
title: "Proxmox: Create Ubuntu Container and Enable SSH Access (With Root Password Login)"

date: 2024-06-20

tags: 
  - Homelab
  - Proxmox

--- 
### **Overview**

While setting up a new Ubuntu 22.04 container in Proxmox, I needed to enable SSH access using the `root` user and password. By default, LXC containers created from Ubuntu templates come with password login **disabled** for root via SSH. Here's how to install the container and make it SSH-accessible securely.

---

### **Step 1: Download Ubuntu Template**

1. In the Proxmox web UI:
   - Navigate to your **Proxmox node** > **local (storage)** > **CT Templates**
   - Click **Templates** > select `ubuntu-22.04-standard_*.tar.zst`
   - Click **Download**

---

### **Step 2: Create the LXC Container**

1. Go to **Create CT**
2. Fill in basic details:
   - **Hostname**: `my-ubuntu-ct`
   - **Password**: set a strong root password (important for later SSH access)
3. Choose the downloaded **Ubuntu 22.04 template**
4. Set **Disk Size**, **CPU**, **Memory**, and **Network** as needed
5. Under **DNS** and **Options**, defaults are fine
6. Click **Finish** to create the container

---

### **Step 3: Start and Enter the Container**

```bash
pct start 100
pct enter 100
```
(Replace `100` with your container ID)

---

### **Step 4: Install and Enable SSH Server**

Inside the container:

```bash
apt update && apt install -y openssh-server
```

Make sure the SSH service is running:
```bash
systemctl enable ssh
systemctl start ssh
```

---

### **Step 5: Enable Root SSH Password Login**

Edit SSH config:
```bash
nano /etc/ssh/sshd_config
```

Make sure these lines are set:
```bash
PermitRootLogin yes
PasswordAuthentication yes
```

Save and restart SSH:
```bash
systemctl restart ssh
```

---

### **Step 6: Exit and Test From Your Host**

Exit the container:
```bash
exit
```

Get container's IP:
```bash
pct exec 100 ip a
```

From your Proxmox host or laptop:
```bash
ssh root@<container-ip>
```

Enter the password you set during container creation.
### **Conclusion**

Ubuntu containers on Proxmox are lightweight, fast to boot, and ideal for development and testing. But for secure SSH access, especially using `root` login, a few default settings must be changed. Once configured properly, it becomes a clean and scriptable environment to build on.

---

