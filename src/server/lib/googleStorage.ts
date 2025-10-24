import { Storage } from "@google-cloud/storage";

if (!process.env.GCP_CREDENTIALS) {
  throw new Error("Falta la variable de entorno GCP_CREDENTIALS_BASE64");
}

const decoded = Buffer.from(process.env.GCP_CREDENTIALS, "base64").toString("utf8");
const credentials = JSON.parse(decoded);

const storage = new Storage({
  projectId: credentials.project_id,
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
});

// Apuntamos al bucket
export const bucket = storage.bucket("futbolin");
