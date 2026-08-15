import { supabase } from "./supabase.js";


//due to vite this was important to act
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";


async function getAuthHeaders() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (token) {
    return { "Authorization": `Bearer ${token}` };
  }
  return {};
}


export const api = {

   get: async (path) => {
    const authHeaders = await getAuthHeaders();

    return fetch(BASE_URL + path, 
      { headers: authHeaders })
      .then(response => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      });
  },

  post: async (path, body) => {
    const authHeaders = await getAuthHeaders();

    return fetch(BASE_URL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders
      },
      body: JSON.stringify(body)
    })

    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    });
  },

  put: async (path, body) => {
    const authHeaders = await getAuthHeaders();
    return fetch(BASE_URL + path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    });
  },

  delete: async (path) => {
    const authHeaders = await getAuthHeaders();

    return fetch(BASE_URL + path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders
      },
    });
  }
};