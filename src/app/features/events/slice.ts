import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventsState, Poll, Raffle } from './types';

const initialState: EventsState = {
  polls: [
    {
      id: 'p1',
      question: 'Which storyline should we feature next?',
      options: [
        { id: 'o1', text: 'Romance' },
        { id: 'o2', text: 'Fantasy' },
        { id: 'o3', text: 'Mystery' },
      ],
      notice: 'Per submission, +1 point',
    },
  ],
  raffles: [
    {
      id: 'r1',
      title: 'Signed album giveaway',
      cost: 2,
      notice: 'Insert -2 points to enter. No limit raffle.',
    },
  ],
  results: ['Poll results will appear here soon.'],
  points: 10,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    votePoll(state, action: PayloadAction<{ pollId: string; optionId: string }>) {
      state.results.unshift(`You voted on poll ${action.payload.pollId}`);
      state.points += 1;
    },
    enterRaffle(state, action: PayloadAction<string>) {
      state.points = Math.max(0, state.points - 2);
      state.results.unshift(`Entered raffle ${action.payload}`);
    },
    addPoll(state, action: PayloadAction<Poll>) {
      state.polls.push(action.payload);
    },
    addRaffle(state, action: PayloadAction<Raffle>) {
      state.raffles.push(action.payload);
    },
  },
});

export const { votePoll, enterRaffle, addPoll, addRaffle } = eventsSlice.actions;
export default eventsSlice.reducer;
