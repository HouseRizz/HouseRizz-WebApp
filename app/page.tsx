"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import { createDocument } from "@/lib/firestoreUtils";

export default function Home() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [profileCreated, setProfileCreated] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
    if (user && !profileCreated) {
      const createProfile = async () => {
        try {
          const userProfile = {
            id: user.uid,
            email: user.email || "",
            name: user.displayName || "",
            address: "Not Provided",
            phoneNumber: "Not Provided",
            userType: "Buyer",
            joined: Date.now(),
          };
          await createDocument("users", user.uid, userProfile);
          setProfileCreated(true);
          console.log("User profile created successfully");
        } catch (error) {
          console.error("Failed to create user profile:", error);
        }
      };
      createProfile();
    }
  }, [user, loading, router, profileCreated]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Welcome to Our E-Commerce Store
          </h1>
          <SignOutButton />
        </div>
        <div className="text-center mb-8">
          <p className="mb-4">
            Hello, {user.displayName || "User"}! Welcome to your personalized
            shopping experience.
          </p>
          <Link href="/profile" className="text-blue-600 hover:underline">
            View Your Profile
          </Link>
        </div>
      </main>
    </div>
  );
}
