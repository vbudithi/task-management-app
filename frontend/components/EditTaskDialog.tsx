import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { CreateTaskDto, Task } from '@/types/taskTypes';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect, useRef } from 'react';
import { toInputDate } from '../utils/dateFormat';
import { analyzeTask } from '@/lib/tasks';
import toast from 'react-hot-toast';

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
    const [priority, setPriority] = useState<number | undefined>(undefined);
    const [dueDate, setDueDate] = useState<string>("");
    const [initialState, setInitialState] = useState<{
        title: string;
        description: string;
        status: number;
        priority: number | undefined;
        dueDate: string;
    } | null>(null);
    const debounceRef = useRef<any>(null);
    const [aiSuggestions, setAiSuggestions] = useState<{ suggestedPriority: number, suggestedDueDate: string | null } | null>(null);

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
            title !== initialState.title ||
            description !== initialState.description ||
            status !== initialState.status ||
            priority !== initialState.priority ||
            dueDate !== initialState.dueDate
        );

    const handleSave = () => {
        onConfirm({
            title,
            description,
            status,
            priority,
            dueDate
        });
    };

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
                };
                const res = await analyzeTask(payload);
                setAiSuggestions(res.aiInsights);
                console.log("AI result:", res);
            } catch (err) {
                console.error("AI Analysis failed", err);
            }
        }, 1000);
    };

    useEffect(() => {
        if (!aiSuggestions) return;
        if (aiSuggestions.suggestedPriority && aiSuggestions.suggestedPriority !== priority) {
            setPriority(aiSuggestions.suggestedPriority);
            console.log("Priority set by AI:", aiSuggestions.suggestedPriority);
            const label = ["Low", "Medium", "High"][aiSuggestions.suggestedPriority - 1];
            toast(`AI Suggested Priority: ${label}`, {
                duration: 5500,
                style: {
                    top: 105,
                    background: "#333",
                    color: "#fff",
                },
            });
        }
        if (aiSuggestions.suggestedDueDate) {
            setDueDate(aiSuggestions.suggestedDueDate.split("T")[0])
            console.log("DueDate set by AI:", aiSuggestions.suggestedDueDate);
            toast(`AI Suggested Due Date: ${new Date(aiSuggestions.suggestedDueDate).toLocaleDateString()}`, {
                duration: 5500,
                style: {
                    top: 105,
                    background: "#333",
                    color: "#fff",
                },
            });
        }
    }, [aiSuggestions]);


    return (
        <Dialog open={open} onOpenChange={onClose}>
            {task && (
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Edit Task
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input
                            autoFocus
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Textarea
                            placeholder="Description"
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
                                value={priority ?? ""}
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
                            className="cursor-pointer"
                            onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={!isDirty}
                            className={!isDirty ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    );
}
