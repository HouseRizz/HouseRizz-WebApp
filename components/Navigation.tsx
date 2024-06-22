"use client";
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase.config';

export default function Navigation() {
    const { user } = useAuthContext();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                {user ? (
                    <>
                        <li><Link href="/profile">Profile</Link></li>
                        <li><button onClick={handleSignOut}>Sign Out</button></li>
                    </>
                ) : (
                    <>
                        <li><Link href="/auth/signin">Sign In</Link></li>
                        <li><Link href="/auth/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}