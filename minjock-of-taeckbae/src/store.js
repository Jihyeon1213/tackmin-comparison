import { create } from 'zustand';

export const useInputFormStore = create((set) => ({
  isComparisonButtonClick: false,
  moveQuestion: () => set({ isComparisonButtonClick: true }),
  handleGoLandingPageClick: () => set({ isComparisonButtonClick: false }),
  isNextVolume: false,
  handleNextToVolumeClick: (e) => {
    if (!Number(e.target.value)) {
      set({ isWeightAlertModalOpen: true })
      set({ weight: "" })
    } else {
      set({ isNextVolume: true, isComparisonButtonClick: false })
    }
  },
  handleGoWeightInputClick: () => set({ isNextVolume: false, isComparisonButtonClick: true }),
  handleGoCountryInputClick: (e) => {
    let volumeArray;
    let volumeInput = e.target.value;
    if (!volumeInput || !volumeInput.includes("x") && !volumeInput.includes(",")) {
      set({ isVolumeAlertModalOpen: true })
    } else {
      if (volumeInput.includes("x")) {
        volumeArray = [...e.target.value.split("x")]
      } else if (volumeInput.includes(",")) {
        volumeArray = [...e.target.value.split(",")]
      }
      set({ volumeWeight: (Number(volumeArray[0]) * Number(volumeArray[1]) * Number(volumeArray[2]) / 6000) })
      set({ isNextCountry: true, isNextVolume: false })
    }
  }
  ,
  handleGoVolumeInputClick: () => set({ isNextCountry: false, isNextVolume: true }),
  weight: "",
  isWeightAlertModalOpen: false,
  isVolumeAlertModalOpen: false,
  handleWeightInputChange: (e) => {
    set({ weight: e.target.value })
  },
  handlemodalCloseClick: () => set({ isWeightAlertModalOpen: false, isVolumeAlertModalOpen: false }),
  volumeWeight: "",
  selectedCountry: "",
  handleSelectedCountryChange: (e) => set({ selectedCountry: e.value }),
}));

export default useInputFormStore;
