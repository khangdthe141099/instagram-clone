import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
const TOKEN = ""

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
})  