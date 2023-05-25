"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import jwt_decode from "jwt-decode";

const REFRESH_TOKEN_KEY = "refresh-token";
const ACCESS_TOKEN_KEY = "access-token";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      handleDecodeAccessToken(accessToken);
      setLoading(false);
    } else {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        const setToken = async () => {
          try {
            const result = await axios.get(`${process.env.FUNCTIONS}/auth-token/${refreshToken}`);
            sessionStorage.setItem(ACCESS_TOKEN_KEY, result.data.accessToken);
            handleDecodeAccessToken(result.data.accessToken);
            setLoading(false);
          } catch (error) {
            console.log("error refreshing token", error);
            if (error.response?.status === 401) {
              sessionStorage.removeItem(ACCESS_TOKEN_KEY);
              localStorage.removeItem(REFRESH_TOKEN_KEY);
              setUser(null);
              setPermissions([]);
              setLoading(false);
            }
          }
        };
        setToken();
      } else {
        setLoading(false);
        router.push("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const setToken = async () => {
      const refreshAuthLogic = async (failedRequest) => {
        try {
          const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
          const result = await axios.get(`${process.env.FUNCTIONS}/auth-token/${refreshToken}`);

          sessionStorage.setItem(ACCESS_TOKEN_KEY, result.data.accessToken);

          failedRequest.response.config.headers["Authorization"] = `Bearer ${result.data.accessToken}`;
          return Promise.resolve();
        } catch (error) {
          console.log("error refreshing token", error);
          if (error.response?.status === 401) {
            sessionStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            setUser(null);
            setPermissions([]);
          }
        }
      };

      createAuthRefreshInterceptor(axios, refreshAuthLogic);

      axios.interceptors.request.use((request) => {
        const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) request.headers["Authorization"] = `Bearer ${token}`;
        return request;
      });

      handleDecodeAccessToken(sessionStorage.getItem(ACCESS_TOKEN_KEY));
    };
    setToken();
  }, []);

  const handleDecodeAccessToken = (accessToken) => {
    if (!accessToken) {
      setUser(null);
      setPermissions([]);
      return;
    }
    const decoded = jwt_decode(accessToken);
    setUser(decoded);
    const permissions = [...decoded.permissions.applications, ...decoded.permissions.roles];
    setPermissions(permissions);
  };

  const getAccessToken = () => {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY) || null;
  };

  const getRenewedAccessToken = async () => {
    try {
      const token = localStorage.getItem(REFRESH_TOKEN_KEY);
      const result = await axios.get(`${process.env.FUNCTIONS}/auth-token/${token}`);
      const { accessToken } = result.data;
      sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      return accessToken;
    } catch (error) {
      console.log("error refreshing token", error);
      if (error.response?.status === 401) {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setUser(null);
        setPermissions([]);
      }
    }
  };

  const login = (accessToken, refreshToken) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    handleDecodeAccessToken(accessToken);
  };

  const logout = () => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setUser(null);
    setPermissions([]);
    window.location.href = "/";
  };

  const state = {
    user,
    permissions,
    login,
    logout,
    getRenewedAccessToken,
    getAccessToken,
    handleDecodeAccessToken,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const auth = useAuth();

    useEffect(() => {
      const handleAuth = () => {
        if (!auth.user) setLoading(false);

        const accessToken = auth?.getAccessToken();
        if (accessToken) {
          auth?.handleDecodeAccessToken(accessToken);
          setLoading(false);
          return;
        }

        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (refreshToken) {
          const newAccessToken = auth?.getRenewedAccessToken();
          if (newAccessToken) {
            auth?.handleDecodeAccessToken(newAccessToken);
            setLoading(false);
            return;
          }
        }

        router.push("/login");
      };

      handleAuth();

      return () => {};
    }, []);

    return loading ? <div>Loading Auth...</div> : <WrappedComponent {...props} />;
  };

  return Wrapper;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth, withAuth };
