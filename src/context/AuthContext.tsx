import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as storage from "../storage/storage";
import { UserPublic, UserStored } from "../types";
import SHA256 from "crypto-js/sha256";

const generateSalt = () => {
  return SHA256(Math.random().toString() + Date.now().toString()).toString();
};

const hashPassword = (password: string, salt: string) => {
  return SHA256(password + salt).toString();
};

type AuthContextType = {
  user: UserPublic | null;
  loading: boolean;
  register: (data: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: {
    email?: string;
    username?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore logged in user on app start
  useEffect(() => {
    (async () => {
      const current = await storage.getCurrentUser();
      if (current) setUser(current);
      setLoading(false);
    })();
  }, []);

  // REGISTER
  const register = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      const users = await storage.getUsers();

      if (users.find((u) => u.email === email)) {
        Alert.alert("Registration Error", "Email already registered.");
        return;
      }

      const salt = generateSalt();
      const hashed = hashPassword(password, salt);

      const newUser: UserStored = {
        id: Date.now().toString(),
        email,
        username,
        password: hashed,
        salt,
      };

      users.push(newUser);
      await storage.saveUsers(users);

      const pub: UserPublic = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      };

      await storage.setCurrentUser(pub);
      setUser(pub);

      Alert.alert("Success", "Account created successfully.");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Registration failed.");
    }
  };

  // LOGIN
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const users = await storage.getUsers();
      const found = users.find((u) => u.email === email);

      if (!found) {
        Alert.alert("Login Failed", "Invalid email or password.");
        return;
      }

      const hashed = hashPassword(password, found.salt);

      if (found.password !== hashed) {
        Alert.alert("Login Failed", "Invalid email or password.");
        return;
      }

      const pub: UserPublic = {
        id: found.id,
        email: found.email,
        username: found.username,
      };

      await storage.setCurrentUser(pub);
      setUser(pub);

      Alert.alert("Success", "Logged in successfully.");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Login failed.");
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await storage.clearCurrentUser();
      setUser(null);
      Alert.alert("Logged out", "You have been logged out.");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Logout failed.");
    }
  };

  // UPDATE PROFILE
  const updateProfile = async ({
    email,
    username,
    currentPassword,
    newPassword,
  }: {
    email?: string;
    username?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => {
    try {
      if (!user) {
        Alert.alert("Error", "Not authenticated.");
        return;
      }

      const users = await storage.getUsers();
      const meIndex = users.findIndex((u) => u.id === user.id);

      if (meIndex === -1) {
        Alert.alert("Error", "User not found.");
        return;
      }

      const me = users[meIndex];

      // require current password for sensitive changes
      const sensitiveChange =
        (newPassword && newPassword.length > 0) ||
        (email && email !== user.email);

      if (sensitiveChange) {
        if (!currentPassword) {
          Alert.alert(
            "Error",
            "Current password is required to change email or password."
          );
          return;
        }

        const hashedCurrent = hashPassword(currentPassword, me.salt);
        if (me.password !== hashedCurrent) {
          Alert.alert("Error", "Current password is incorrect.");
          return;
        }
      }

      if (
        email &&
        email !== user.email &&
        users.some((u) => u.email === email)
      ) {
        Alert.alert("Error", "Email already in use.");
        return;
      }

      if (email) me.email = email;
      if (username) me.username = username;

      if (newPassword) {
        const newSalt = generateSalt();
        me.salt = newSalt;
        me.password = hashPassword(newPassword, newSalt);
      }

      await storage.saveUsers(users);

      const updatedPub: UserPublic = {
        id: me.id,
        email: me.email,
        username: me.username,
      };

      await storage.setCurrentUser(updatedPub);
      setUser(updatedPub);

      Alert.alert("Success", "Profile updated.");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Update failed.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
