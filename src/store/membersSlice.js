import { createSlice } from '@reduxjs/toolkit';

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [
      {
        event: 'ostriv-muromec',
        generalData: {
          date: 1655203681000,
          restData: {
            id: 12,
            name: 'Yurii',
            email: 'yurii.markovskyi@gmail.com',
            phone: '+380958923309',
            soloKayaks: 1,
            doubleKayaks: 0,
            price: 730,
            notes: 'I need Tempest',
            isCompleted: false,
          },
        },
      },
      {
        event: 'sercem-kyjeva',
        generalData: {
          date: 1655203681000,
          restData: {
            id: 13,
            name: 'Yurii',
            email: 'sensysnoname@gmail.com',
            phone: '+380958923309',
            soloKayaks: 1,
            doubleKayaks: 0,
            price: 730,
            notes: 'I need Tempest',
            isCompleted: false,
          },
        },
      },
      {
        event: 'sercem-kyjeva',
        generalData: {
          date: 1655203681000,
          restData: {
            id: 14,
            name: 'Yurii',
            email: 'sensysnoname@gmail.com',
            phone: '+380958923309',
            soloKayaks: 1,
            doubleKayaks: 0,
            price: 730,
            notes: 'I need Tempestttt',
            isCompleted: false,
          },
        },
      },
    ],
  },
  reducers: {
    addMember(state, action) {
      state.members.push(action.payload);
    },
  },
});

export const { addMember } = membersSlice.actions;
export default membersSlice.reducer;
