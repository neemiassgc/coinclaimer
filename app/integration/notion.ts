async function getNodes() {
  const notionKey = process.env["NOTION_API_KEY"] as string;
  const notionVersion = "2026-03-11";
  const dataSourceId = "3c19a414-fa9c-800a-b71f-000bb57692a9"
  const filter = {
    filter: {
      property: "When",
      date: {
        "equals": "today"
      }
    }
  }

  const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "Authorization": "Bearer "+notionKey,
      "Notion-Version": notionVersion
    },
    body: JSON.stringify(filter)
  })

  return await res.json();
}

export async function hasToday(): Promise<boolean> {
  const nodes = await getNodes();
  return nodes.results.length > 0;
}