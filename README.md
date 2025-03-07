# NestJS Prometheus Monitoring Stack

This project sets up a monitoring stack using Docker Compose, including a NestJS application, Prometheus, and Grafana. The stack is designed to monitor the NestJS application using Prometheus and visualize the metrics in Grafana.

## Services

1. **NestJS Application (**``**)**

   - Built from the `./nestjs-prometheus-app` directory.
   - Exposes port `3000` internally, mapped to port `3002` on the host.
   - Part of the `monitoring` network.

2. **Prometheus (**``**)**

   - Uses the official `prom/prometheus` image.
   - Exposes port `9090` on the host.
   - Mounts the `prometheus.yml` configuration file from the host to `/etc/prometheus/prometheus.yml`.
   - Part of the `monitoring` network.

3. **Grafana (**``**)**

   - Uses the official `grafana/grafana` image.
   - Exposes port `3000` internally, mapped to port `3001` on the host.
   - Part of the `monitoring` network.

## Prerequisites

- Docker installed on your machine.
- Docker Compose installed on your machine.

## Getting Started

1. **Clone the repository** (if not already done):

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Build and start the services:**

   ```bash
   docker-compose up --build
   ```

   This command will:

   - Build the NestJS application Docker image.
   - Start the NestJS application, Prometheus, and Grafana services.

3. **Access the services:**

   - **Prometheus:** Open [http://localhost:9090](http://localhost:9090) in your browser.
   - **Grafana:** Open [http://localhost:3001](http://localhost:3001) in your browser.

4. **Configure Grafana:**

   - Log in to Grafana (default credentials: `admin/admin`).
   - Add Prometheus as a data source:
     - **URL:** `http://prometheus:9090`
   - Create dashboards to visualize the metrics from your NestJS application.

## Configuration

- **Prometheus Configuration:** Modify `prometheus.yml` to adjust scraping intervals, targets, or other settings.
- **Grafana Configuration:** Log in to Grafana and configure dashboards, alerts, and data sources as needed.

