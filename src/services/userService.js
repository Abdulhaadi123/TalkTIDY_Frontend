// src/services/userService.js
import axios from './api';

export const getAllUsers = () => axios.get('/users');
