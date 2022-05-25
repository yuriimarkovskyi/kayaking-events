import { createSlice } from '@reduxjs/toolkit';

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: [
    {
      id: 1652511115000,
      eventName: 'Острів Муромець',
      registrationTime: 1652511115000,
      eventDate: 1655203681000,
      customerName: 'Марковський Юрій Володимирович',
      customerEmail: 'yurii.markovskyi@gmail.com',
      customerPhone: '+380958923309',
      soloKayaks: 1,
      doubleKayaks: 0,
      isChildren: false,
      childrenAmount: 0,
      amount: 730,
      notes: 'I need Tempest',
      isCompleted: false,
    },
    {
      id: 1652503915000,
      eventName: 'Серцем Києва',
      registrationTime: 1652503915000,
      eventDate: 1655203681000,
      customerName: 'Марковський Юрій Володимирович',
      customerEmail: 'sensysnoname@gmail.com',
      customerPhone: '+380958923309',
      soloKayaks: 1,
      doubleKayaks: 0,
      isChildren: false,
      childrenAmount: 0,
      amount: 730,
      notes: 'I need Tempest',
      isCompleted: false,
    },
    {
      id: 1652619104000,
      eventName: 'Серцем Києва',
      registrationTime: 1652619104000,
      eventDate: 1655203681000,
      customerName: 'Марковський Юрій Володимирович',
      customerEmail: 'sensysnoname@gmail.com',
      customerPhone: '+380958923309',
      soloKayaks: 0,
      doubleKayaks: 1,
      isChildren: true,
      childrenAmount: 1,
      amount: 1425,
      notes: 'I need Tempest',
      isCompleted: false,
    },
    {
      id: 1652619104200,
      eventName: 'Серцем Києва',
      registrationTime: 1652619104200,
      eventDate: 1655203681000,
      customerName: 'Марковський Юрій Володимирович',
      customerEmail: 'sensysnoname@gmail.com',
      customerPhone: '+380958923309',
      soloKayaks: 0,
      doubleKayaks: 1,
      isChildren: true,
      childrenAmount: 1,
      amount: 1425,
      notes: 'I need Tempest',
      isCompleted: true,
    },
  ],
  reducers: {
    addCustomer(state, action) {
      state.push(action.payload);
    },
    completeRegistration: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);

      state[index].isCompleted = !state[index].isCompleted;
    },
  },
});

export const { addCustomer, completeRegistration } = registrationsSlice.actions;

export default registrationsSlice.reducer;
