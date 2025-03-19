"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import structure from "./src/sanity/structure";

export default defineConfig({
  name: 'default',
  title: 'Rocket.dev',
  
  projectId, // Use the imported projectId directly
  dataset,   // Use the imported dataset directly
  
  plugins: [
    deskTool({
      structure // Add the structure configuration here
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],
  
  schema,
});
