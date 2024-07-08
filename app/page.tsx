"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import { createDocument } from "@/lib/firestoreUtils";
import { getProducts } from "@/utils/cloudkit-utils";
import { Product } from "@/types/cloudkit";

export default function Home() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [profileCreated, setProfileCreated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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

        <h2 className="text-2xl font-bold mb-4">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link href={`/product/${product.recordName}`} key={product.recordName}>
              <div className="border rounded-lg p-4 hover:shadow-lg transition duration-300">
                <img
                  src={product.fields.imageURL1.value.downloadURL}
                  alt={product.fields.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">{product.fields.name}</h3>
                <p className="text-gray-600">${product.fields.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}