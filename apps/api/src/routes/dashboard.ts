import { Router } from "express";

export const dashboardRouter = Router();

// Temporary demo data. This will be replaced by Google Drive API data.
dashboardRouter.get("/summary", (_request, response) => {
  response.status(200).json({
    success: true,
    data: {
      connectedAccounts: 2,
      totalStorageBytes: 123480309760,
      usedStorageBytes: 54760833024,
      filesCount: null,
      source: "mock"
    }
  });
});