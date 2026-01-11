import { Task } from "@/types/taskTypes";
import { TaskCard } from "@/components/TaskCard";

interface TaskColumnsProps {
  tasks: Task[];
}

const statuses = ["To Do", "In Progress", "Completed"];
const statusMap: Record<number, string> = {
  0: "To Do",
  1: "In Progress",
  2: "Completed",
};

export const TaskColumns = ({ tasks }: TaskColumnsProps) => {
  const groupedTasks = statuses.reduce((acc: Record<string, Task[]>, status) => {
    acc[status] = tasks.filter((t) => statusMap[t.status] === status);
    return acc;
  }, {});
  

  return (
    <>
    <div className="flex gap-4 justify-center overflow-x-auto px:2">
      {statuses.map((status) => (
        <div key={status} className="min-w-65 shrink-0 flex flex-col h-160 items-center bg-white rounded-lg p-3 border shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-center text-blue-700">{status}</h3>
            <div className=" flex-1 overflow-y-auto pr-2 space-y-2">
              {groupedTasks[status]?.length > 0 ? (
                groupedTasks[status].map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center">No tasks here</p>
              )}
            </div>
        </div>
      ))}
    </div>
    </>
  );
};
