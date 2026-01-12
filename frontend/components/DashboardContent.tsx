"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { getProfile, logoutUser } from "@/lib/authService";
import { getAllTasks } from "@/lib/tasks";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { capitalizeFirst } from "@/utils/string";
import type { User } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/types/taskTypes";
import { TaskColumns } from "@/components/TaskColumns";

export default function DashboardContent() {
      const router = useRouter();
      const [user, setUser] = useState<User | null>(null);
      const [tasks, setTasks] = useState<Task[]>([]);
      const [loading, setLoading] = useState(false);
    
useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getProfile();
        const data = res.data;
        setUser(data);
        console.log(data, "data");
      } catch (error) {
        router.push("/login");
        toast.error("You're not logged in");
        console.error("Not Logged in:", error);
        
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const getUserTasks = async () => {
      try {
        setLoading(true);
        const data = await getAllTasks();
        if (!data || data.length === 0) {
          toast.error("Failed to load the tasks");
          return;
        }
        setTasks(data || []);
        console.log("Get All Tasks", data);
      } catch (error) {
        console.error("Failed to load tasks", error);
      } finally {
        setLoading(false);
      }
    };
    getUserTasks();
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      toast.success("Logged out Successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };


  return(
    <>
       {user && (
            <div className="text-center">
              <p className="text-lg flex justify-end">
                  Welcome, 
                  <span className="font-semibold text-orange-600 ">{capitalizeFirst(user.firstName)} {capitalizeFirst(user.lastName)} </span>
                  
              </p>
              <div className="flex justify-end ">
                  <Link href="/profile">
                      <Button className="mr-2 bg-green-700 hover:bg-green-800 text-white cursor-pointer">View Profile</Button>
                  </Link>
                    <Button onClick={handleLogout} className="bg-gray-600 text-white cursor-pointer">
                      {loading ? "Logging out..." : "Logout"}
                    </Button>
              </div>
            </div>
          )}
        <div className="text-xl md:text-3xl font-bold md:text-center -translate-y-18 ">Dashboard</div>

        {/* loading state */}
            {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full rounded-lg" />
                  ))}
            </div>
            )}  

        {/* No tasks */}
            {!loading && tasks.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["To Do", "In Progress", "Done"].map((status) => (
                <div key={status}>
                <h3 className="text-xl font-medium mb-2">{status}</h3>
                <p className="text-sm text-gray-500">No tasks here</p>
                </div>
                ))}
            </div>
        )}

        {/* Display tasks */}
            {!loading && tasks.length > 0 && <TaskColumns tasks={tasks} />}
            </>
          )
    }