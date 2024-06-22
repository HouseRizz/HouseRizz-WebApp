"use client";
import { signInWithGoogle } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function GoogleSignInButton() {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        const user = await signInWithGoogle();
        if (user) {
            router.push('/'); // Redirect to home page after successful sign-in
        }
    };

    return (
        <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow hover:bg-gray-100"
        >
            Sign in with Google
        </button>
    );
}