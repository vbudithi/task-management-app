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
      {/* MOBILE VIEW */}
      <div className="flex md:hidden overflow-x-auto gap-4 px-2">
        {statuses.map((status) => (
          <div
            key={status}
            className="min-w-70 shrink-0 flex flex-col h-180 bg-white rounded-lg p-3 border shadow-sm"
          >
            <h3
              className={`
              text-lg font-semibold mb-2 text-center rounded-md
              ${status === "To Do" ? "text-blue-500" : ""}
              ${status === "In Progress" ? "text-yellow-600" : ""}
              ${status === "Completed" ? "text-green-600" : ""}
            `}
            >
              {status}
            </h3>
            <div className="w-66 flex-1 overflow-y-auto pr-2 space-y-5">
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

      {/* DESKTOP VIEW */}
      <div className="hidden md:flex justify-center px:2 gap-20 -mt-12 h-180">
        {statuses.map((status) => (
          <div key={status} className="min-w-70 shrink-0 flex flex-col items-center bg-white rounded-lg p-3 border shadow-sm">
            <h3 className=
              {`
            text-lg font-semibold mb-2 text-center rounded-md 
              ${status === "To Do" ? "text-blue-500" : ""}
              ${status === "In Progress" ? "text-yellow-600" : ""}
              ${status === "Completed" ? "text-green-600" : ""}

            `}>{status}</h3>
            <div className="w-80 flex-1 overflow-y-auto pr-2 space-y-5">
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
