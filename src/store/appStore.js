import create from "zustand";

const useStore = create((set) => ({
  darkMode: false,
  title: "TSLA",
  // watchListStocks: [],

  // updateStock: (newStock) => set({ stock: newStock }),

  updateTitle: (newTitle) => set({ title: newTitle }),

  setDark: () => {
    set((state) => ({ darkMode: !state.darkMode }));
  },
}));

export default useStore;
