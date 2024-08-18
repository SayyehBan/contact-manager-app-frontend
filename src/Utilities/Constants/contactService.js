import axios from "axios";

export const BASE_URL = 'https://localhost:44356/';
export const getAllContacts = () => {
    const url = `${BASE_URL}api/Contacts/GetContact`;
    return axios.get(url);
}
export const getContact = (id) => {
    const url = `${BASE_URL}api/Contacts/FindContactID?ContactID=${id}`;
    return axios.get(url);
}
export const postContact = (contact) => {
    const url = `${BASE_URL}api/Contacts/InsertContact`;
    return axios.post(url, contact);
}
export const putContact = (contact) => {
    const url = `${BASE_URL}api/Contacts/UpdateContact`;
    return axios.put(url, contact);
}
export const deleteContact = (id) => {
    const url = `${BASE_URL}api/Contacts/DeleteContact`;
    return axios.delete(url, id);
}

export const getAllGroups = () => {
    const url = `${BASE_URL}api/Groups/GetGroups`;
    return axios.get(url);
}
export const getAllJobs = () => {
    const url = `${BASE_URL}api/Jobs/GetJobs`;
    return axios.get(url);
}