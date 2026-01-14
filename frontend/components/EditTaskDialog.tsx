import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Task } from '@/types/taskTypes';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from 'react';
import { dateFormat } from './dateFormat';

type Props = {
    task?: Task;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
export default function EditTaskDialog({ task, open, onClose, onConfirm }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(1);
    const [dueDate, setDueDate] = useState<string>("")

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(String(task.description ?? ""));
            setStatus(task.status ?? 0);
            setPriority(task.priority ?? 1);
            setDueDate(task.dueDate ?? "");
        }
    }, [task])

    useEffect(() => {
        if (task?.dueDate) {
            const formatted = dateFormat(task.dueDate);
            setDueDate(formatted);
        }
    }, [task]);


    if (!task) return null;
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Edit Task
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        autoFocus
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <select
                            className="border rounded-md p-2"
                            value={status}
                            onChange={(e) => setStatus(Number(e.target.value))}>
                            <option value={0}>To Do</option>
                            <option value={1}>In Progress</option>
                            <option value={2}>Completed</option>
                        </select>
                        <select
                            className="border rounded-md p-2"
                            value={priority}
                            onChange={(e) => setPriority(Number(e.target.value))}>
                            <option value={1}>Low</option>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                        </select>
                    </div>

                    <Input
                        type="text"
                        value={dueDate}
                        placeholder="MM/DD/YYYY"
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <DialogFooter className="mt-4">
                    <Button
                        variant="outline"
                        onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={onConfirm}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}