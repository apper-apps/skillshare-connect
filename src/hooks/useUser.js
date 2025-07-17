import { useState, useEffect } from "react";
import { userService } from "@/services/api/userService";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const allUsers = await userService.getAll();
        setUsers(allUsers);
        // Set current user as first user for demo
        setUser(allUsers[0]);
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const updateUser = async (userId, userData) => {
    try {
      const updatedUser = await userService.update(userId, userData);
      setUser(updatedUser);
      setUsers(prev => prev.map(u => u.Id === userId ? updatedUser : u));
      return updatedUser;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  };

  return {
    user,
    users,
    loading,
    updateUser
  };
};