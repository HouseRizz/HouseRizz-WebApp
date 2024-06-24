"use client";

import { useState } from 'react';
import { signInWithEmail, registerWithEmail } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

type AuthFormProps = {
    mode: 'signin' | 'register';
};

export default function AuthForm({ mode }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const { user, loading } = useAuthContext(); // Add this line

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'register' && password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        const newUser = mode === 'signin'
            ? await signInWithEmail(email, password)
            : await registerWithEmail(email, password, name);

        if (newUser) {
            // Wait for a short time to allow the auth state to update
            setTimeout(() => {
                router.push('/');
            }, 500);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            )}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (e.target.value.length < 6) {
                            e.target.setCustomValidity('Password must be at least 6 characters long');
                        } else {
                            e.target.setCustomValidity('');
                        }
                    }}
                    required
                    minLength={6}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            {mode === 'register' && (
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            )}
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700"
            >
                {mode === 'signin' ? 'Sign In' : 'Register'}
            </button>
        </form>
    );
}