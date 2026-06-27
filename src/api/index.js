import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Demo trader phone for testing — swap with real auth later
const DEMO_PHONE = '2349118963359'

export const getSales = () => axios.get(`${BASE_URL}/sales?phone=${DEMO_PHONE}`)
export const getInventory = () => axios.get(`${BASE_URL}/inventory?phone=${DEMO_PHONE}`)
export const getAlerts = () => axios.get(`${BASE_URL}/alerts?phone=${DEMO_PHONE}`)
export const getStats = () => axios.get(`${BASE_URL}/stats?phone=${DEMO_PHONE}`)