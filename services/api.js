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
    try {
        const res = await axios.get(`${BASE_API_URL}/api/products`, { params: {
            limit:data.limit,
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
    const key = localStorage.getItem('_key')
    if(storage){
        axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`
    }
    try {
        const res = await axios.post(`${BASE_API_URL}/api/cart`,data[0])
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
export const APIupdateCart = async (data,id) => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    const key = localStorage.getItem('_key')
    if(storage){
        axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`
    }
    try {
        const res = await axios.put(`${BASE_API_URL}/api/cart/${id}`,data)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
export const APIdeleteCart = async (id) => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    const key = localStorage.getItem('_key')
    let param = {}
    if(storage){
        axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`
    }
    try {
        const res = await axios.delete(`${BASE_API_URL}/api/cart/${id}`,
            { 
                params: { key:key} 
            })
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
export const APIgetCart = async () => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    const key = localStorage.getItem('_key')
    if(storage){
        axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`
    }
    try {
        const res = await axios.get(`${BASE_API_URL}/api/cart`)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
export const APIgetCartList = async () => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    const key = localStorage.getItem('_key')
    if(storage){
        axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`
    }
    try {
        const res = await axios.get(`${BASE_API_URL}/api/cart-list`)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
export const APIcheckout = async (data) => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    if(storage){
        axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`
    }
    try {
        const res = await axios.post(`${BASE_API_URL}/api/checkout`,data)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
export const APIcheckoutDetail = async (data) => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    if(storage){
        axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`
    }
    try {
        const res = await axios.post(`${BASE_API_URL}/api/checkout/detail`,data)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
// ---------------------- Address -------------------- //
export const APIgetAddress = async (data) => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`
    try {
        const res = await axios.get(`${BASE_API_URL}/api/address`)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
export const APIaddAddress = async (data) => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`
    try {
        const res = await axios.post(`${BASE_API_URL}/api/address`,data)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}
export const APIupdateAddress = async (data,id) => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    axios.defaults.headers.common['Authorization'] = `Bearer ${storage.api_token}`
    try {
        const res = await axios.put(`${BASE_API_URL}/api/address/${id}`,data)
        return await res.data
    } catch (err) {
        console.log(`err`, err)
        return err
    }
}