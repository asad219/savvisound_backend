# Docker Guide - SavviSound Backend

Step-by-step guide for building, tagging, pushing, and pulling the SavviSound backend Docker image, including `.env` handling on the server.

---

## Prerequisites

- Docker installed locally and on server
- Docker Hub account (or another registry like AWS ECR, GitHub Container Registry)
- `.env.example` as reference for required environment variables

---

## Step 1: Create the Docker Image (Build)

From the project root directory:

```bash
# Build the image (replace 'savvisound' with your Docker Hub username if needed)
docker build -t savvisound-backend .

# Or with a specific tag
docker build -t savvisound-backend:2.0.0 .
```

---

## Step 2: Tag the Image for Registry

Tag the image for your container registry (Docker Hub example):

```bash
# Format: docker tag <image-name> <registry>/<repository>:<tag>
docker tag savvisound-backend:latest your-dockerhub-username/savvisound-backend:latest

# For version-specific tag
docker tag savvisound-backend:latest your-dockerhub-username/savvisound-backend:2.0.0
```

Examples for other registries:
```bash
# AWS ECR
docker tag savvisound-backend:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/savvisound-backend:latest

# GitHub Container Registry
docker tag savvisound-backend:latest ghcr.io/your-username/savvisound-backend:latest
```

---

## Step 3: Push to Registry

```bash
# Login to Docker Hub (first time only)
docker login

# Push the image
docker push your-dockerhub-username/savvisound-backend:latest
docker push your-dockerhub-username/savvisound-backend:2.0.0
```

---

## Step 4: On the Server - Create .env File

**Important:** The `.env` file is never included in the Docker image (for security). You must create it on the server.

### Option A: Create .env Manually

1. SSH into your server:
   ```bash
   ssh user@your-server-ip
   ```

2. Create a directory and navigate to it:
   ```bash
   mkdir -p ~/savvisound-backend
   cd ~/savvisound-backend
   ```

3. Create the `.env` file:
   ```bash
   nano .env
   ```

4. Paste your environment variables (use `.env.example` as template):
   ```
   CONNECTION_STRING=mongodb://your-mongo-host:27017/savvisound
   JWT_SECRET=your-secure-jwt-secret-here
   JWT_EXPIRES_IN=24h
   PORT=5005
   NODE_ENV=production
   ALLOWED_ORIGINS=https://savvisound.com
   BCRYPT_ROUNDS=10
   MAX_LOGIN_ATTEMPTS=5
   DNS_SERVERS=1.1.1.1,8.8.8.8
   ```

5. Save and exit (`Ctrl+X`, then `Y`, then `Enter`)

### Option B: Copy .env from Your Machine (Secure)

```bash
# From your local machine, use SCP to copy .env to server
scp .env user@your-server-ip:~/savvisound-backend/.env
```

---

## Step 5: On the Server - Pull and Run

1. **Login to registry** (if private):
   ```bash
   docker login
   ```

2. **Pull the image**:
   ```bash
   docker pull your-dockerhub-username/savvisound-backend:latest
   ```

3. **Run the container with .env file**:
   ```bash
   docker run -d \
     --name savvisound-backend \
     --restart unless-stopped \
     -p 5005:5005 \
     --env-file ~/savvisound-backend/.env \
     your-dockerhub-username/savvisound-backend:latest
   ```

   Or with `docker compose` (create `docker-compose.yml` - see below):
   ```bash
   docker compose up -d
   ```

---

## Optional: Docker Compose for Server

Create `docker-compose.yml` on the server in `~/savvisound-backend/`:

```yaml
version: '3.8'

services:
  savvisound-backend:
    image: your-dockerhub-username/savvisound-backend:latest
    container_name: savvisound-backend
    restart: unless-stopped
    ports:
      - "5005:5005"
    env_file:
      - .env
    # If MongoDB is also in Docker:
    # depends_on:
    #   - mongo
```

Then:
```bash
# Place .env in same directory as docker-compose.yml
# Pull and run
docker compose pull
docker compose up -d
```

---

## Quick Reference - Complete Workflow

| Step | Command |
|------|---------|
| **Build** | `docker build -t savvisound-backend .` |
| **Tag** | `docker tag savvisound-backend your-username/savvisound-backend:latest` |
| **Push** | `docker push your-username/savvisound-backend:latest` |
| **Server: Create .env** | Create `~/savvisound-backend/.env` with your vars |
| **Server: Pull** | `docker pull your-username/savvisound-backend:latest` |
| **Server: Run** | `docker run -d -p 5005:5005 --env-file .env --name savvisound-backend your-username/savvisound-backend:latest` |

---

## Useful Commands

```bash
# View running containers
docker ps

# View logs
docker logs -f savvisound-backend

# Stop container
docker stop savvisound-backend

# Remove container
docker rm savvisound-backend

# Update: pull new image and restart
docker pull your-username/savvisound-backend:latest
docker stop savvisound-backend
docker rm savvisound-backend
docker run -d -p 5005:5005 --env-file .env --name savvisound-backend your-username/savvisound-backend:latest
```

---

## Security Notes

- **Never** commit `.env` to Git or include it in the Docker image
- Use strong `JWT_SECRET` in production
- Ensure MongoDB is not exposed publicly (use private network or VPN)
- Consider using Docker secrets for sensitive data in production

---

## Production Deployment with Traefik & Let's Encrypt SSL

For production, use Docker Compose with Traefik reverse proxy for automatic HTTPS.

### Architecture

```
Internet → Traefik (80/443) → savvisound-backend (5005)
                ↓
         Let's Encrypt SSL
```

**Features:**
- Automatic SSL certificates from Let's Encrypt
- HTTP to HTTPS redirect
- Security headers (HSTS, XSS protection, etc.)
- Rate limiting (100 req/s)
- Traefik dashboard at `traefik.savvisound.com`

---

### Pre-Deployment Setup

#### 1. Create Certificate Storage

```bash
# Create the acme.json file for Let's Encrypt certificates
touch traefik/acme.json
chmod 600 traefik/acme.json
```

> **Important:** The `600` permissions are required by Traefik for security.

#### 2. Configure DNS Records

Create A records pointing to your server IP:
- `api.savvisound.com` → `<server-ip>`
- `traefik.savvisound.com` → `<server-ip>` (optional, for dashboard)

#### 3. Generate Dashboard Password

```bash
# Generate htpasswd hash
docker run --rm httpd:2.4-alpine htpasswd -nbB admin 'your-secure-password'
```

Output example:
```
admin:$2y$05$abc123...
```

#### 4. Configure Environment Variables

Add to your `.env` file (double the `$` signs in the hash):

```bash
# Traefik/Docker Configuration
DOMAIN=savvisound.com
ACME_EMAIL=admin@savvisound.com
TRAEFIK_DASHBOARD_AUTH=admin:$$2y$$05$$abc123...
```

#### 5. Open Firewall Ports

```bash
# Ubuntu/Debian with UFW
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# CentOS/RHEL with firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

---

### Deployment Commands

#### Testing with Staging Certificates

Use Let's Encrypt staging server first to avoid rate limits:

```bash
# Start with staging certificates (not trusted by browsers, but good for testing)
docker compose -f docker-compose.yml -f docker-compose.staging.yml up -d

# View logs
docker compose logs -f

# If everything works, tear down
docker compose down
```

#### Production Deployment

```bash
# Clear staging certificates first
rm traefik/acme.json
touch traefik/acme.json
chmod 600 traefik/acme.json

# Deploy with production certificates
docker compose up -d

# View logs
docker compose logs -f
```

---

### Verification Steps

```bash
# 1. Check HTTP redirect (should return 301/308 to HTTPS)
curl -I http://api.savvisound.com

# 2. Check HTTPS endpoint
curl https://api.savvisound.com/health

# 3. Verify SSL certificate
openssl s_client -connect api.savvisound.com:443 -servername api.savvisound.com

# 4. Check security headers
curl -I https://api.savvisound.com/health | grep -E "(Strict-Transport|X-Content-Type|X-Frame)"
```

---

### Traefik Management Commands

```bash
# View Traefik logs
docker compose logs -f traefik

# View backend logs
docker compose logs -f savvisound-backend

# Restart services
docker compose restart

# Stop all services
docker compose down

# Rebuild and restart backend (after code changes)
docker compose up -d --build savvisound-backend

# Check container status
docker compose ps
```

---

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Certificate not issued | Check DNS propagation, ensure ports 80/443 are open |
| 502 Bad Gateway | Backend not healthy, check `docker compose logs savvisound-backend` |
| Dashboard not accessible | Verify `TRAEFIK_DASHBOARD_AUTH` is set correctly (double `$$`) |
| Rate limited by Let's Encrypt | Use staging server, wait 1 hour, then retry |

#### Check Certificate Status

```bash
# View acme.json (contains certificate data)
cat traefik/acme.json | jq '.letsencrypt.Certificates'
```

#### Force Certificate Renewal

```bash
# Remove old certificates and restart
rm traefik/acme.json
touch traefik/acme.json
chmod 600 traefik/acme.json
docker compose restart traefik
```
