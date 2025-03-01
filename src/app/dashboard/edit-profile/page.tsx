'use client'

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type User = {
  username: string;
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  description: string;
};

const defaultUser: User = {
  username: '',
  email: '',
  name: '',
  birthDate: '',
  gender: '',
  description: ''
};

export default function EditProfile() {
  const [user, setUser] = useState<User>(defaultUser);
  const [loading, setLoading] = useState(false); 

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get<User>("https://yo-backend.onrender.com/auth/me", {
          withCredentials: true,
        });

        setUser({
          username: data.username || '',
          email: data.email || '',
          name: data.name || '',
          birthDate: data.birthDate.split('T')[0] || '',
          gender: data.gender || '',
          description: data.description || ''
        });

      } catch (error: any) {
        console.log(error);
        toast("Please log in again.");
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  if (!user.username) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-3xl">Loading...</p>
      </div>
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);  
    try {
      await axios.put("https://yo-backend.onrender.com/user/profile", user, {
        withCredentials: true,
      });
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.log(error);
      toast("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);  
    }
  };

  const handleLogout = async () => {
    try {
      const req = await axios.post("https://yo-backend.onrender.com/auth/logout", {}, { withCredentials: true });
      if (req.status === 200) router.push('/');
    } catch (error: any) {
      console.log(error);
      toast("Error Logging out");
    }
  };

  return (
    <div>
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 onClick={() => router.push('/dashboard')} className="text-xl cursor-pointer font-bold">Dashboard</h1>
        <h2 className="md:text-2xl font-semibold">{user.username} !</h2>
        <div className="flex items-center gap-4">
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
        </div>
      </header>

      <div className="animate-fade-in p-6 md:max-w-2xl max-w-[330px] mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="birthDate"
            value={user.birthDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="female">Female</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="description"
            value={user.description}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 rounded transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
