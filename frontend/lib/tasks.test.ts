// Manual API test script (not used in production)

import { getAllTasks, getTaskById, postTask, updateTaskById, deleteTaskById } from "@/lib/tasks";

async function runTests() {
  console.log(await getAllTasks());
  console.log(await getTaskById(2));

  await postTask({
    title: "Test City",
    description: "Testing API",
    status: 1, //range:0-2
    priority: 2,//range:1-3
    dueDate: new Date().toISOString(),
  });

  await updateTaskById(2, {
    title: "River book",
    description: "Extraordinary book",
    status: 2,
    priority: 3,
    dueDate: new Date().toISOString(),
  });

  await deleteTaskById(3);
}

runTests();
