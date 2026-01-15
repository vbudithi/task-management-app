// Manual API test script (not used in production)
import { it, expect } from "vitest";

import { getAllTasks, getTaskById, createTask, updateTaskById, deleteTaskById, getTaskByStatus } from "@/lib/tasks";

import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from ".././msw/server";

beforeAll(() => server.listen({
  onUnhandledRequest: "error",
}));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

//Get All
it("get all task", async () => {
  const getTask = await getAllTasks();
  console.log("get all tasks:", getTask);
  expect(Array.isArray(getTask)).toBe(true);
  expect(getTask.length).toBeGreaterThan(0);
  expect(getTask[0]).toHaveProperty("id");
  expect(getTask[0]).toHaveProperty("title");
})

//Get Task by Id
it("get task by Id", async () => {
  const id = 123;
  const getTaskByID = await getTaskById(id);
  console.log("get all tasks:", getTaskByID);
  expect(getTaskByID).toBeDefined();
  expect(getTaskByID).toHaveProperty("id", id);
  expect(getTaskByID).toHaveProperty("title");
  expect(getTaskByID).toHaveProperty("description");
  expect(getTaskByID).toHaveProperty("priority");
  expect(getTaskByID).toHaveProperty("dueDate");

})
it("create and delete a task", async () => {
  // Create task
  const newTask = await createTask({
    title: "Test Delete",
    description: "Testing API",
    status: 1,
    priority: 2,
    dueDate: new Date().toISOString(),
  });
  console.log("Created task id:", newTask.id);

  expect(newTask.id).toBeDefined();

  // Delete delete
  const deleteResponse = await deleteTaskById(newTask.id);
  console.log("Deleting task id:", newTask.id);
  expect(deleteResponse).toBeTruthy();
})

//Update task
it("update a task", async () => {
  const id = 123;
  const updatedTask = await updateTaskById(id, {
    title: "Updated Title",
    description: "Updated Description",
    priority: 2,
    status: 1,
    dueDate: "2026-01-10T00:00:00.000Z",
  });
  console.log("updated Task", updatedTask)
  expect(updatedTask).toBeDefined();
  expect(updatedTask.id).toBe(id);
  expect(updatedTask.title).toBe("Updated Title");
  expect(updatedTask.description).toBe("Updated Description");
  expect(updatedTask.priority).toBe(2);
  expect(updatedTask.status).toBe(1);
  expect(updatedTask.dueDate).toBe("2026-01-10T00:00:00.000Z");
})

//Get task by status
it("Get task by status", async () => {
  const status = 2;
  const getTaskByStatusID = await getTaskByStatus(status);
  console.log("get task status by ID:", getTaskByStatusID)

  expect(Array.isArray(getTaskByStatusID)).toBe(true);
  expect(getTaskByStatusID.length).toBeGreaterThan(0);

  getTaskByStatusID.forEach((task: any) => {
    expect(task).toHaveProperty("status", status);
  });

})

