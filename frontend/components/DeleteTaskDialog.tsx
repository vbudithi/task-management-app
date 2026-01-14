'use client'

import { Task } from "@/types/taskTypes"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "./ui/alert-dialog"

type Props = {
    open: boolean
    task?: Task
    onConfirm: () => void;
    onClose: () => void;
}
export default function DeleteTaskDialog({ task, onConfirm, open, onClose }: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle> Delete Task </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete {""}
                        <span className="font-semibold">{task?.title}</span>
                        {""}. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover bg-red:700 cursor-pointer">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}