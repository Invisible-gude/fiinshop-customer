const BASE_API_URL = process.env.USER_API
import axios from 'axios'

// ---------------------- Authorization -------------------- //
export const APIRegister = async (data) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/register`, data)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
export const APILogin = async (data) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/login`, data)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}