--- 
slug: advanced-gpu-metrics-using-dcgm-exporter
title: "Techinal Note: Monitoring Advanced GPU Metrics Using DCGM Exporter"

date: 2024-10-10

tags: 
  - Photos
  - Books
  - Book-Takeaways

---

## Overview

When working with GPU-intensive applications like machine learning, it's critical to monitor GPU metrics to ensure performance and resource optimization. NVIDIA’s `dcgm-exporter` offers a robust solution for GPU monitoring. However, its default configuration provides only basic metrics, such as GPU utilization and memory usage, which are insufficient for monitoring advanced features like **Tensor Core activity** or **CUDA Core activity**.

In this guide, I'll walk you through configuring `dcgm-exporter` to enable advanced profiling metrics, including **Tensor Core activity**, using Docker Compose and Prometheus.


## Problem with Default Metrics

By default, `dcgm-exporter` uses a file (e.g., `default-counters.csv`) that includes basic metrics like:

- **Clocks:** `SM_CLOCK`, `MEM_CLOCK`
- **Temperature:** `GPU_TEMP`, `MEMORY_TEMP`
- **Power Usage:** `POWER_USAGE`, `TOTAL_ENERGY_CONSUMPTION`
- **Utilization:** `GPU_UTIL`, `MEM_COPY_UTIL`, `ENC_UTIL`, `DEC_UTIL`

These metrics are sufficient for basic GPU monitoring but lack deeper insights into Tensor Core and CUDA Core activity. Profiling metrics like **Tensor Core cycles** or **SM (CUDA Core) active percentage** are not included.

---

## Solution: Enable Profiling Metrics in DCGM Exporter

To unlock advanced metrics, such as **`PIPE_TENSOR_ACTIVE`** and **`SM_ACTIVE`**, you need to:

1. Enable profiling collectors in `dcgm-exporter`.
2. Provide a custom metrics configuration file that includes these advanced metrics.

---

## Steps to Monitor Tensor Core and CUDA Core Activity

### Step 1: Download and Modify the Metrics File

Download the example `dcp-metrics-included.csv` file from the official NVIDIA GitHub repository:

```bash
wget https://raw.githubusercontent.com/NVIDIA/dcgm-exporter/main/etc/dcp-metrics-included.csv
```

Modify the file to include only the metrics you need or to fix formatting issues:

- **Add a trailing comma to comments** (e.g., `# comment,,`).
- **Remove unsupported labels**, such as `DCGM_FI_DRIVER_VERSION`.

For Tensor Core and CUDA Core activity, ensure these metrics are included:

```csv
# Tensor Core and CUDA Core Activity,,
DCGM_FI_PROF_PIPE_TENSOR_ACTIVE, gauge, Ratio of cycles the tensor (HMMA) pipe is active.
DCGM_FI_PROF_SM_ACTIVE, gauge, Ratio of time the Streaming Multiprocessor is active.
DCGM_FI_PROF_DRAM_ACTIVE, gauge, Ratio of cycles the memory interface is active sending/receiving data.
```

Save the file to a local path, e.g., `/home/user/dcp-metrics-included.csv`.

---

### Step 2: Update Docker Compose Configuration

Here’s the final `docker-compose.yml` for `dcgm-exporter` with profiling enabled:

```yaml
version: '3.8'

services:
  nvidia-dcgm-exporter:
    image: nvidia/dcgm-exporter:latest
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
      - DCGM_EXPORTER_COLLECTORS=/workspace/dcp-metrics-included.csv
    ports:
      - "9400:9400"  # Prometheus scraping port
    cap_add:
      - SYS_ADMIN  # Required for profiling metrics
    volumes:
      - /home/user/dcp-metrics-included.csv:/workspace/dcp-metrics-included.csv
    networks:
      - monitoring

networks:
  monitoring:
    driver: bridge
```

### Explanation:

- **`DCGM_EXPORTER_COLLECTORS`**: Points to the custom metrics file.
- **`SYS_ADMIN` capability**: Required for profiling features.
- **Volume mounting**: Ensures the container can access the custom metrics file.

---

### Step 3: Verify the Metrics

1. Start the container:
    
    ```bash
    docker-compose up -d nvidia-dcgm-exporter
    ```
    
2. Access the metrics endpoint:
    
    ```bash
    curl http://<your-server-ip>:9400/metrics
    ```
    
    Look for profiling metrics like:
    
    - `DCGM_FI_PROF_PIPE_TENSOR_ACTIVE`: Tensor Core activity.
    - `DCGM_FI_PROF_SM_ACTIVE`: CUDA Core activity.
    - `DCGM_FI_PROF_DRAM_ACTIVE`: Memory interface activity.

---

## Example Output

Here’s a sample output for advanced GPU metrics:

```
# HELP DCGM_FI_PROF_PIPE_TENSOR_ACTIVE Ratio of cycles the tensor (HMMA) pipe is active.
# TYPE DCGM_FI_PROF_PIPE_TENSOR_ACTIVE gauge
DCGM_FI_PROF_PIPE_TENSOR_ACTIVE{gpu="0",UUID="GPU-abc123",device="nvidia0"} 0.012345

# HELP DCGM_FI_PROF_SM_ACTIVE Ratio of time the Streaming Multiprocessor is active.
# TYPE DCGM_FI_PROF_SM_ACTIVE gauge
DCGM_FI_PROF_SM_ACTIVE{gpu="0",UUID="GPU-abc123",device="nvidia0"} 0.234567

# HELP DCGM_FI_PROF_DRAM_ACTIVE Ratio of cycles the memory interface is active.
# TYPE DCGM_FI_PROF_DRAM_ACTIVE gauge
DCGM_FI_PROF_DRAM_ACTIVE{gpu="0",UUID="GPU-abc123",device="nvidia0"} 0.045678
```

---

### Step 4: Visualize in Grafana

To monitor the metrics:

1. **Add Prometheus as a Data Source** in Grafana.
2. Create a new dashboard and add panels with PromQL queries:
    - **Tensor Core Activity**:
        
        ```promql
        DCGM_FI_PROF_PIPE_TENSOR_ACTIVE
        ```
        
    - **CUDA Core Activity**:
        
        ```promql
        DCGM_FI_PROF_SM_ACTIVE
        ```
        
    - **Memory Interface Activity**:
        
        ```promql
        DCGM_FI_PROF_DRAM_ACTIVE
        ```
        

---

## Lessons Learned

1. **CSV Formatting**: Ensure comments end with commas, and unsupported fields are removed.
2. **Profiling Permissions**: `SYS_ADMIN` capability is mandatory for advanced metrics.
3. **Customization**: Use a custom metrics file for fine-grained control over exported data.

---

## Conclusion

With these steps, you can monitor advanced GPU metrics, including Tensor Core and CUDA Core activity. This setup provides a comprehensive view of GPU performance, essential for optimizing machine learning workloads and other GPU-intensive applications