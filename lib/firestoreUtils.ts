// lib/firestore-utils.ts

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "@/config/firebase.config";

const db = getFirestore(app);

interface UserProfile {
  address: string;
  email: string;
  id: string;
  joined: number;
  name: string;
  phoneNumber: string;
  userType: string;
}

export async function createDocument<T extends UserProfile>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  const defaultData: UserProfile = {
    address: "Not Provided",
    email: data.email || "",
    id: id,
    joined: Date.now(),
    name: data.name || "",
    phoneNumber: "Not Provided",
    userType: "Buyer",
  };

  const mergedData = { ...defaultData, ...data };

  await setDoc(doc(db, collectionName, id), mergedData);
}

export async function readDocument<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as T;
  } else {
    return null;
  }
}

export async function updateDocument<T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}
