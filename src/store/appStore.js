import create from "zustand";

const useStore = create((set) => ({
  title: "TSLA",

  updateTitle: (newTitle) => set({ title: newTitle }),
}));

export default useStore;
