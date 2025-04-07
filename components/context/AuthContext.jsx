import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLogin } from '../../lib/api-auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
          try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
              setUser(JSON.parse(userData));
            }
          } catch (error) {
            console.log("Error cargando el usuario:", error);
          } finally {
            setLoading(false);
          }
        };
        loadUser();
      }, []);

      const login = async (credentials) => {
        try {
          const result = await apiLogin(credentials);
      
          const userData = {
            id: result.id,
            name: result.name,
            email: result.email,
            role: result.role,
            propicture: "",
            token: result.token,
          };
      
          setUser(userData);
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.log("Error al iniciar sesión:", error);
          throw error;
        }
      };
      
      const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
      }

      return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => useContext(AuthContext);