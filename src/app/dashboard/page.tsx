"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type User = {
  username: string;
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  description: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const req = await axios.get(
          "https://yo-backend.onrender.com/auth/me",
          { withCredentials: true }  
        );
        setUser(req.data);
      } catch (error: any) {
        toast("Please log in again.");
        router.push("/login");
      }
    };

    getData();
  }, []);

  const handleLogout = async () => {
    try {
      const req = await axios.post(
        "https://yo-backend.onrender.com/auth/logout",  
        {},
        { withCredentials: true }   
      );
      if (req.status === 200) {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      toast("Error Logging out");
    }
  };

  if (user)
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h1 className="cursor-pointer text-xl font-bold">Dashboard</h1>
          <h2 className="hidden md:block text-sm md:text-2xl font-semibold">{user?.username}!</h2>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/edit-profile" className="text-white hover:underline">
              Edit Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="p-4">
          <p className="mt-2 text-gray-700">This is your private dashboard area.</p>
          <h2 className="md:hidden block text-sm md:text-2xl font-semibold">{user?.username}!</h2>
        </main>
      </div>
    );
  else
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-3xl">Loading...</p>
      </div>
    );
}
