"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { getProfile, logoutUser } from "@/lib/authService";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user && (
        <div className="mt-4">
          <p>
            {" "}
            Welcome {user.firstName} {user.lastName}
          </p>
          <Link href="/profile">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
              View Profile
            </button>
          </Link>

          <Button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded cursor-pointer"
          >
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </div>
      )}
    </div>
  );
}
