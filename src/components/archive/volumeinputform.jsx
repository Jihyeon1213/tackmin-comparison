import { useEffect, useState } from "react";
import useInputFormStore from "../../store";
import VolumeAlertModal from "../volumeAlertModal";

function VolumeInputForm() {
  const [inputVolume, setInputVolume] = useState("");
  const {
    handleGoWeightInputClick,
    isVolumeAlertModalOpen,
    handleGoComparisonClick,
  } = useInputFormStore();

  function handleInputVolumeChange(e) {
    setInputVolume(e.target.value);
  }

  useEffect(() => {
    console.log("isVolumeAlertModalOpen changed:", isVolumeAlertModalOpen);
  }, [isVolumeAlertModalOpen]);

  return (
    <>
      <div className="flex ml-10 mt-8 items-center">
        <div className="mt-6 text-6xl ml-32">
          택배<span className="text-3xl">의</span>민족
        </div>
        <img src="/src/taeckmin.png" className="w-24" />
      </div>
      <div className="justify-items-center">
        <div className="mt-10 text-3xl">택배의 부피를 알려주세요.</div>
        <img src="/src/volume.png" className="w-80"></img>
        <div className="mt-12">
          <input
            type="text"
            value={inputVolume}
            placeholder="10x30x40"
            onChange={(e) => handleInputVolumeChange(e)}
            className="text-3xl w-64 focus:outline-none border-b-8"
          ></input>
          <span className="text-3xl">Cm</span>
        </div>
        <div className="text-gray-400 justify-self-center">
          *가로x세로x높이 순서대로 입력해주세요
        </div>
      </div>
      {isVolumeAlertModalOpen && <VolumeAlertModal />}
      <div className="flex justify-between mx-8 mt-16 mb-16">
        <button
          onClick={handleGoWeightInputClick}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          👈 이전
        </button>
        <button
          onClick={handleGoComparisonClick}
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
