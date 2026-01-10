import { CreateTaskDto, Task, updateTaskDto } from "@/types/taskTypes";
import { http, HttpResponse } from "msw";

export const handlers = [
   //  GET TASKS
  http.get("*/task", () => {
    console.log("🟢 MSW: GET /task intercepted");

    return HttpResponse.json([
      { id: 1, title: "Mock Task" },
    ]);
  }),

  //GET TASK BY ID
    http.get("*/task/:id" ,({params})=>{
    const {id} = params;
     console.log("🟢 MSW: GET /task/:id intercepted", id);
    return HttpResponse.json({
            id:Number(id),
            title: "Mock Task by ID",
            description:"From MSW",
            status:1,
            priority:2,
            dueDate: new Date().toISOString(),
  });
  }),

  // CREATE TASK
  http.post("*/task", async ({ request }) => {
    console.log("🟢 MSW: POST /task intercepted");

    const body = (await request.json()) as CreateTaskDto;

    return HttpResponse.json({
      id: 123,
      ...body,
      createdAt: new Date().toISOString(),
    });
  }),

  // DELETE TASK
  http.delete("*/task/:id", ({ params }) => {
    console.log("🟢 MSW: DELETE /task/:id intercepted", params.id);

    return HttpResponse.json({
      success: true,
    });
  }),

  //UPDATE TASK
  http.put("*/task/:id", async({params, request})=>{
    const {id} = params;
    const body = (await request.json()) as updateTaskDto;
      console.log("🟢 MSW: UPDATE /task/:id intercepted", params.id);
      return HttpResponse.json({
        id: Number(id),
        ...body,
        updatedAt: new Date().toISOString(),                      
        //sucess:true
      })
  }),

   //GET TASK BY STATUS
   http.get("*/task/status/:status", async({params})=>{
         const {status}= params;
            console.log("🟢 MSW: GET /task/:id intercepted", status);
            return HttpResponse.json([
              {
                id:1,
                title: "Mock Task by ID",
                description:"From MSW",
                status:Number(status),
                priority:2,
                dueDate: new Date().toISOString(),
            },
            {
                id:2,
                title: "Mock Task by ID2",
                description:"From MSW2",
                status:Number(status),
                priority:2,
                dueDate: new Date().toISOString(),
            },
            {
                id:1,
                title: "Mock Task by ID3",
                description:"From MSW3",
                status:Number(status),
                priority:1,
                dueDate: new Date().toISOString(),
            },
          ]);
   })
];
