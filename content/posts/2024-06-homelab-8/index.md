--- 
slug: ssh-host-key-mismatch-after-server-reinstallation
title: "Technical Notes: SSH Host Key Mismatch After Server Reinstallation"

date: 2024-06-25

tags: 
  - Homelab
  - Proxmox
  - Linux

--- 

### Overview

After reinstalling a Linux server but keeping the original static IP address, I encountered an SSH warning that looked alarming at first glance — but it was actually a standard and solvable issue.

This post documents what happened, why it happened, and how to fix it — all while making sure you stay secure and don’t fall into bad habits when managing your fleet of remote machines.

⸻

### The Problem

Right after reinstalling a server with the same IP (192.168.0.200), I tried to SSH into it from my local machine (which had connected to the old one before):

ssh root@192.168.0.200

Instead of a login prompt, I was greeted with this:

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Offending ECDSA key in /Users/kyngo/.ssh/known_hosts:47
Host key for 192.168.0.200 has changed and you have requested strict checking.



⸻

### Root Cause

SSH performs host verification to protect against man-in-the-middle attacks. When you connect to a server, the SSH client compares the host key it receives with the one saved in your ~/.ssh/known_hosts file.

Because I had reinstalled the OS, the SSH daemon on the server generated new host keys, so the fingerprint no longer matched the one cached earlier.

From SSH’s perspective, someone could be impersonating my server. Which is the correct behavior — security first.

⸻

### The Fix

Since I knew this was a fresh install and not a security threat, the fix was simple:

ssh-keygen -R 192.168.0.200

This command removes the stored key from known_hosts.

Then I retried:

ssh root@192.168.0.200

It asked me to confirm the new fingerprint:

The authenticity of host '192.168.0.200 (192.168.0.200)' can't be established.
ED25519 key fingerprint is SHA256:9msfF1XHtvuGQp9bT+zHqeChiwkDvs3t/HfcmZf9rmU.
Are you sure you want to continue connecting (yes/no)? yes

I typed yes, and everything was back to normal.

⸻

### Pro Tip: When You Should Be Concerned

If you didn’t reinstall the server or change anything on your end, and still see this warning — stop. Someone may be spoofing the server, or it could have been compromised.

Always verify fingerprints manually or through a secure channel if you’re unsure.

⸻

### Closing Notes

SSH’s host key verification is an underrated hero in daily server ops. Don’t disable it — embrace it. It saved countless admins from talking to the wrong machine, or worse.