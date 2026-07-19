export async function getCoins(): Promise<string> {
  const res = await fetch("https://habitica.com/api/v3/user/anonymized", {
    method: "GET",
    headers: headers(),
  });
  const response = await res.json();
  const coins = response.data.user.stats.gp
  return coins.toFixed(2);
}

export async function subtractCoins(value: number) {
  await fetch("https://habitica.com/api/v3/user/allocate",  {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({gp: value })
  })
}

function headers() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env["API_TOKEN"] as string,
    "x-api-user": process.env["USER_ID"] as string,
    "x-client": process.env["USER_ID"]+"-coinclaimer"
  }
}