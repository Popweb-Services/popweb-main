import AWS from "aws-sdk"

const s3Client = new AWS.S3({
  region: "default",
  endpoint: process.env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY as string,
    secretAccessKey: process.env.BUCKET_SECRET_KEY as string,
  },
})
export default s3Client
