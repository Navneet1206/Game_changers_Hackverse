import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  userType: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider initialized');
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      fetch('http://localhost:3000/api/auth/validate', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          console.log('Validate Response:', res);
          return res.ok ? res.json() : Promise.reject('Token invalid or expired.');
        })
        .then((data) => {
          console.log('User Data:', data);
          setUser(data.user);
        })
        .catch((err) => {
          console.error('Validation Error:', err);
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);
  

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Starting sign-in process...');
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Login Error:', data.message);
        throw new Error(data.message || 'Login failed.');
      }
  
      console.log('Login Successful:', data);
  
      // Save the JWT token and user details in the Auth Context
      localStorage.setItem('token', data.token); // Store JWT
      setUser(data.user); // Set user data in context
    } catch (err: any) {
      console.error('Sign-In Error:', err.message);
      throw err; // Re-throw to allow UI to handle errors
    }
  };
  

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
