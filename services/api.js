const BASE_API_URL = process.env.USER_API
import { offset } from '@popperjs/core'
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
    const storage = JSON.parse(localStorage.getItem('_user'))
    axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`

    try {
        const res = await axios.get(`${BASE_API_URL}/api/products`, { params: {
            limit:data,
          }})
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
export const APIgetProductSearch = async (limit,offset,keyword) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/products`,{ params: {
            limit:limit,
            offset:offset,
            keyword:keyword
          }})
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
// ---------------------- Cart -------------------- //
export const APIaddToCart = async (data) => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`
    try {
        const res = await axios.post(`${BASE_API_URL}/api/cart`,data)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
