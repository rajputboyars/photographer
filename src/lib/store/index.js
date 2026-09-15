// The one place the app asks for data.
//
// Today it serves the in-memory demo store. When MONGODB_URI is set, swap in a
// Mongo-backed store that implements the same methods — nothing that calls
// `store` needs to change:
//
//   1. npm install mongodb
//   2. write src/lib/store/mongo-store.js exporting `mongoStore` with the same
//      methods as demoStore (listLeads, createLead, setLeadStatus, …)
//   3. import it below and return it when the env var is present
//
// Keeping that seam explicit is the point: the admin is already written
// against an interface, not against the demo data.

import { demoStore } from "./demo-store";

export const usingDemoData = !process.env.MONGODB_URI;

export const store = demoStore;

if (process.env.MONGODB_URI) {
  console.warn(
    "MONGODB_URI is set, but no Mongo store is wired up yet — still serving demo data. See src/lib/store/index.js."
  );
}
