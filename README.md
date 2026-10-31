# CloudHub

**Unified multi-account cloud storage manager.**

CloudHub is a web application project focused on managing multiple Google Drive accounts through one unified interface.

> **Status:** early planning and foundation. The API and architecture documents describe the intended design; application features are not implemented yet.

## Goals

- Connect multiple Google Drive accounts using OAuth 2.0.
- Browse files from connected accounts in one interface.
- Search and organize files while keeping their source account visible.
- Provide cross-account transfer workflows where Google Drive permissions and API behavior allow.
- Keep provider credentials on the backend.

## Planned technology

| Layer | Technology |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, Prisma |
| Cloud integration | Google Drive API v3 |
| Authentication | Google OAuth 2.0 |

## Documentation

- [System architecture](docs/ARCHITECTURE.md)
- [Initial API contract](docs/API.md)

## Roadmap

- [x] Create repository and document initial architecture.
- [x] Define the first frontend/backend API contract.
- [ ] Set up the monorepo and development tooling.
- [ ] Build the first dashboard interface.
- [ ] Implement Google OAuth and account connection.
- [ ] Integrate Drive file listing, folders, and search.
- [ ] Add storage summaries and cross-account transfers.
- [ ] Add automated tests, security review, and deployment.

## Important notes

CloudHub does not merge Google storage quotas or change file ownership simply by connecting accounts. Google Drive remains the source of truth for files, permissions, and ownership.

OAuth secrets and refresh tokens must never be exposed to browser code or committed to this repository.

CloudHub is an independent project and is not affiliated with or endorsed by Google.
