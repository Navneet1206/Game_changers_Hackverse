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
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if the user is already logged in (on page refresh)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data using the token
      fetch('http://localhost:3000/api/protected', {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.userId) {
            setUser(data.user);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          ...userData,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Automatically log in the user after signup
      await signIn(email, password);
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Store the token in local storage
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}