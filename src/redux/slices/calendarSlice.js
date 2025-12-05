import { createSlice } from '@reduxjs/toolkit';
import calendarData from '../../data/calendarData.json';

const initialState = {
  calendarData: calendarData,
  selectedDate: null,
  showModal: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.selectedDate = null;
    },
  },
});

export const { setSelectedDate, setShowModal, closeModal } = calendarSlice.actions;
export default calendarSlice.reducer;
