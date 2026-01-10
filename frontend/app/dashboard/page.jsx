"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { getProfile, logoutUser } from "@/lib/authService";
import { getAllTasks } from "@/lib/tasks";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { capitalizeFirst } from "@/utils/string";
import { TaskCard } from "@/components/TaskCard";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getProfile();
        const data = res.data;
        setUser(data);
        console.log(data, "data");
      } catch (error) {
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
        setTask(data);
        console.log("Get All Tasks", data);
      } catch (error) {
        console.error("API ERROR:", error);
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

  const statuses = ["To Do", "In Progress", "Done"];
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center">Dashboard</h1>
      {user && (
        <div className="mt-4 text-center">
          <p>
            {" "}
            Welcome {capitalizeFirst(user.firstName)}{" "}
            {capitalizeFirst(user.lastName)}
          </p>
          <div className="flex justify-end -mt-20">
            <Link href="/profile">
              <Button className=" px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded cursor-pointer mr-2">
                View Profile
              </Button>
            </Link>

            <Button
              onClick={handleLogout}
              className=" bg-gray-600 text-white rounded cursor-pointer"
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      )}
      <h2> Tasks</h2>
      <TaskCard task={task} />
    </div>
  );
}
