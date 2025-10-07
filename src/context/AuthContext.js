import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', email);
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.code, error.message);
      let errorMessage = error.message;
      
      // Provide more helpful error messages
      if (error.code === 'auth/configuration-not-found') {
        errorMessage = 'Firebase Authentication is not enabled. Please check Firebase Console.';
      } else if (error.code === 'auth/invalid-api-key') {
        errorMessage = 'Invalid Firebase API key. Please check configuration.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const register = async (email, password) => {
    try {
      console.log('Attempting registration with:', email);
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.code, error.message);
      let errorMessage = error.message;
      
      // Provide more helpful error messages
      if (error.code === 'auth/configuration-not-found') {
        errorMessage = 'Firebase Authentication is not enabled. Please check Firebase Console.';
      } else if (error.code === 'auth/invalid-api-key') {
        errorMessage = 'Invalid Firebase API key. Please check configuration.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};