import { createSlice } from '@reduxjs/toolkit';

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [
      {
        id: 1,
        event: 'ostriv-muromec',
        name: 'Yurii',
        email: 'yurii.markovskyi@gmail.com',
        phone: '0958923309',
        date: 1655203681000,
        singleKayaks: 1,
        doubleKayaks: 0,
        price: 730,
        notes: 'I need Tempest',
      },
      {
        id: 2,
        event: 'sercem-kyjeva',
        name: 'Yurii',
        email: 'yurii.markovskyi@gmail.com',
        phone: '0958923309',
        date: 1655203681000,
        singleKayaks: 1,
        doubleKayaks: 0,
        price: 730,
        notes: 'I need Tempest',
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
