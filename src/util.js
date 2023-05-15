const domain = "";

/**
 * Authenticates a user with the specified credential and identity.
 *
 * @param {Object} credential - username and password
 * @param {string} identity - tenant, manager or provider
 * @returns {Promise} A promise that resolves with the authentication token when the login is successful, or rejects with an error message when it fails.
 */
export const login = (credential, identity) => {
  const loginUrl = `${domain}/authenticate/${identity}`;
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credential),
  }).then((response) => {
    console.log(response.status);
    if (response.status !== 200) {
      throw Error("Fail to log in");
    }
    return response.json();
  });
};

/**
 * Registers a new user with the specified credential and identity.
 *
 * @param {Object} credential - username and password
 * @param {string} identity - tenant, manager or provider
 * @returns {Promise} A promise that resolves when the registration is successful, or rejects with an error message when it fails.
 */
export const register = (credential, identity) => {
  const registerUrl = `${domain}/register/${identity}`;
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};

export const getFlatMate = (values) => {
  const authToken = localStorage.getItem("authToken");
  const flatUrl = `${domain}/getFlatmates?username=${values.username}`;
  return fetch(flatUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get flat mates");
    }
    return response.json();
  });
};

/**
 * Get all maintenance records
 *
 * @returns {Promise} A Promise that resolves to an array of maintenance objects returned by the server.
 */
export const getMaintenance = () => {
  const authToken = localStorage.getItem("authToken");
  const listMaintenancesUrl = `${domain}/maintenance`;
  return fetch(listMaintenancesUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get maintenance list");
    }
    return response.json();
  });
};

/**
 * Get maintenance records by username
 *
 * @param {string} username - The username of the user whose maintenance records are to be retrieved.
 * @returns {Promise} A Promise that resolves to an array of maintenance objects returned by the server.
 */
export const getMaintenanceByUser = (username) => {
  const authToken = localStorage.getItem("authToken");
  const listMaintenancesUrl = `${domain}/maintenance/${username}`;
  return fetch(listMaintenancesUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get maintenance list");
    }
    return response.json();
  });
};

/**
 * Get maintenance records with status of submitted
 *
 * @returns {Promise} A Promise that resolves to an array of maintenance objects returned by the server.
 */
export const getMaintenanceSubmitted = () => {
  const authToken = localStorage.getItem("authToken");
  const listMaintenancesUrl = `${domain}/maintenance/submitted`;
  return fetch(listMaintenancesUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get maintenance list");
    }
    return response.json();
  });
};

/**
 * Add a maintenance record
 *
 * @param {object} data - The data to be sent to the server.
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const addMaintenance = (data) => {
  const authToken = localStorage.getItem("authToken");
  const addMaintenanceUrl = `${domain}/maintenance`;
  return fetch(addMaintenanceUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to add a maintenance record");
    }
  });
};

/**
 * Delete a maintenance record
 *
 * @param {string} maintenanceId - The ID of the reservation to be deleted.
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const deleteMaintenance = (maintenanceId) => {
  const authToken = localStorage.getItem("authToken");
  const deleteMaintenanceUrl = `${domain}/maintenance/${maintenanceId}`;
  return fetch(deleteMaintenanceUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to delete maintenance record");
    }
  });
};

/**
 * Provider responds to tenant with a message
 *
 * @param {object} data - maintenance ID,status to be updated, processing time, provider notes
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const sendMessage = (data) => {
  const authToken = localStorage.getItem("authToken");
  const updateMaintenanceUrl = `${domain}/maintenance/message`;
  return fetch(updateMaintenanceUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to update maintenance status");
    }
  });
};

/**
 * Complete a maintenance record
 *
 * @param {object} data - maintenance ID,status to be updated
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const completeMaintenance = (data) => {
  const authToken = localStorage.getItem("authToken");
  const updateMaintenanceUrl = `${domain}/maintenance/update`;
  return fetch(updateMaintenanceUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to update maintenance status");
    }
  });
};

/**
 * Get all amenity
 *
 * @returns {Promise} A Promise that resolves to an array of amenity objects returned by the server.
 */
export const getAmenity = () => {
  const authToken = localStorage.getItem("authToken");
  const listAmenityUrl = `${domain}/amenity`;
  return fetch(listAmenityUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get amenity list");
    }
    return response.json();
  });
};

/**
 * Get all reservations
 *
 * @returns {Promise} A Promise that resolves to an array of reservation objects returned by the server.
 */
export const getReservations = () => {
  const authToken = localStorage.getItem("authToken");
  const listReservationsUrl = `${domain}/reservation`;
  return fetch(listReservationsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get reservation list");
    }
    return response.json();
  });
};

/**
 * Get reservation records by username
 *
 * @param {string} username - The username of the user whose reservation are to be retrieved.
 * @returns {Promise} A Promise that resolves to an array of reservation objects returned by the server.
 */
export const getReservationsByUser = (username) => {
  const authToken = localStorage.getItem("authToken");
  const listReservationsUrl = `${domain}/reservation/${username}`;
  return fetch(listReservationsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get reservation list");
    }
    return response.json();
  });
};

/**
 * Delete a reservation
 *
 * @param {string} reservationId - The ID of the reservation to be deleted.
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const cancelReservation = (reservationId) => {
  const authToken = localStorage.getItem("authToken");
  const cancelReservationUrl = `${domain}/reservation/${reservationId}`;
  return fetch(cancelReservationUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to cancel reservation");
    }
  });
};

/**
 * Add reservation
 *
 * @param {object} data - The data to be sent to the server.
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const addReservation = (data) => {
  const authToken = localStorage.getItem("authToken");
  const addReservationUrl = `${domain}/reservation`;
  return fetch(addReservationUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to book reservation");
    }
  });
};

/**
 * Get all payment records
 *
 * @returns {Promise} A Promise that resolves to an array of payment objects returned by the server.
 */
export const getPayment = () => {
  const authToken = localStorage.getItem("authToken");
  const listPaymentUrl = `${domain}/payment`;
  return fetch(listPaymentUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get payment records");
    }
    return response.json();
  });
};

/**
 * Get payment records by username
 *
 * @param {string} username - The username of the user whose payments are to be retrieved.
 * @returns {Promise} A Promise that resolves to an array of payment objects returned by the server.
 */
export const getPaymentByUser = (username) => {
  const authToken = localStorage.getItem("authToken");
  const listPaymentUrl = `${domain}/payment/${username}`;
  return fetch(listPaymentUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get payment records");
    }
    return response.json();
  });
};

/**
 * Add a payment record
 *
 * @param {object} data - The data to be sent to the server.
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const addPayment = (data) => {
  const authToken = localStorage.getItem("authToken");
  const bookStayUrl = `${domain}/payment`;
  return fetch(bookStayUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to add payment record");
    }
  });
};

/**
 * Upadate status of a payment
 *
 * @param {object} data - status to be updated
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const updatePayment = (data) => {
  const authToken = localStorage.getItem("authToken");
  const updatPaymenteUrl = `${domain}/payment/update`;
  return fetch(updatPaymenteUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to pay bill");
    }
  });
};

/**
 * Get all posts/announcements
 *
 * @returns {Promise} A Promise that resolves to an array of post objects returned by the server.
 */
export const getPost = () => {
  const authToken = localStorage.getItem("authToken");
  const listPostUrl = `${domain}/post`;
  return fetch(listPostUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get post list");
    }
    return response.json();
  });
};

/**
 * Get posts/announcements made by username
 *
 * @param {string} username - The username of the user whose posts are to be retrieved.
 * @returns {Promise} A Promise that resolves to an array of post objects returned by the server.
 */
export const getPostByUser = (username) => {
  const authToken = localStorage.getItem("authToken");
  const listPostUrl = `${domain}/post/${username}`;
  return fetch(listPostUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get post list");
    }
    return response.json();
  });
};

/**
 * Delete a post
 *
 * @param {string} postId - The ID of the post to be deleted.
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const deletePost = (postId) => {
  const authToken = localStorage.getItem("authToken");
  const deletePostUrl = `${domain}/post/${postId}`;
  return fetch(deletePostUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to delete post");
    }
  });
};

/**
 * Add a post
 *
 * @param {object} data - The data to be sent to the server.
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const addPost = (data) => {
  const authToken = localStorage.getItem("authToken");
  const bookStayUrl = `${domain}/post`;
  return fetch(bookStayUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to add post");
    }
  });
};

/**
 * Add an announcement
 *
 * @param {object} data - The data to be sent to the server.
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const addAnnouncement = (data) => {
  const authToken = localStorage.getItem("authToken");
  const addAnnouncementUrl = `${domain}/announcement`;
  return fetch(addAnnouncementUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to create announcement.");
    }
  });
};

/**
 * Get announcements by manager
 *
 * @returns {Promise} A Promise that resolves to an array of post objects returned by the server.
 */
export const getAnnouncementByManager = () => {
  const authToken = localStorage.getItem("authToken");
  const getAnnouncementByManagerUrl = `${domain}/announcement`;
  return fetch(getAnnouncementByManagerUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get post list");
    }
    return response.json();
  });
};

/**
 * Get all announcements - by tenant
 *
 * @returns {Promise} A Promise that resolves to an array of post objects returned by the server.
 */
export const getAllAnnouncements = () => {
  const authToken = localStorage.getItem("authToken");
  const getAllAnnouncementsUrl = `${domain}/announcements`;
  return fetch(getAllAnnouncementsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get announcement list.");
    }
    return response.json();
  });
};

/**
 * Delete an announcement
 *
 * @param {string} postId - The ID of the post to be deleted.
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const deleteAnnouncement = (postId) => {
  const authToken = localStorage.getItem("authToken");
  const deletePostUrl = `${domain}/announcement/${postId}`;
  return fetch(deletePostUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to delete post");
    }
  });
};

/**
 * Assign a apartment to a tenant
 *
 * @param {object} data - tenant name, apart number,
 * @returns {Promise} A promise that resolves with no value if the request is successful, or rejects with an error message if it fails.
 */
export const assignApart = (data) => {
  const authToken = localStorage.getItem("authToken");
  const assignUrl = `${domain}/assign`;
  return fetch(assignUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to assign apartment");
    }
  });
};
