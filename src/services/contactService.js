import axios from "axios";

export const SERVER_URL = 'http://localhost:5248/';
// دریافت همه مخاطبین
export const getAllContacts = async () => {
  try {
    const url = `${SERVER_URL}api/Contacts/GetContact`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
/// دریافت همه مخاطبین با شرط نام و نام خانوادگی   
export const getSearrchContacts = async (FullName) => {
  try {
    const searchParam = FullName.trim() === '' ? '' : FullName;
    console.log(searchParam);
    const url = `${SERVER_URL}api/Contacts/GetSearchContacts?FullName=${searchParam}`;
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
    const url = `${SERVER_URL}api/Contacts/FindContactID?ContactID=${id}`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// ایجاد مخاطب جدید
export const postContact = async (contact, onUploadProgress) => {
  try {
    const url = `${SERVER_URL}api/Contacts/InsertContact`;
    const response = await axios.post(url, contact, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onUploadProgress) {
          onUploadProgress(percentCompleted);
        }
      }
    });
    if (response.data !== "تصویر انتخاب نشده") {
      // window.location.href = "/contacts";
    }
    return response;

  } catch (err) {
    console.log(err);
    throw err;
  }
}

// ویرایش مخاطب
export const putContact = async (contact, oldPhoto, onUploadProgress) => {
  try {
    const url = `${SERVER_URL}api/Contacts/UpdateContact?OldPhoto=${oldPhoto}`;
    const response = await axios.put(url, contact, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onUploadProgress) {
          onUploadProgress(percentCompleted);
        }
      }
    });
    if (response.data !== "تصویر انتخاب نشده") {
    }
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// حذف مخاطب
export const deleteContact = async (contactId, oldPhoto) => {
  try {
    const url = `${SERVER_URL}api/Contacts/DeleteContact?ContactID=${contactId}&OldPhoto=${oldPhoto}`;
    const response = await axios.delete(url);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
// دریافت همه گروه‌ها
export const getAllGroups = async () => {
  try {
    const url = `${SERVER_URL}api/Groups/GetGroups`;
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
    const url = `${SERVER_URL}api/Jobs/GetJobs`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}