import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Task } from '@/types/taskTypes';
import { dateFormat } from '../utils/dateFormat';

type Props = {
    task?: Task;
    open: boolean;
    onClose: () => void;
}
export default function TaskDetailsDialog({ task, open, onClose }: Props) {
    if (!task) return null;
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {task?.title}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-2 text-sm">
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Due: {dateFormat(task.dueDate)}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}