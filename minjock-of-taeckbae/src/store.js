import { create } from 'zustand';

export const useUserStore = create((set) => ({
  weight: "",
  handleWeightInputChange: (e) => set({ weight: e.target.value }),
}));

export default useUserStore;
