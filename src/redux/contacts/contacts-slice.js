import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: [],
  reducers: {
    addContact: {
      reducer: (state, { payload }) => {
        return [...state, payload];
      },
      prepare: (data) => {
        return {
          payload: {
            id: nanoid(),
            ...data,
          },
        };
      },
    },

    deleteContact: (state, { payload }) => {
      return state.filter(({ id }) => id !== payload);
    },

    updatedContacts: (state, { payload }) => {
      const { id, number } = payload;
      const contactToUpdate = state.find((contact) => contact.id === id);
      if (contactToUpdate) {
        contactToUpdate.number = number;
      }
    },
  },
});

export const { addContact, deleteContact, updatedContacts } =
  contactsSlice.actions;
export default contactsSlice.reducer;
