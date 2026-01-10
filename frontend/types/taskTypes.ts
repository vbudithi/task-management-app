export interface Task{
    id: number,
    title:string;
    description:String;
    status:number;
    priority:number;
    dueDate?:  string | null;
}

export interface CreateTaskDto{
    title: string;
    description:string; 
    status: number; //  0 = Todo, 1 =InProgress, 2 = Completed
    priority:number; //1-3
    dueDate? : string | null; 
}

export interface updateTaskDto{
    title: string;
    description:string; 
    status: number;
    priority:number;
    dueDate? : string | null; 
}