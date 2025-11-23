import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KlazaSearchItem } from '../../../services/klazaApi';
import { RootState } from '../../../store';

interface LoungeState {
  items: KlazaSearchItem[];
  page: number;
  hasNext: boolean;
  isLoading: boolean;
}

const initialState: LoungeState = {
  items: [],
  page: 0,
  hasNext: true,
  isLoading: false,
};

const mergeItems = (current: KlazaSearchItem[], incoming: KlazaSearchItem[]) => {
  const map = new Map(current.map((item) => [`${item.contentId}-${item.klazaId}`, item] as const));
  incoming.forEach((item) => {
    map.set(`${item.contentId}-${item.klazaId}`, item);
  });
  return Array.from(map.values()).sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));
};

const loungeSlice = createSlice({
  name: 'lounge',
  initialState,
  reducers: {
    resetFeed() {
      return initialState;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    finishLoading(state) {
      state.isLoading = false;
    },
    setPageData(
      state,
      action: PayloadAction<{ items: KlazaSearchItem[]; page: number; hasNext: boolean; reset?: boolean }>,
    ) {
      const { items, page, hasNext, reset } = action.payload;
      state.items = reset ? items : mergeItems(state.items, items);
      state.page = page;
      state.hasNext = hasNext;
      state.isLoading = false;
    },
    setItems(state, action: PayloadAction<KlazaSearchItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { resetFeed, startLoading, finishLoading, setPageData, setItems } = loungeSlice.actions;
export default loungeSlice.reducer;

export const selectLoungeItems = (state: RootState) => state.lounge.items;
export const selectLoungeState = (state: RootState) => state.lounge;
export const selectLoungeByContentId = (contentId: number, klazaId?: number) => (state: RootState) =>
  state.lounge.items.find((item) => item.contentId === contentId && (klazaId ? item.klazaId === klazaId : true));
