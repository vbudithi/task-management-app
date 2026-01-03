"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { getProfile } from "@/lib/authService";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      console.log(token, "token-dashboardpage");
      if (!token) return (window.location.href = "/login");
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
        </div>
      )}
    </div>
  );
}
