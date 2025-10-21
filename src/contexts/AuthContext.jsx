/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2024 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("opentaqwa_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Sign up function
  const signUp = async (name, email, password) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(
        localStorage.getItem("opentaqwa_users") || "[]"
      );
      const userExists = existingUsers.find((u) => u.email === email);

      if (userExists) {
        throw new Error("User with this email already exists");
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date().toISOString(),
        preferences: {
          dhikrGoal: 100,
          notificationsEnabled: true,
        },
      };

      // Save to users list (with password - NOT secure in real app!)
      existingUsers.push({ ...newUser, password });
      localStorage.setItem("opentaqwa_users", JSON.stringify(existingUsers));

      // Set current user (without password)
      const userWithoutPassword = { ...newUser };
      setUser(userWithoutPassword);
      localStorage.setItem(
        "opentaqwa_user",
        JSON.stringify(userWithoutPassword)
      );

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const existingUsers = JSON.parse(
        localStorage.getItem("opentaqwa_users") || "[]"
      );
      const foundUser = existingUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      // Remove password before setting user
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem(
        "opentaqwa_user",
        JSON.stringify(userWithoutPassword)
      );

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Sign out function
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("opentaqwa_user");
  };

  // Update user preferences
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("opentaqwa_user", JSON.stringify(updatedUser));

    // Also update in users list
    const existingUsers = JSON.parse(
      localStorage.getItem("opentaqwa_users") || "[]"
    );
    const userIndex = existingUsers.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
      localStorage.setItem("opentaqwa_users", JSON.stringify(existingUsers));
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
