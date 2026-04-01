# pawshub Backend

## Running with Docker Compose

To start the backend and the PostgreSQL database:

1. **Ensure Docker is running** on your machine.
2. **Stop any local processes** running on the same ports (e.g., if you are running `npm run dev` locally, stop it to avoid port conflicts with 5001/5433).
3. **Run the following command** in the `backend` directory:

```bash
docker-compose up -d --build
```

- `-d`: Runs containers in the background (detached).
- `--build`: Forces a rebuild of the backend image.

### Useful Commands

- **View logs**: `docker-compose logs -f backend`
- **Stop services**: `docker-compose down`
- **Restart services**: `docker-compose restart`
