import { auth } from "@/config/firebase.config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  updateProfile,
} from "firebase/auth";
import { showErrorToast } from "@/utils/showErrorToast";

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    if (error instanceof Error) {
      showErrorToast(`Error signing in with Google: ${error.message}`);
    } else {
      showErrorToast(
        "An unexpected error occurred while signing in with Google"
      );
    }
    return null;
  }
};

// Email and password validation
function validate(
  email: string,
  password: string
): { isValid: boolean; errorMessage: string } {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.(com|net|org|edu)$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!email.trim()) {
    return { isValid: false, errorMessage: "Email is required." };
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      errorMessage:
        "Please enter a valid email address from Google, Yahoo or Outlook",
    };
  }

  if (!password.trim()) {
    return { isValid: false, errorMessage: "Password is required." };
  }

  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      errorMessage:
        "Password must be at least 8 characters long and contain at least one letter and one number.",
    };
  }

  return { isValid: true, errorMessage: "" };
}

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<User | null> => {
  const validation = validate(email, password);
  if (!validation.isValid) {
    showErrorToast(validation.errorMessage);
    return null;
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    if (error instanceof Error) {
      showErrorToast(`Error signing in with email: ${error.message}`);
    } else {
      showErrorToast(
        "An unexpected error occurred while signing in with email"
      );
    }
    return null;
  }
};

export const registerWithEmail = async (
  email: string,
  password: string,
  name: string
): Promise<User | null> => {
  const validation = validate(email, password);
  if (!validation.isValid) {
    showErrorToast(validation.errorMessage);
    return null;
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    // Force a refresh of the user object
    await result.user.reload();
    return auth.currentUser; // Return the refreshed user object
  } catch (error) {
    if (error instanceof Error) {
      showErrorToast(`Error registering with email: ${error.message}`);
    } else {
      showErrorToast(
        "An unexpected error occurred while registering with email"
      );
    }
    return null;
  }
};
