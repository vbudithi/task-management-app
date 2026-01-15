import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './ui/dialog';
import { CreateTaskDto, Task } from '@/types/taskTypes';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

type Props = {
    open: boolean;
    onClose: () => void;
    onCreate: (payload: CreateTaskDto) => void;

}
export default function CreateTaskDialog({ open, onClose, onCreate }: Props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(0);
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState("");

    const canSave = title.trim().length > 0;

    const handleSave = () => {
        onCreate({
            title: title.trim(),
            description,
            status,
            priority,
            dueDate: dueDate || null
        });

        //resetform
        setTitle("");
        setDescription("");
        setStatus(0);
        setPriority(1);
        setDueDate("");

        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-bold"> Create Task</DialogTitle>
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
                        onClick={onClose}
                        className="cursor-pointer">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!canSave}
                        className={!canSave ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
