import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import saveContacts from 'db/contacts';

const phonebookSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: saveContacts,
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      state.items.splice(0, 0, action.payload);
    },
    deleteContact(state, action) {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const persistedReducer = persistReducer(
  persistConfig,
  phonebookSlice.reducer
);
export const { addContact, deleteContact, setFilter } = phonebookSlice.actions;
