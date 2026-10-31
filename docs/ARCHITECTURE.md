# CloudHub — Architecture

## Product vision

CloudHub is a unified workspace for managing multiple Google Drive accounts. It presents files and storage information together while preserving the account that owns each item.

CloudHub does **not** combine Google storage quotas or change file ownership merely by connecting accounts.

## Planned stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL with Prisma
- Provider: Google Drive API v3
- Authentication: Google OAuth 2.0

The stack is a starting decision and can change as implementation constraints become clearer.

## System boundaries

### Web application

Responsible for the dashboard, unified file explorer, connected-account management, transfer interface, and settings. It communicates with CloudHub's API and never stores provider refresh tokens.

### API server

Responsible for user sessions, OAuth callbacks, account ownership checks, token refresh, Google Drive requests, normalized responses, and transfer orchestration.

### Database

Stores application users, connected-account metadata, protected provider credentials, and transfer jobs. Secrets must be encrypted at rest and excluded from logs.

### Google Drive

Remains the source of truth for file contents, ownership, permissions, and provider storage information.

## Planned repository layout

```text
CloudHub/
├── apps/
│   ├── web/              # React frontend
│   └── api/              # Express backend
├── packages/
│   └── shared/           # Shared TypeScript contracts
├── prisma/
│   └── schema.prisma
├── docs/
│   ├── ARCHITECTURE.md
│   └── API.md
├── .env.example
├── package.json
└── README.md
```

This is the target structure; directories and applications will be added as their implementation begins.

## Main user flows

1. User signs in to CloudHub.
2. User connects a Google account through an OAuth authorization-code flow.
3. The backend validates the OAuth state, exchanges the code, and securely stores credentials.
4. The user connects additional accounts as needed.
5. The dashboard requests account and storage summaries.
6. The explorer requests paginated files, optionally filtered by account or folder.
7. A transfer job copies selected files to a destination account when permissions and Drive API behavior allow it.

## Security requirements

- Keep OAuth client secrets and refresh tokens on the backend only.
- Use the narrowest Google Drive scopes that support the feature.
- Validate OAuth state and callback parameters.
- Encrypt refresh tokens at rest with a server-side key.
- Check that every requested account belongs to the authenticated CloudHub user.
- Never log authorization codes, access tokens, refresh tokens, or private file contents.
- Use HTTPS in deployed environments.
- Disconnecting an account must revoke/remove CloudHub's stored connection without deleting Drive files.

## Transfer safety

Cross-account transfer may require copying a file into the destination account. Source deletion, if offered, must be a separate explicit step after destination success. A failed copy must never cause source deletion. Transfer jobs should expose progress and per-file failures.

## Implementation milestones

1. Monorepo and development tooling.
2. Frontend shell and navigation.
3. Backend health endpoint and shared contracts.
4. Database schema and CloudHub sessions.
5. Google OAuth connection and account management.
6. Drive file listing, folders, pagination, and search.
7. Storage overview.
8. Cross-account transfer jobs.
9. Automated tests, security review, and deployment.
