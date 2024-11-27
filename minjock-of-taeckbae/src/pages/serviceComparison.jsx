import axios from "axios";
import { useEffect, useState } from "react";
import useInputFormStore from "../store";

function ServiceComparison() {
  const [emsRate, setEmsRate] = useState(0);
  const [UpsRate, setUpsRate] = useState(0);
  const [SfRate, setSfRate] = useState(0);
  const [dhlRate, setDhlRate] = useState(0);
  const [realWeight, setRealWeight] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const {
    weight,
    selectedCountry,
    handleGoLandingPageClick,
    width,
    length,
    height,
    firstVolumeWeight,
    secondVolumeWeight,
    handleGoWeightInputClick,
  } = useInputFormStore();

  useEffect(() => {
    let emsWeight = Math.max(weight, firstVolumeWeight);
    let sfWeight = Math.max(weight, secondVolumeWeight);
    let dhlWeight = Math.max(weight, secondVolumeWeight);
    let upsWeight = Math.max(weight, firstVolumeWeight);

    setRealWeight({
      ems: emsWeight,
      sf: sfWeight,
      dhl: dhlWeight,
      ups: upsWeight,
    });
  }, [weight, firstVolumeWeight, secondVolumeWeight]);

  useEffect(() => {
    if (realWeight && selectedCountry) {
      setIsLoading(true);
      axios
        .get("/src/emsrate.json")
        .then((response) => {
          const rate = response.data[realWeight.ems][selectedCountry];
          const formattedRate = rate.toLocaleString();

          setEmsRate(formattedRate);
        })
        .catch((error) => console.log(error));

      axios
        .post("http://127.0.0.1:5001/scrape_ups", {
          countryCode: selectedCountry,
          weight: weight,
          width: width,
          length: length,
          height: height,
        })
        .then((response) => {
          const modifiedData = response.data.slice(0, -1);
          setUpsRate(modifiedData);
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .post("http://127.0.0.1:5000/scrape", {
          countryCode: selectedCountry,
          weight: realWeight.dhl,
        })
        .then((response) => {
          setDhlRate(response.data["DHL"]);
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .post("http://127.0.0.1:5000/scrape", {
          countryCode: selectedCountry,
          weight: realWeight.sf,
        })
        .then((response) => {
          setSfRate(response.data["SF"]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [realWeight]);

  function Checkcheeprate() {
    let rateList = [UpsRate, emsRate, SfRate, dhlRate];

    rateList.sort(function (a, b) {
      return a - b;
    });
    return rateList;
  }

  function match() {
    let rateList = [UpsRate, emsRate, SfRate, dhlRate];
    const result = {
      firstImage: "",
      secondImage: "",
      thirdImage: "",
      forthImage: "",
      firstVolumeInfo: "",
      secondVolumeInfo: "",
      thirdVolumeInfo: "",
      forthVolumeInfo: "",
      firstVolumeValue: "",
      secondVolumeValue: "",
      thirdVolumeValue: "",
      forthVolumeValue: "",
      firstWeight: "",
      secondWeight: "",
      thirdWeight: "",
      forthWeight: "",
    };

    for (let i = 0; i < rateList.length; i++) {
      if (Checkcheeprate()[0] === rateList[i]) {
        if (rateList[i] === emsRate) {
          result.firstImage = "/src/emslogo.png";
          result.firstVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.firstVolumeValue = firstVolumeWeight;
          result.firstWeight = realWeight.ems;
        } else if (rateList[i] === UpsRate) {
          result.firstImage = "/src/upslogo.png";
          result.firstVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.firstVolumeValue = firstVolumeWeight;
          result.firstWeight = realWeight.ups;
        } else if (rateList[i] === SfRate) {
          result.firstImage = "/src/sflogo.png";
          result.firstVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.firstWeight = realWeight.sf;
          result.firstVolumeValue = secondVolumeWeight;
        } else if (rateList[i] === dhlRate) {
          result.firstImage = "/src/dhllogo.png";
          result.firstVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.firstVolumeValue = secondVolumeWeight;
          result.firstWeight = realWeight.dhl;
        }
      }
      if (Checkcheeprate()[1] === rateList[i]) {
        if (rateList[i] === emsRate) {
          result.secondImage = "/src/emslogo.png";
          result.secondVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.secondVolumeValue = firstVolumeWeight;
          result.secondWeight = realWeight.ems;
        } else if (rateList[i] === UpsRate) {
          result.secondImage = "/src/upslogo.png";
          result.secondVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.secondVolumeValue = firstVolumeWeight;
          result.secondWeight = realWeight.ups;
        } else if (rateList[i] === SfRate) {
          result.secondImage = "/src/sflogo.png";
          result.secondVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.secondVolumeValue = secondVolumeWeight;
          result.secondWeight = realWeight.sf;
        } else if (rateList[i] === dhlRate) {
          result.secondImage = "/src/dhllogo.png";
          result.secondVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.secondVolumeValue = secondVolumeWeight;
          result.secondWeight = realWeight.dhl;
        }
      }
      if (Checkcheeprate()[2] === rateList[i]) {
        if (rateList[i] === emsRate) {
          result.thirdImage = "/src/emslogo.png";
          result.thirdVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.thirdVolumeValue = firstVolumeWeight;
          result.thirdWeight = realWeight.ems;
        } else if (rateList[i] === UpsRate) {
          result.thirdImage = "/src/upslogo.png";
          result.thirdVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.thirdVolumeValue = firstVolumeWeight;
          result.thirdWeight = realWeight.ups;
        } else if (rateList[i] === SfRate) {
          result.thirdImage = "/src/sflogo.png";
          result.thirdVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.thirdVolumeValue = secondVolumeWeight;
          result.thirdWeight = realWeight.sf;
        } else if (rateList[i] === dhlRate) {
          result.thirdImage = "/src/dhllogo.png";
          result.thirdVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.thirdVolumeValue = secondVolumeWeight;
          result.thirdWeight = realWeight.dhl;
        }
      }
      if (Checkcheeprate()[3] === rateList[i]) {
        if (rateList[i] === emsRate) {
          result.forthImage = "/src/emslogo.png";
          result.forthVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.forthVolumeValue = firstVolumeWeight;
          result.forthWeight = realWeight.ems;
        } else if (rateList[i] === UpsRate) {
          result.forthImage = "/src/upslogo.png";
          result.forthVolumeValue = "(가로x세로x높이) ➗ 6000";
          result.forthVolumeValue = firstVolumeWeight;
          result.forthWeight = realWeight.ups;
        } else if (rateList[i] === SfRate) {
          result.forthImage = "/src/sflogo.png";
          result.forthVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.forthVolumeValue = secondVolumeWeight;
          result.forthWeight = realWeight.sf;
        } else if (rateList[i] === dhlRate) {
          result.forthImage = "/src/dhllogo.png";
          result.forthVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.forthVolumeValue = secondVolumeWeight;
          result.forthWeight = realWeight.dhl;
        }
      }
    }
    return result;
  }

  const cardArray = [
    {
      country: selectedCountry,
      rate: Checkcheeprate()[0],
      weight: match().firstWeight,
      image: match().firstImage,
      volumeInfo: match().firstVolumeInfo,
      volumeValue: match().firstVolumeValue,
    },
    {
      country: selectedCountry,
      rate: Checkcheeprate()[1],
      weight: match().secondWeight,
      image: match().secondImage,
      volumeInfo: match().secondVolumeInfo,
      volumeValue: match().secondVolumeValue,
    },
    {
      country: selectedCountry,
      rate: Checkcheeprate()[2],
      weight: match().thirdWeight,
      image: match().thirdImage,
      volumeInfo: match().thirdVolumeInfo,
      volumeValue: match().thirdVolumeValue,
    },
    {
      country: selectedCountry,
      rate: Checkcheeprate()[3],
      weight: match().forthWeight,
      image: match().forthImage,
      volumeInfo: match().forthVolumeInfo,
      volumeValue: match().forthVolumeValue,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>로딩 중입니다...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center text-2xl mt-3">
        택배<span className="text-xl">의</span> 민족
        <img
          className="w-12 ml-2"
          src="/src/taeckmin.png"
          alt="택배 민족 로고"
        />
      </div>
      <div className="ml-3 mt-3 justify-self-center">
        국가: {selectedCountry}
        <br /> 무게: {weight}kg
        <br />
        가로:{width}, 세로: {length}, 높이: {height}
      </div>
      <div className="border-2 p-4 h-128 overflow-y-auto mt-8">
        {cardArray
          .filter((info) => info.rate !== 0 && info.rate !== "0")
          .map((info, index) => {
            return (
              <div
                className="shadow-md border-2 rounded-lg w-4/5 h-32 justify-self-center p-2 grid grid-cols-3 gap-4 mt-8, mb-4"
                key={index}
              >
                <div className="col-start-1 col-end-3 ">
                  국가: {selectedCountry}
                  <br />
                  요금: {info.rate} 원
                  <br />
                  적용 무게: {info.weight}kg
                  <br />
                  부피중량 : {info.volumeValue}kg
                  <p className="text-gray-500 text-xs">{info.volumeInfo}</p>
                </div>
                <div className="col-end-7 col-span-2 flex justify-end items-center">
                  <img src={info.image} className="w-28 mb-3" />
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex justify-between mx-8 mt-5 mb-5">
        <button
          onClick={handleGoLandingPageClick}
          className=" bg-black text-white text-1xl p-2 w-28 rounded hover:bg-blue-600"
        >
          메인으로
        </button>
        <button
          onClick={handleGoWeightInputClick}
          className=" bg-black text-white text-1xl p-2 w-28 rounded hover:bg-blue-600"
        >
          무게, 부피 수정
        </button>
      </div>
    </>
  );
}

export default ServiceComparison;
