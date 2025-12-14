const BASE_URL = "https://bliss-backend-production.up.railway.app";

const getSales = async () => {
  const response = await fetch(`${BASE_URL}/users/`);
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: responseJson.data };
}

const getTotalNasabah = async () => {
  const response = await fetch(`${BASE_URL}/analytic/nasabah`);
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: responseJson.data };
}

const getTotalNasabahPrioritas = async () => {
  const response = await fetch(`${BASE_URL}/analytic/nasabah/priority`);
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: responseJson.data };
}

const getUsersById = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: responseJson.data };
}

const deleteUserById = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: responseJson.data };
}

const uploadImageUser = async (file, id) => {
  const formData = new FormData();
  formData.append('profileImage', file);
  const response = await fetch(`${BASE_URL}/users/upload/${id}`, {
    method: 'POST',
    credentials: "include",
    body: formData
  });
  const responseJson = await response.json();
  console.log('hayu', responseJson)
  console.log('tes', responseJson.data.imageUrl)
  return responseJson
}


const editUserData = async (data, id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const responseJson = await response.json();
    console.log('respon', responseJson)
    if (responseJson.status !== "success") {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error(error);
  }
}

const editNasabahData = async (data, id) => {
  try {
    console.log(JSON.stringify(data));
    const response = await fetch(`${BASE_URL}/nasabah/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };

  } catch (error) {
    console.error("editNasabahData error:", error);
    return { error: true, data: null };
  }
};


const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", // IMPORTANT: send cookies
    });

    const responseJson = await response.json();

    if (!response.ok || responseJson.success !== true) {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.message };
  } catch (error) {
    console.error("Logout error:", error);
    return { error: true, data: null };
  }
};

const incrementLeaderboard = async (userId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/leaderboard/${userId}/increment`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to increment score");
    }

    return responseJson;
  } catch (err) {
    console.error("Leaderboard increment error:", err);
    throw err;
  }
};

const getTopThreeUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/top-three`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      return { error: true, data: null };
    }
    return responseJson.data;
  }
  catch (error) {
    console.error("getTopThreeUsers error:", error);
    return { error: true, data: null };
  }
};

const getCount = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/nasabah/counts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error("getCount error:", error);
    return { error: true, data: null };
  }
};

const getUserData = async (userId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error("getUserData error:", error);
    return { error: true, data: null };
  }
};


const updateUserProfile = async (payload, token) => {
  const res = await fetch(`${BASE_URL}/users/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to update profile");
  }

  return res.json();
}

const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`https://bliss-model-service-production.up.railway.app/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload CSV');
  }

  return response.json();
};

const getNasabah = async () => {
  const response = await fetch(`${BASE_URL}/nasabah`, {
    method: "GET",
    credentials: "include",
  });
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: responseJson.data };
}

const getNasabahSpecific = async (user_id) => {
  try {
    const response = await fetch(`${BASE_URL}/nasabah/specific`, {
      method: "POST",
      body: user_id
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  } catch (error) {
    console.error("getNasabahSpecific error:", error);
    return { error: true, data: null };
  }
}

export { getNasabahSpecific, getNasabah, uploadImageUser, uploadCSV, updateUserProfile, getUserData, getCount, getSales, getTotalNasabah, getTotalNasabahPrioritas, getUsersById, deleteUserById, editUserData, editNasabahData, logoutUser, incrementLeaderboard, getTopThreeUsers };
