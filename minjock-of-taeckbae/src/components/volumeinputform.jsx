import { useState } from "react";
import useInputFormStore from "../store";
import VolumeAlertModal from "./volumeAlertModal";
function VolumeInputForm() {
  const [inputVolume, setInputVolume] = useState("");
  const {
    handleGoWeightInputClick,
    handleGoCountryInputClick,
    isVolumeAlertModalOpen,
  } = useInputFormStore();

  function handleInputVolumeChange(e) {
    setInputVolume(e.target.value);
  }

  return (
    <>
      <div className="justify-items-center">
        <div className="mt-32 text-3xl">택배의 부피를 알려주세요.</div>
        <div className="mt-12">
          <input
            type="text"
            value={inputVolume}
            placeholder="10x30x40"
            onChange={(e) => handleInputVolumeChange(e)}
            className="text-3xl w-40 focus:outline-none border-b-8"
          ></input>
          <span className="text-3xl">Cm</span>
        </div>
        <div className="text-gray-400 justify-self-center">
          *가로x세로x높이 순서대로 입력해주세요
        </div>
      </div>
      {isVolumeAlertModalOpen && <VolumeAlertModal />}
      <div className="flex justify-between mx-8 mt-24 mb-16">
        <button
          onClick={handleGoWeightInputClick}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          👈 이전
        </button>
        <button
          onClick={handleGoCountryInputClick}
          value={inputVolume}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          다음 👉
        </button>
      </div>
    </>
  );
}

export default VolumeInputForm;
