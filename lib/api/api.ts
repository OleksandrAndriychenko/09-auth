import axios from 'axios'

export const nextServerApi = axios.create({
    baseURL: 'https://notehub-api.goit.study',
    withCredentials: true,
})

export interface SessionResponse {
    success: boolean
}