"use client";
import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { readDocument, updateDocument } from '@/lib/firestoreUtils';

interface UserProfile {
    address: string;
    email: string;
    name: string;
    phoneNumber: string;
}

export default function ProfilePage() {
    const { user } = useAuthContext();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        if (!user) return;

        setIsLoading(true);
        setError(null);
        try {
            const fetchedProfile = await readDocument<UserProfile>('users', user.uid);
            setProfile(fetchedProfile);
            setEditedProfile(fetchedProfile);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError('Failed to fetch profile. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchProfile();
        } else {
            setIsLoading(false);
        }
    }, [user, fetchProfile]);



    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedProfile(profile);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({ ...prev!, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !editedProfile) return;

        setIsLoading(true);
        setError(null);
        try {
            await updateDocument('users', user.uid, editedProfile);
            setProfile(editedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user || !profile) {
        return <div>No user profile found.</div>;
    }

    return (
        <ProtectedRoute>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-1">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={editedProfile?.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={editedProfile?.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block mb-1">Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={editedProfile?.address}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block mb-1">Phone Number:</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={editedProfile?.phoneNumber}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="space-x-4">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                            <button type="button" onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Address:</strong> {profile.address}</p>
                        <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
                        <button onClick={handleEdit} className="bg-green-500 text-white px-4 py-2 rounded">Edit Profile</button>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}