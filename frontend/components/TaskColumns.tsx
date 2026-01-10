import { Task } from "@/types/taskTypes";
import { TaskCard } from "@/components/TaskCard";

interface TaskColumnsProps {
  tasks: Task[];
}

const statuses = ["To Do", "In Progress", "Done"];
const statusMap: Record<number, string> = {
  0: "To Do",
  1: "In Progress",
  2: "Done",
};

export const TaskColumns = ({ tasks }: TaskColumnsProps) => {
  const groupedTasks = statuses.reduce((acc: Record<string, Task[]>, status) => {
    acc[status] = tasks.filter((t) => statusMap[t.status] === status);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {statuses.map((status) => (
        <div key={status}>
          <h3 className="text-xl font-medium mb-2 text-center text-blue-700">{status}</h3>
          <div className="space-y-2">
            {groupedTasks[status]?.length > 0 ? (
              groupedTasks[status].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <p className="text-sm text-gray-500">No tasks here</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
