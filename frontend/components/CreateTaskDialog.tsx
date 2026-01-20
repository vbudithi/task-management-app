import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './ui/dialog';
import { CreateTaskDto, Task } from '@/types/taskTypes';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { analyzeTask } from '@/lib/tasks';
import toast from 'react-hot-toast';

type Props = {
    open: boolean;
    onClose: () => void;
    onCreate: (payload: CreateTaskDto) => void;

}
export default function CreateTaskDialog({ open, onClose, onCreate }: Props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(0);
    const [priority, setPriority] = useState<number | undefined>(undefined);
    const [dueDate, setDueDate] = useState<string>("");
    const [aiSuggestions, setAiSuggestions] = useState<{ suggestedPriority: number, suggestedDueDate: string | null } | null>(null)
    const debounceRef = useRef<any>(null);
    const canSave = title.trim().length > 0;

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setStatus(0);
        setPriority(undefined);
        setDueDate("");
    }
    const handleSave = () => {
        onCreate({
            title: title.trim(),
            description,
            status,
            priority: priority ?? 1,
            dueDate: dueDate || null
        });
        resetForm();
        onClose();
    }

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            resetForm();
            onClose();
        }
    }

    const handleDescriptionChange = (desc: string) => {
        setDescription(desc);
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            if (!desc.trim()) return;

            try {
                const payload: CreateTaskDto = {
                    title,
                    description: desc,
                    status,
                    priority: null,
                    dueDate: null
                }
                const res = await analyzeTask(payload);
                setAiSuggestions(res.aiInsights)
                console.log("Data", res)

            } catch (err) {
                console.error("AI analysis failed", err)
            }

        }, 1000);
    };

    useEffect(() => {
        if (!aiSuggestions) return;

        if (!priority && aiSuggestions?.suggestedPriority) {
            setPriority(aiSuggestions.suggestedPriority)
            const label = ["Low", "Medium", "High"][aiSuggestions.suggestedPriority - 1]
            toast(`AI Suggested priority : ${label}`, {
                duration: 5500,
                style: {
                    top: 75,
                    background: "#333",
                    color: "#fff",
                },

            });
        }
        if (!dueDate && aiSuggestions?.suggestedDueDate) {
            setDueDate(aiSuggestions.suggestedDueDate.split("T")[0])//
            toast(`AI Suggested DueDate: ${new Date(aiSuggestions.suggestedDueDate).toLocaleDateString()}`, {
                duration: 5500,
                style: {
                    top: 105,
                    background: "#333",
                    color: "#fff",
                },
            })
        }

    }, [aiSuggestions])

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
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
                        onChange={(e) => handleDescriptionChange(e.target.value)}
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
                    <Button variant="outline" onClick={() => handleOpenChange(false)}>
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