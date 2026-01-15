import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Task } from '@/types/taskTypes';
import { Button } from './ui/button';
import { Badge } from "./ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { dateFormat } from '@/utils/dateFormat'

type Props = {
  task: Task;
  onOpen: (task: Task) => void;
  onDelete: (task: Task) => void;
  onUpdate: (task: Task) => void;
}

export function TaskCard({ task, onOpen, onUpdate, onDelete }: Props) {

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onUpdate(task)
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onDelete(task)
  }

  const handleView = () => {
    onOpen(task)
  }
  return (
    <Card className="p-1.5 w-full shadow-2xs rounded-xl border border-gray-300 hover:shadow-lg transition-all duration-200 cursor-pointer" tabIndex={-1}
      onClick={handleView}>

      <CardHeader className="space-y-0.5 pb-1">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-semibold line-clamp-1 mb-2">
              {task.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-2">
              {task.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className={`text-xs px-2 py-1 text-white
            ${task.status === 0 ? "bg-blue-600" : ""}
            ${task.status === 1 ? "bg-yellow-600" : ""}
            ${task.status === 2 ? "bg-green-600" : ""}`}>
            {task.status === 0 ? "To Do" : task.status === 1 ? "In Progress" : "Completed"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-gray-600 space-y-0.5">
        <div>
          <span className="font-medium">Priority:</span> {task.priority}
        </div>
        <div>
          <span className="font-medium">Due:</span> {dateFormat(task.dueDate)}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 text-xs cursor-pointer hover:bg-gray-200"
          onClick={handleUpdate}
        >
          <Pencil className="w-4 h-4" /> Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="flex items-center gap-1 px-2 py-1 text-xs cursor-pointer hover:bg-red-700 "
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
