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
