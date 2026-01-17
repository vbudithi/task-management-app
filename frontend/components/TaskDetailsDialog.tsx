import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Flag, Activity } from "lucide-react";
import { Task } from "@/types/taskTypes";
import { dateFormat } from "../utils/dateFormat";

type Props = {
    task?: Task;
    open: boolean;
    onClose: () => void;
};

export default function TaskDetailsDialog({ task, open, onClose }: Props) {
    if (!task) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md rounded-xl">
                <DialogHeader className="space-y-1 text-center">
                    <DialogTitle className="text-xl font-semibold">
                        {task.title}
                    </DialogTitle>
                </DialogHeader>
                <div className="mt-4 text-sm ">
                    <p className="text-muted-foreground">Description</p>
                    <p className="mt-1">
                        {task.description || "No description provided."}
                    </p>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                        <Activity size={16} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Status</span>
                        <Badge variant="secondary">{task.status}</Badge>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Flag size={16} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Priority</span>
                        <Badge
                            variant={
                                String(task.priority) === "High"
                                    ? "destructive"
                                    : String(task.priority) === "Medium"
                                        ? "default"
                                        : "secondary"
                            }
                        >
                            {task.priority}
                        </Badge>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Calendar size={16} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Due</span>
                        <span className="text-sm font-medium">
                            {dateFormat(task.dueDate)}
                        </span>
                    </div>
                </div>
                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}