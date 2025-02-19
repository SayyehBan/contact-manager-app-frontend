import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => { },
  contact: {},
  setContact: () => { },
  contacts: [],
  filteredContacts: [],
  contactQuery: {},
  groups: [],
  jobs: [],
  onContactChange: () => { },
  deleteContact: () => { },
  updateContact: () => { },
  createContact: () => { },
  contactSearch: () => { },
});
