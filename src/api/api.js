import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

// User APIs
export const createUser = (userData) => API.post('/users', userData);
export const loginUser = (email, password) =>
  API.get(`/users?email=${email}&password=${password}`);

// Service APIs
export const getServices = () => API.get('/services');
export const createService = (serviceData) => API.post('/services', serviceData);

// Booking APIs
export const getBookings = () => API.get('/bookings');
export const createBooking = (bookingData) => API.post('/bookings', bookingData);
