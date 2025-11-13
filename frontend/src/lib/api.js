// src/lib/api.js
export async function api(path, { method = 'GET', body, headers } = {}) {
  const opts = { method, headers: { 'Content-Type': 'application/json', ...(headers || {}) } };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(path, opts);
  const isJson = res.headers.get('content-type')?.includes('application/json');
  if (!res.ok) {
    let errText = 'Request failed';
    if (isJson) {
      const data = await res.json().catch(() => ({}));
      errText = data.error || data.message || errText;
    } else {
      errText = await res.text().catch(() => errText);
    }
    throw new Error(errText);
  }
  return isJson ? res.json() : res.text();
}

export const AuthAPI = {
  async signup(payload) {
    return api('/api/auth/signup', { method: 'POST', body: payload });
  },
  async login(payload) {
    return api('/api/auth/login', { method: 'POST', body: payload });
  },
  async logout() {
    return api('/api/auth/logout', { method: 'POST' });
  },
  async me() {
    return api('/api/auth/me');
  },
  async forgot(email) {
    return api('/api/auth/forgot', { method: 'POST', body: { email } });
  },
  async reset(token, password) {
    return api(`/api/auth/reset/${token}`, { method: 'POST', body: { password } });
  },
};
