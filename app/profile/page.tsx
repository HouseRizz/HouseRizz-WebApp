"use client";
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <div>
                <h1>Profile Page</h1>
                <div> This is a protected route</div>
            </div>
        </ProtectedRoute>
    );
}