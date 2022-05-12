import { createSlice } from '@reduxjs/toolkit';

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [
      {
        event: 'Острів Муромець',
        id: 1652334068000,
        date: 1655203681000,
        name: 'Yurii',
        email: 'yurii.markovskyi@gmail.com',
        phone: '+380958923309',
        soloKayaks: 1,
        doubleKayaks: 0,
        price: 730,
        notes: 'I need Tempest',
        isCompleted: false,
      },
      {
        event: 'Серцем Києва',
        id: 1652348468000,
        date: 1655203681000,
        name: 'Yurii',
        email: 'sensysnoname@gmail.com',
        phone: '+380958923309',
        soloKayaks: 1,
        doubleKayaks: 0,
        price: 730,
        notes: 'I need Tempest',
        isCompleted: false,
      },
      {
        event: 'Серцем Києва',
        id: 1652341268000,
        date: 1655203681000,
        name: 'Yurii',
        email: 'sensysnoname@gmail.com',
        phone: '+380958923309',
        soloKayaks: 1,
        doubleKayaks: 0,
        price: 730,
        notes: 'I need Tempestttt',
        isCompleted: false,
      },
    ],
  },
  reducers: {
    addMember(state, action) {
      state.members.push(action.payload);
    },
    completeMember: (state, action) => {
      const index = state.members.findIndex((item) => item.id === action.payload.id);
      state.members[index].data.isCompleted = !state.members[index].data.isCompleted;
    },
    removeMember: (state, action) => {
      // eslint-disable-next-line max-len
      state.members = state.members.map((el) => el.data.filter((item) => item.id !== action.payload));
    },
  },
});

export const { addMember, completeMember, removeMember } = membersSlice.actions;
export default membersSlice.reducer;
