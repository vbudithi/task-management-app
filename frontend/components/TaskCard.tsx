
import { Card,CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { Task } from '@/types/taskTypes'
import { Button } from './ui/button'
export function TaskCard({ task }: { task: Task }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {task.title}
          </CardTitle>
          <CardDescription>
            {task.description}
          </CardDescription>
          <span>
            {task.status}
          </span>
        </CardHeader>
        <CardContent>
             <span>
              Priority:{task.priority}
             </span>
             <span>
              DueDate: {task.dueDate}
             </span>
        </CardContent>
        <CardFooter>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </CardFooter>
      </Card>
    </>
  )
}