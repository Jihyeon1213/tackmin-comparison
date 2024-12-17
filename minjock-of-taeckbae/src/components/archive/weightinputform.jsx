import useInputFormStore from "../../store";
import WeightAlertModal from "../weightAlertModal";
import WeightOverModal from "../weightOverModal";

function WeightInputForm() {
  const {
    weight,
    handleWeightInputChange,
    handleNextToVolumeClick,
    handleGoLandingPageClick,
    isWeightAlertModalOpen,
    isWeightover,
  } = useInputFormStore();

  return (
    <>
      <div className="flex ml-10 mt-8 items-center">
        <div className="mt-6 text-6xl ml-28">
          택배<span className="text-5xl">의</span>민족
        </div>
        <img src="/src/taeckmin.png" className="w-24" />
      </div>
      <div className="justify-items-center">
        <div className=" mt-32 text-3xl">택배의 무게를 알려주세요.</div>
        <div className="mt-12">
          <input
            type="text"
            value={weight}
            placeholder="20"
            onChange={handleWeightInputChange}
            className="text-4xl w-24 focus:outline-none border-b-8"
          ></input>{" "}
          <span className="text-3xl">Kg</span>
        </div>
      </div>
      {isWeightAlertModalOpen && <WeightAlertModal />}
      {isWeightover && <WeightOverModal />}
      <div className="flex justify-between mx-8 mt-28 mb-16">
        <button
          onClick={handleGoLandingPageClick}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          👈 이전
        </button>
        <button
          onClick={handleNextToVolumeClick}
          value={weight}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          다음 👉
        </button>
      </div>
    </>
  );
}

export default WeightInputForm;
