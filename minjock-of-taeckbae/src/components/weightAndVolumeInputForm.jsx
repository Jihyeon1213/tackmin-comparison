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
  } = useInputFormStore();

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <div className="flex items-center">
          <div className="text-3xl sm:text-4xl font-bold ml-6">
            택배<span className="text-xl sm:text-2xl">의</span> 민족
          </div>
          <img src="/src/taeckmin.png" className="w-16 sm:w-24 ml-4" />
        </div>
        <div className="mt-8 text-center">
          <div className="text-xl">택배의 무게와 부피를 알려주세요.</div>
          <div className="mt-4">
            <input
              type="text"
              value={weight}
              placeholder="10"
              onChange={handleWeightInputChange}
              className="text-2xl sm:text-3xl w-20 sm:w-24 text-center border-b-4 focus:outline-none"
            />
            <span className="text-xl sm:text-3xl ml-2">Kg</span>
          </div>
        </div>
        {isWeightAlertModalOpen && <WeightAlertModal />}
        {isWeightover && <WeightOverModal />}
        <div className="mt-12 text-center">
          <div className="flex items-start justify-center mt-8">
            <img src="/src/volume.png" alt="택배 박스" className="w-72" />
            <div className="flex flex-col ml-8 space-y-4 mt-8">
              <div className="flex items-center">
                <label className="text-lg font-semibold mr-4">가로 (cm):</label>
                <input
                  type="text"
                  placeholder="가로"
                  onChange={handleWidthChange}
                  value={width}
                  className="w-32 border-b-2 text-center focus:outline-none text-lg"
                />
              </div>
              <div className="flex items-center">
                <label className="text-lg font-semibold mr-4">세로 (cm):</label>
                <input
                  type="text"
                  placeholder="세로"
                  onChange={handleLengthChange}
                  value={length}
                  className="w-32 border-b-2 text-center focus:outline-none text-lg"
                />
              </div>
              <div className="flex items-center">
                <label className="text-lg font-semibold mr-4">높이 (cm):</label>
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
        <div className="flex justify-between w-full max-w-md mt-12 mb-8 px-4">
          <button
            onClick={handlegoCountryInputClick}
            className="bg-black text-white text-xl sm:text-2xl p-2 w-28 rounded hover:bg-blue-600"
          >
            👈 이전
          </button>
          <button
            onClick={handleGoComparisonClick}
            value={`${weight}, ${width}, ${length}, ${height}`}
            className="bg-black text-white text-xl sm:text-2xl p-2 w-28 rounded hover:bg-blue-600"
          >
            다음 👉
          </button>
        </div>
      </div>
    </>
  );
}

export default WeightAndVolumeInputForm;
