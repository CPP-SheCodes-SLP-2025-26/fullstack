// src/auth/AuthContext.jsx
// ...imports unchanged

export function AuthProvider({ children }) {
  // ...state + useEffect unchanged

  const login = async ({ email, password }) => {
    // ...unchanged
  };

  // ⬇️ accept roomNumber and send it to backend
  const register = async ({ name, email, password, roomNumber }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, roomNumber }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Sign up failed");
      }
      const me = await fetch("/api/auth/me", { credentials: "include" });
      const data = await me.json();
      setUser(data?.user ?? null);
    } finally {
      setLoading(false);
    }
  };

  // ...logout unchanged
  const value = useMemo(
    () => ({ user, hydrated, loading, login, register, logout }),
    [user, hydrated, loading]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
