import useInputFormStore from "../store";
import VolumeAlertModal from "./volumeAlertModal";
import WeightAlertModal from "./weightAlertModal";
import WeightOverModal from "./weightOverModal";

function WeightAndVolumeInputForm() {
  const {
    isWeightAlertModalOpen,
    handleWeightInputChange,
    isWeightover,
    handlegoCountryInputClick,
    isVolumeAlertModalOpen,
    handleGoComparisonClick,
    weight,
    width,
    height,
    length,
    handleWidthChange,
    handleLengthChange,
    handleHeightChange,
    handleGoLandingPageClick,
  } = useInputFormStore();

  return (
    <>
      <div className="relative text-gray-800 w-96 h-[90vh] sm:w-[28rem] md:w-[36rem] lg:w-[42rem] p-8 rounded-lg shadow-2xl flex flex-col items-center justify-center">
        <button
          onClick={handlegoCountryInputClick}
          className="absolute top-2 left-2 bg-gray-800 text-white text-sm p-1 rounded hover:bg-blue-600 flex items-center"
        >
          국가 수정하기
        </button>
        <div className="container flex flex-col items-center mt-8 w-full">
          <div className="flex items-center">
            <div
              className="text-6xl hover:text-blue-600 cursor-pointer"
              onClick={handleGoLandingPageClick}
            >
              택배<span className="text-5xl">의</span> 민족
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="text-2xl">택배의 무게와 부피를 알려주세요.</div>
            <div className="mt-12">
              <input
                type="text"
                value={weight}
                placeholder="10"
                onChange={handleWeightInputChange}
                className="text-4xl w-24 text-center border-b-8 focus:outline-none"
              />
              <span className="text-3xl ml-2">Kg</span>
            </div>
          </div>
          {isWeightAlertModalOpen && <WeightAlertModal />}
          {isWeightover && <WeightOverModal />}
          <div className="mt-6 text-center">
            <div className="flex items-start justify-center ">
              <div className="mt-12 animate-slideInfromLeft w-80">
                <img src="/volume.png" alt="택배상자" />
              </div>
              <div className="flex flex-col ml-8 space-y-4 mt-12">
                <div className="flex items-center">
                  <label className="text-lg font-semibold mr-4">
                    가로 (cm):
                  </label>
                  <input
                    type="text"
                    placeholder="가로"
                    onChange={handleWidthChange}
                    value={width}
                    className="w-32 border-b-2 text-center focus:outline-none text-lg"
                  />
                </div>
                <div className="flex items-center">
                  <label className="text-lg font-semibold mr-4">
                    세로 (cm):
                  </label>
                  <input
                    type="text"
                    placeholder="세로"
                    onChange={handleLengthChange}
                    value={length}
                    className="w-32 border-b-2 text-center focus:outline-none text-lg"
                  />
                </div>
                <div className="flex items-center">
                  <label className="text-lg font-semibold mr-4">
                    높이 (cm):
                  </label>
                  <input
                    type="text"
                    placeholder="높이"
                    onChange={handleHeightChange}
                    value={height}
                    className="w-32 border-b-2 text-center focus:outline-none text-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          {isVolumeAlertModalOpen && <VolumeAlertModal />}
          <div
            className={`mt-12 transition-opacity duration-1500 ${
              weight && width && length && height ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={handleGoComparisonClick}
              value={`${weight}, ${width}, ${length}, ${height}`}
              className="bg-blue-600 text-white text-3xl p-4 rounded-lg hover:bg-blue-700 transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              가격 비교하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeightAndVolumeInputForm;
