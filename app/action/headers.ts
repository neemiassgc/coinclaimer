export default function headers() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env["API_TOKEN"] as string,
    "x-api-user": process.env["USER_ID"] as string,
    "x-client": process.env["USER_ID"]+"-coinclaimer"
  }
}