import useInputFormStore from "../store";

function WeightInputForm() {
  const {
    weight,
    handleWeightInputChange,
    handleNextToVolumeClick,
    handleGoLandingPageClick,
  } = useInputFormStore();

  return (
    <>
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
      <div className="flex justify-between mx-8 mt-28 mb-16">
        <button
          onClick={handleGoLandingPageClick}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          👈 이전
        </button>
        <button
          onClick={handleNextToVolumeClick}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          다음 👉
        </button>
      </div>
    </>
  );
}

export default WeightInputForm;
