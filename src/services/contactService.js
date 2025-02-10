import axios from "axios";

// آدرس پایه API
export const BASE_URL = 'http://localhost:5248/';

// دریافت همه مخاطبین
export const getAllContacts = async () => {
    try {
        const url = `${BASE_URL}api/Contacts/GetContact`;
        const response = await axios.get(url);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// دریافت یک مخاطب با شناسه
export const getContact = async (id) => {
    try {
        const url = `${BASE_URL}api/Contacts/FindContactID?ContactID=${id}`;
        const response = await axios.get(url);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// ایجاد مخاطب جدید
export const postContact = async (contact) => {
    try {
        const url = `${BASE_URL}api/Contacts/InsertContact`;
        const response = await axios.post(url, contact);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// ویرایش مخاطب
export const putContact = async (contact) => {
    try {
        const url = `${BASE_URL}api/Contacts/UpdateContact`;
        const response = await axios.put(url, contact);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// حذف مخاطب
export const deleteContact = async (id) => {
    try {
        const url = `${BASE_URL}api/Contacts/DeleteContact`;
        const response = await axios.delete(url, id);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// دریافت همه گروه‌ها
export const getAllGroups = async () => {
    try {
        const url = `${BASE_URL}api/Groups/GetGroups`;
        const response = await axios.get(url);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// دریافت همه شغل‌ها
export const getAllJobs = async () => {
    try {
        const url = `${BASE_URL}api/Jobs/GetJobs`;
        const response = await axios.get(url);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}