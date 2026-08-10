


//due to vite this was important to act
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";


export const api = {

  get: (path) => {
    return fetch(BASE_URL + path)
      .then(response => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      });
  },

  post: (path, body) => {
    return fetch(BASE_URL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    });
  },

  put: (path, body) => {
    return fetch(BASE_URL + path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    });
  },

  delete: (path) => {
    return fetch(BASE_URL + path, {
      method: "DELETE"
    });
  }
};