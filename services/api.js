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

// ---------------------- Products -------------------- //
export const APIgetProduct = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/products`, data)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
export const APIgetProductDetail = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/product/${data}`)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
// ---------------------- Category -------------------- //
export const APIgetCategory = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/categories`)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
// ---------------------- Shop -------------------- //
export const APIgetShopDetail = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/shop/${data}`)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}

