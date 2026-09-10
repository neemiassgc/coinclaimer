import 'temporal-polyfill/global'

async function getUserTasks() {
  const res = await fetch("https://habitica.com/api/v3/tasks/user", {
    method: "GET",
    headers: headers(),
  });
  return await res.json();
}

export interface TaskGroup {
  [index: string]: any[],
  habit: any[],
  daily: any[],
  todo: any[]
}

export async function getTasksGroupedByType(): Promise<TaskGroup> {
  const userTasks = await getUserTasks();
  const taskGroup: TaskGroup = {
    habit: [],
    daily: [],
    todo: [],
  }
  for (const task of userTasks.data)
    if (task.type !== "reward")
      taskGroup[task.type as string].push(task);

  return taskGroup;
}

export async function setCoins(value: string) {
  return await fetch("https://habitica.com/api/v3/user",  {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({ "stats.gp": value })
  })
}

export async function getCoins(): Promise<number> {
  const res = await fetch("https://habitica.com/api/v3/user/anonymized", {
    method: "GET",
    headers: headers(),
  });
  const response = await res.json();
  return response.data.user.stats.gp
}

export async function createTasks(texts: string[]): Promise<void> {
  const now = Temporal.Now.plainDateISO();

  const tasks = [];

  for (const text of texts) {
    tasks.push({
      text,
      type: "todo",
      priority: "0.1",
      date: now.add({ days: 1}).toString(),
    })
  }

  await fetch("https://habitica.com/api/v3/tasks/user", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(tasks.length > 1 ? tasks : tasks[0])
  });
}

function headers() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env["API_TOKEN"] as string,
    "x-api-user": process.env["USER_ID"] as string,
    "x-client": process.env["USER_ID"]+"-coinclaimer"
  }
}