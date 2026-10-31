# CloudHub — Initial API Contract

This document is the proposed boundary between the web application and API server. These endpoints are **planned, not implemented yet**.

Base path: `/api`. JSON is used for request and response bodies. Authenticated routes require a valid CloudHub session.

## Error format

```json
{
  "error": {
    "code": "ACCOUNT_NOT_FOUND",
    "message": "The requested account was not found."
  }
}
```

## Accounts

### GET /accounts

Returns the current user's connected Google accounts. Never include OAuth tokens.

```json
{
  "accounts": [
    {
      "id": "account_123",
      "email": "person@example.com",
      "displayName": "Personal Drive",
      "provider": "google",
      "connectedAt": "2026-10-31T12:00:00.000Z"
    }
  ]
}
```

### GET /accounts/:accountId

Returns safe metadata for one account after checking ownership.

### POST /accounts/connect

Starts the Google OAuth connection flow. The implementation will define the exact redirect behavior and callback route.

### DELETE /accounts/:accountId

Removes the CloudHub connection. This must not delete files from Google Drive.

## Storage

### GET /storage

Returns combined and per-account storage values when available from Google. Unknown values must remain unknown; do not invent estimates.

## Files

### GET /files

Supported query parameters:

- `accountId` — optional connected-account filter.
- `parentId` — optional folder ID.
- `q` — optional search query.
- `pageToken` — optional provider pagination cursor.
- `pageSize` — optional page size, bounded by provider limits.

Example response:

```json
{
  "files": [
    {
      "id": "file_123",
      "accountId": "account_123",
      "name": "notes.pdf",
      "mimeType": "application/pdf",
      "sizeBytes": 2048,
      "modifiedTime": "2026-10-31T12:00:00.000Z"
    }
  ],
  "nextPageToken": null
}
```

### GET /files/:fileId

Returns file metadata only after verifying the file is accessible through one of the user's connected accounts.

## Transfers

### POST /transfers

Creates a transfer job.

```json
{
  "sourceAccountId": "account_source",
  "destinationAccountId": "account_destination",
  "fileIds": ["file_123"]
}
```

Example response:

```json
{
  "transferId": "transfer_123",
  "status": "queued"
}
```

### GET /transfers/:transferId

Returns job progress and per-file outcomes.

Initial statuses: `queued`, `running`, `completed`, `partially_completed`, and `failed`.

## Health

### GET /health

Returns a minimal process-health response. It must not expose secrets or internal configuration.

## Contract rules

- Every account-scoped operation checks user ownership.
- Never return access tokens, refresh tokens, client secrets, or authorization codes.
- Preserve pagination rather than silently truncating results.
- Validate request bodies and query parameters.
- Make transfer creation idempotent where practical.
- Source deletion is never implicit in a transfer request.
