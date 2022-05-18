import { createSlice } from '@reduxjs/toolkit';

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: {
    registrations: [
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
        soloKayaks: 1,
        doubleKayaks: 0,
        amount: 730,
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
        soloKayaks: 1,
        doubleKayaks: 0,
        amount: 730,
        notes: 'I need Tempest',
        isCompleted: false,
      },
    ],
  },
  reducers: {
    addCustomer(state, action) {
      state.registrations.push(action.payload);
    },
    completeRegistration: (state, action) => {
      const index = state.members.findIndex((item) => item.id === action.payload.id);

      state.members[index].isCompleted = !state.members[index].isCompleted;
    },
  },
});

export const { addCustomer, completeRegistration } = registrationsSlice.actions;

export default registrationsSlice.reducer;
