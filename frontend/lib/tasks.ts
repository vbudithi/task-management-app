import { AIAnalyzedtaskDto, AnalyzedTaskDto, CreateTaskDto } from "@/types/taskTypes";
import apiClient from "./apiClient";

/**
 * GET: /api/task
 */
export async function getAllTasks() {
  try {
    const res = await apiClient.get(`/task`);
    console.log("response from /task:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
}

/**
 * GET: /api/task/:id
 */
export async function getTaskById(id: number) {
  try {
    const res = await apiClient.get(`/task/${id}`);
    console.log(`response from /task/${id}:`, res.data);
    return res.data;
  } catch (err) {
    console.error(`Error fetching task ${id}:`, err);
    throw err;
  }
}

/**
 * GET: /api/task/status/:status
 */
export async function getTaskByStatus(status: number) {
  try {
    const res = await apiClient.get(`/task/status/${status}`);
    console.log(`response from /task/status/${status}:`, res.data);
    return res.data;
  } catch (err) {
    console.error(`Error fetching tasks by status ${status}:`, err);
    throw err;
  }
}

/**
 * POST: /api/task
 */
export async function createTask(payload: CreateTaskDto) {
  try {
    const res = await apiClient.post(`/task`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response from POST /task:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error posting task:", err);
    throw err;
  }
}


/**
 * PUT: /api/task/:id
 */
export async function updateTaskById(id: number, payload: any) {
  try {
    const res = await apiClient.put(`/task/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`response from PUT /task/${id}:`, res.data);
    return res.data;
  } catch (err) {
    console.error(`Error updating task ${id}:`, err);
    throw err;
  }
}

/**
 * POST: /api/task/analyze
 */
export async function analyzeTask(payload: CreateTaskDto): Promise<AnalyzedTaskDto> {
  try {
    const res = await apiClient.post(`/task/analyze`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response from POST /task/analyze:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error analyzing the task:", err);
    throw err;
  }
}

/**
 * DELETE: /api/task/:id
 */
export async function deleteTaskById(id: number) {
  try {
    const res = await apiClient.delete(`/task/${id}`);
    console.log(`response from DELETE /task/${id}:`, res.data);
    return res.data;
  } catch (err) {
    console.error(`Error deleting task ${id}:`, err);
    throw err;
  }
}

