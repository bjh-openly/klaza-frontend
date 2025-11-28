import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KlazaPostListItem } from '../../../services/klazaApi';
import { RootState } from '../../../store';

interface LoungeState {
  items: KlazaPostListItem[];
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

const mergeItems = (current: KlazaPostListItem[], incoming: KlazaPostListItem[]) => {
  const map = new Map(current.map((item) => [`${item.contentId}-${item.klazaId}`, item] as const));
  incoming.forEach((item) => {
    map.set(`${item.contentId}-${item.klazaId}`, item);
  });
  return Array.from(map.values()).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    const aDate = a.publishAt ?? a.createdAt;
    const bDate = b.publishAt ?? b.createdAt;
    return bDate.localeCompare(aDate);
  });
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
      action: PayloadAction<{ items: KlazaPostListItem[]; page: number; hasNext: boolean; reset?: boolean }>,
    ) {
      const { items, page, hasNext, reset } = action.payload;
      state.items = reset ? items : mergeItems(state.items, items);
      state.page = page;
      state.hasNext = hasNext;
      state.isLoading = false;
    },
    setItems(state, action: PayloadAction<KlazaPostListItem[]>) {
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
