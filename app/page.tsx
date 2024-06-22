"use client";

import { useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';

export default function Home() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null; // This will prevent any flash of content before redirect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Welcome to Our E-Commerce Store</h1>
          <SignOutButton />
        </div>
        <div className="text-center mb-8">
          <p className="mb-4">Hello, {user.email}! Welcome to your personalized shopping experience.</p>
          <Link href="/profile" className="text-blue-600 hover:underline">
            View Your Profile
          </Link>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex justify-center space-x-4">
            <Link href="/browse" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Browse Products
            </Link>
            <Link href="/cart" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              View Cart
            </Link>
            <Link href="/orders" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Order History
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Placeholder for recommended products */}
            <div className="bg-white p-4 shadow rounded">Product 1</div>
            <div className="bg-white p-4 shadow rounded">Product 2</div>
            <div className="bg-white p-4 shadow rounded">Product 3</div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <div className="bg-white shadow rounded p-4">
            {/* Placeholder for recent orders */}
            <p>You have no recent orders.</p>
          </div>
        </section>
      </main>
    </div>
  );
}