export async function getCoins(): Promise<string> {
  const res = await fetch("https://habitica.com/api/v3/user/anonymized", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env["API_TOKEN"] as string,
      "x-api-user": process.env["USER_ID"] as string,
      "x-client": process.env["USER_ID"]+"-coinclaimer"
    },
  });
  const response = await res.json();
  const coins = response.data.user.stats.gp
  return coins.toFixed(2);
}