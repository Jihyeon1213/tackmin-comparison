import { create } from 'zustand';

export const useInputFormStore = create((set) => ({
  isComparisonButtonClick: false,
  moveQuestion: () => set({ isComparisonButtonClick: true }),
  handleGoLandingPageClick: () => set({ isComparisonButtonClick: false }),
  isNextVolume: false,
  handleNextToVolumeClick: () => set({ isNextVolume: true, isComparisonButtonClick: false }),
  handleGoWeightInputClick: () => set({ isNextVolume: false, isComparisonButtonClick: true }),
  weight: "",
  handleWeightInputChange: (e) => set({ weight: e.target.value }),
  volumeWeight: "",
}));

export default useInputFormStore;
