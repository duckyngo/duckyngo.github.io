--- 
slug: nginx-docker-container-restart
title: Nginx Docker container restart
date: 2022-10-02

tags: 

  - DevOps
  - Server
  - Docker

--- 


# 

```
docker restart <container-id>
```

Docker doesn’t start the nginx service itself

We need to start nginx server by:
```
docker exec -it <container-id> service nginx restart
```

The we can check whether the nginx service is running or not by:
```
ducky@titan-rtx:~$ docker exec -it <container-id> ps -ef|grep nginx
root        42     1  0 01:50 ?        00:00:00 nginx: master process /usr/sbin/
nginx       70    42  0 01:50 ?        00:00:00 nginx: worker process
nginx       71    42  0 01:50 ?        00:00:00 nginx: worker process
nginx       72    42  0 01:50 ?        00:00:00 nginx: worker process
nginx       73    42  0 01:50 ?        00:00:00 nginx: worker process


```


END
