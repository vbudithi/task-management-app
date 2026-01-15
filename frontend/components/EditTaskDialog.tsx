import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Task } from '@/types/taskTypes';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from 'react';
import { toInputDate } from '../utils/dateFormat';

type Props = {
    task?: Task;
    open: boolean;
    onClose: () => void;
    onConfirm: (updated: Partial<Task>) => void;
}
export default function EditTaskDialog({ task, open, onClose, onConfirm }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(1);
    const [dueDate, setDueDate] = useState<string>("");
    const [initialState, setInitialState] = useState<{
        title: string;
        description: string;
        status: number;
        priority: number;
        dueDate: string;
    } | null>(null);

    useEffect(() => {
        if (!task) return;
        const formattedDate = task.dueDate ? toInputDate(task.dueDate) : "";
        const snapshot = {
            title: task.title,
            description: task.description ?? "",
            status: task.status ?? 0,
            priority: task.priority ?? 1,
            dueDate: formattedDate
        }

        setInitialState(snapshot);
        setTitle(snapshot.title);
        setDescription(snapshot.description);
        setStatus(snapshot.status);
        setPriority(snapshot.priority);
        setDueDate(snapshot.dueDate);
    }, [task]);

    const isDirty =
        !!initialState && (
            title != initialState.title ||
            description != initialState.description ||
            status != initialState.status ||
            priority != initialState.priority ||
            dueDate != initialState.dueDate
        )

    if (!task) return null;
    const handleSave = () => {
        onConfirm({
            title,
            description,
            status,
            priority,
            dueDate
        })
    }

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
                        type="date"
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
                    <Button
                        onClick={handleSave}
                        disabled={!isDirty}
                        className={!isDirty ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}