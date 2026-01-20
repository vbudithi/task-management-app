export interface Task {
    id: number,
    title: string;
    description: string;
    status: number;
    priority: number;
    dueDate?: string | null;
}

export interface CreateTaskDto {
    title: string;
    description: string;
    status: number; //  0 = Todo, 1 =InProgress, 2 = Completed
    priority: number | null; //1-3
    dueDate?: string | null;
}

export interface updateTaskDto {
    title: string;
    description: string;
    status: number;
    priority: number | null;
    dueDate?: string | null;
}


export interface AnalyzedTaskDto {
    task: CreateTaskDto;
    aiInsights: AIAnalyzedtaskDto

}

export interface AIAnalyzedtaskDto {
    suggestedPriority: number,
    suggestedDueDate: string | null
}
