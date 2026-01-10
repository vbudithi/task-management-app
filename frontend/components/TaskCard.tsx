import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Task } from '@/types/taskTypes';
import { Button } from './ui/button';
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="shadow-2xs rounded-xl border border-gray-300 hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardHeader className="space-y-1 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold leading-tight line-clamp-1">
              {task.title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground line-clamp-2">
              {task.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs px-2 py-1">
            {task.status === 0 ? "To Do" : task.status === 1 ? "In Progress" : "Done"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-gray-600 space-y-1">
        <div>
          <span className="font-medium">Priority:</span> {task.priority}
        </div>
        <div>
          <span className="font-medium">Due:</span> {format(new Date(), "MMM d, yyyy")}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Pencil className="w-4 h-4" /> Edit
        </Button>
        <Button size="sm" variant="destructive" className="flex items-center gap-1">
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
