import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInputFormStore from "../store";

function ServiceComparison() {
  const [rate, setRate] = useState([]);
  const [realWeight, setRealWeight] = useState("");
  const { volumeWeight, weight, selectedCountry } = useInputFormStore();
  const navigate = useNavigate();

  function handleGoMainPage() {
    navigate("/");
  }

  function adjustRealWeight(realWeight) {
    if (realWeight < 2) {
      for (let i = 0.5; i <= 2; i += 0.25) {
        if (realWeight < i) {
          return i - 0.25;
        }
      }
    } else {
      for (let i = 2; i <= 30; i += 0.5) {
        if (realWeight < i) {
          return i - 0.5;
        }
      }
    }
  }

  useEffect(() => {
    if (volumeWeight > weight) {
      setRealWeight(adjustRealWeight(volumeWeight));
    } else {
      setRealWeight(adjustRealWeight(weight));
    }
    if (realWeight && selectedCountry) {
      axios
        .get("/src/emsrate.json")
        .then((response) => setRate(response.data[realWeight][selectedCountry]))
        .catch((error) => console.log(error));
    }
  }, [volumeWeight, weight, selectedCountry, realWeight]);

  return (
    <>
      <Link to="/comparison"></Link>
      <div className="justify-self-center mt-6 ml- text-2xl">택배의 민족</div>
      <div className="ml-3 mt-5">비교 결과</div>
      <div className="text-gray-500 text-sm ml-3 mb-3">
        택민이가 꼼꼼하게 비교 분석한 결과입니다.
      </div>
      <div className="border-2">
        <div className="shadow-md border-2 rounded-lg w-96 h-28 justify-self-center p-2 grid grid-cols-3 gap-4 mt-10">
          <div className="col-start-1 col-end-3 ">
            국가: {selectedCountry}
            <br />
            요금: {rate}
            <br />
            환산 무게: {realWeight}kg
            <p className="text-gray-500 text-xs">
              무게 VS 부피중량((가로x세로x높이)÷6000)
            </p>
          </div>
          <div className="col-end-7 col-span-2">
            <img src="/src/emslogo.png" className="w-20 mb-3" />
            <button
              onClick={() =>
                (location.href =
                  "https://ems.epost.go.kr/front.SmEmsApply1100s.postal")
              }
              className="bg-black text-white text-sm p-2 rounded hover:bg-blue-600 bottom-3 right-3"
            >
              바로 가기
            </button>
          </div>
        </div>
        <div className="shadow-md border-2 rounded-lg w-96 h-28 m-4 justify-self-center p-5">
          리스트 카드
        </div>
        <div className="shadow-md border-2 rounded-lg w-96 h-28 m-4 justify-self-center p-5">
          리스트 카드
        </div>
      </div>
      <div className="flex justify-between mx-8 mt-10 mb-10">
        <button
          onClick={handleGoMainPage}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          👈 이전
        </button>
        <button
          value={weight}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          다음 👉
        </button>
      </div>
    </>
  );
}

export default ServiceComparison;
