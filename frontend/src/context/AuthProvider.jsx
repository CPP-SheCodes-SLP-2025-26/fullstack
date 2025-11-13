import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AuthAPI } from '../lib/api';


const AuthCtx = createContext(null);


export function AuthProvider({ children }) {
const [user, setUser] = useState(() => {
const raw = localStorage.getItem('auth_user');
return raw ? JSON.parse(raw) : null;
});
const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
const [loading, setLoading] = useState(true);


useEffect(() => {
// Try to refresh session on load
(async () => {
try {
const data = await AuthAPI.me();
if (data?.user) {
setUser(data.user);
localStorage.setItem('auth_user', JSON.stringify(data.user));
}
} catch (_) {
// ignore
} finally {
setLoading(false);
}
})();
}, []);


const saveAuth = useCallback((data) => {
// Expect { user, token? }
if (data.user) {
setUser(data.user);
localStorage.setItem('auth_user', JSON.stringify(data.user));
}
if (data.token) {
setToken(data.token);
localStorage.setItem('auth_token', data.token);
}
}, []);


const clearAuth = useCallback(() => {
setUser(null);
setToken(null);
localStorage.removeItem('auth_user');
localStorage.removeItem('auth_token');
}, []);


const value = { user, token, loading, saveAuth, clearAuth };
return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}


export function useAuth() {
return useContext(AuthCtx);
}