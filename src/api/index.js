import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const getSales = () => axios.get(`${BASE_URL}/sales`)
export const getInventory = () => axios.get(`${BASE_URL}/inventory`)
export const getAlerts = () => axios.get(`${BASE_URL}/alerts`)
export const getStats = () => axios.get(`${BASE_URL}/stats`)