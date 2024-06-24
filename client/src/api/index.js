import axios from "axios";

const API = axios.create({
  baseURL: "https://fitness-ukb3.onrender.com/api/",
  headers: {
    'Content-Type': 'application/json',
  }
});

export const UserSignUp = async (data) => {
  try {
    const response = await API.post("/user/signup", data);
    return response.data;
  } catch (error) {
    console.error("Error signing up", error);
    throw error;
  }
};

export const UserSignIn = async (data) => {
  try {
    const response = await API.post("/user/signin", data);
    return response.data;
  } catch (error) {
    console.error("Error signing in", error);
    throw error;
  }
};

export const getDashboardDetails = async (token) => {
  try {
    const response = await API.get("/user/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard details", error);
    throw error;
  }
};

export const getWorkouts = async (token, date) => {
  try {
    const response = await API.get(`/user/workout${date}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts", error);
    throw error;
  }
};

export const addWorkout = async (token, data) => {
  try {
    const response = await API.post(`/user/workout`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding workout", error);
    throw error;
  }
};
