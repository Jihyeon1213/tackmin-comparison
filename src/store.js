import { create } from 'zustand';

export const useInputFormStore = create((set) => ({
  weight: "",
  isWeightAlertModalOpen: false,
  isVolumeAlertModalOpen: false,
  selectedCountry: "",
  isWeightover: false,
  width: "",
  height: "",
  length: "",
  landingPage: true,
  isNextCountry: false,
  isComparison: false,
  isNextWeightAndVolume: false,
  firstVolumeWeight: 0,
  secondVolumeWeight: 0,
  handlegoCountryInputClick: () => set({ landingPage: false, isNextCountry: true }),
  handleGoLandingPageClick: () => set({ landingPage: true, isNextWeightAndVolume: false, isNextCountry: false, weight: "" }),
  handleGoWeightInputClick: () => set({ isComparison: false, isNextWeightAndVolume: true, landingPage: false, isNextCountry: false }),
  handleWeightInputChange: (e) => {
    set({ weight: e.target.value })
  },
  handleWidthChange: (e) => {
    set({ width: e.target.value })
  },
  handleLengthChange: (e) => {
    set({ length: e.target.value })
  },
  handleHeightChange: (e) => {
    set({ height: e.target.value })
  },
  handleGoComparisonClick: (e) => {
    let inputArray = e.target.value.split(",");
    let weight = Number(inputArray[0]);
    let width = Number(inputArray[1]);
    let length = Number(inputArray[2]);
    let height = Number(inputArray[3]);

    if (!weight || !width || !length || !height) {
      set({ isWeightAlertModalOpen: true })
      set({ weight: "", width: "", length: "", height: "" })
    } else if (Number(inputArray[0]) > 20) {
      set({ isWeightover: true })
      set({ weight: "" })
    } else if (width > 150 || (length * 2 + height * 2) > 300) {
      set({ isVolumeAlertModalOpen: true })
    } else {
      set({ firstVolumeWeight: parseFloat((width * length * height / 6000).toFixed(1)) });
      set({ secondVolumeWeight: parseFloat((width * length * height / 5000).toFixed(1)) });
      set({ isComparison: true, landingPage: false, isNextWeightAndVolume: false })
    }
  },
  handlemodalCloseClick: () => set({ landingPage: false, isWeightAlertModalOpen: false, isNextCountry: false, isVolumeAlertModalOpen: false, isWeightover: false }),
  handleSelectedCountryChange: (e) => set({ selectedCountry: e.value }),
}));

export default useInputFormStore;
