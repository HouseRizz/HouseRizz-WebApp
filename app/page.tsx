"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import { createDocument, readDocument, updateDocument } from "@/lib/firestoreUtils";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  address: string;
  phoneNumber: string;
  userType: string;
  joined: number;
}

export default function Home() {
  const { user, loading } = useAuthContext();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      const fetchOrCreateProfile = async () => {
        try {
          let profile = await readDocument<UserProfile>('users', user.uid);
          if (!profile) {
            profile = {
              id: user.uid,
              email: user.email || "",
              name: user.displayName || "Not Provided",
              address: "Not Provided",
              phoneNumber: "Not Provided",
              userType: "Buyer",
              joined: Date.now(),
            };
            await createDocument("users", user.uid, profile);
            console.log("User profile created successfully");
          } else if (!profile.name && user.displayName) {
            profile.name = user.displayName;
            await updateDocument("users", user.uid, { name: user.displayName });
          }
          setUserProfile(profile);
        } catch (error) {
          console.error("Failed to fetch or create user profile:", error);
        }
      };
      fetchOrCreateProfile();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Welcome to Our E-Commerce Store
          </h1>
          {user ? (
            <SignOutButton />
          ) : (
            <Link href="/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </Link>
          )}
        </div>
        <div className="text-center mb-8">
          {user ? (
            <>
              <p className="mb-4">
                Hello, {userProfile?.name || user.displayName || "User"}! Welcome to your personalized
                shopping experience.
              </p>
              <Link href="/profile" className="text-blue-600 hover:underline">
                View Your Profile
              </Link>
            </>
          ) : (
            <p className="mb-4">
              Welcome to our E-Commerce Store! Please login to access personalized features.
            </p>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <p>Product 1</p>
          <p>Product 2</p>
          <p>Product 3</p>
          <p>Check out our amazing products!</p>
        </div>
      </main>
    </div>
  );
}