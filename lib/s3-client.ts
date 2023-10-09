import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
  region: "default",
  endpoint: process.env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY as string,
    secretAccessKey: process.env.BUCKET_SECRET_KEY as string,
  },
})
export default s3Client
