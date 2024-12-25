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
  const [isInfoVisible, setIsInfoVisible] = useState(false);
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

  const dhlSfSupportedCountries = {
    US: true,
    JP: true,
    CN: true,
    HK: true,
    TW: true,
    VN: true,
    TH: true,
    SG: true,
    MY: true,
    ID: true,
    PH: true,
    IN: true,
    AU: true,
  };

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

      const requests = [
        axios.get("/emsrate.json"),
        axios.post(
          "https://tackmin-comparison-1.onrender.com/scrape_ups",
          {
            countryCode: selectedCountry,
            weight: weight,
            width: width,
            length: length,
            height: height,
          },
          { withCredentials: false }
        ),
      ];

      if (dhlSfSupportedCountries[selectedCountry]) {
        requests.push(
          axios.post(
            "https://scrape-plei.onrender.com/scrape",
            {
              countryCode: selectedCountry,
              weight: realWeight.dhl,
            },
            { withCredentials: false }
          ),
          axios.post(
            "https://scrape-plei.onrender.com/scrape",
            {
              countryCode: selectedCountry,
              weight: realWeight.sf,
            },
            { withCredentials: false }
          )
        );
      }

      Promise.all(requests)
        .then((responses) => {
          try {
            if (!responses[0].data) throw new Error("EMS 데이터 없음");
            if (!responses[1].data) throw new Error("UPS 데이터 없음");

            setEmsRate(
              responses[0].data[realWeight.ems][
                selectedCountry
              ].toLocaleString()
            );
            setUpsRate(responses[1].data.slice(0, 7));

            if (dhlSfSupportedCountries[selectedCountry]) {
              if (!responses[2].data) throw new Error("DHL 데이터 없음");
              if (!responses[3].data) throw new Error("SF 데이터 없음");

              setDhlRate(responses[2].data["DHL"]);
              setSfRate(responses[3].data["SF"]);
            } else {
              setDhlRate(null);
              setSfRate(null);
            }
          } catch (error) {
            console.error("데이터 처리 중 오류:", error);
          }
        })
        .catch((error) => {
          console.error("API 요청 중 오류:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [realWeight, selectedCountry]);

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
          result.firstImage = "/emslogo.png";
          result.firstVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.firstVolumeValue = firstVolumeWeight;
          result.firstWeight = realWeight.ems;
        } else if (rateList[i] === UpsRate) {
          result.firstImage = "/upslogo.png";
          result.firstVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.firstVolumeValue = firstVolumeWeight;
          result.firstWeight = realWeight.ups;
        } else if (rateList[i] === SfRate) {
          result.firstImage = "/sflogo.png";
          result.firstVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.firstWeight = realWeight.sf;
          result.firstVolumeValue = secondVolumeWeight;
        } else if (rateList[i] === dhlRate) {
          result.firstImage = "/dhllogo.png";
          result.firstVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.firstVolumeValue = secondVolumeWeight;
          result.firstWeight = realWeight.dhl;
        }
      }
      if (Checkcheeprate()[1] === rateList[i]) {
        if (rateList[i] === emsRate) {
          result.secondImage = "/emslogo.png";
          result.secondVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.secondVolumeValue = firstVolumeWeight;
          result.secondWeight = realWeight.ems;
        } else if (rateList[i] === UpsRate) {
          result.secondImage = "/upslogo.png";
          result.secondVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.secondVolumeValue = firstVolumeWeight;
          result.secondWeight = realWeight.ups;
        } else if (rateList[i] === SfRate) {
          result.secondImage = "/sflogo.png";
          result.secondVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.secondVolumeValue = secondVolumeWeight;
          result.secondWeight = realWeight.sf;
        } else if (rateList[i] === dhlRate) {
          result.secondImage = "/dhllogo.png";
          result.secondVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.secondVolumeValue = secondVolumeWeight;
          result.secondWeight = realWeight.dhl;
        }
      }
      if (Checkcheeprate()[2] === rateList[i]) {
        if (rateList[i] === emsRate) {
          result.thirdImage = "/emslogo.png";
          result.thirdVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.thirdVolumeValue = firstVolumeWeight;
          result.thirdWeight = realWeight.ems;
        } else if (rateList[i] === UpsRate) {
          result.thirdImage = "/upslogo.png";
          result.thirdVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.thirdVolumeValue = firstVolumeWeight;
          result.thirdWeight = realWeight.ups;
        } else if (rateList[i] === SfRate) {
          result.thirdImage = "/sflogo.png";
          result.thirdVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.thirdVolumeValue = secondVolumeWeight;
          result.thirdWeight = realWeight.sf;
        } else if (rateList[i] === dhlRate) {
          result.thirdImage = "/dhllogo.png";
          result.thirdVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.thirdVolumeValue = secondVolumeWeight;
          result.thirdWeight = realWeight.dhl;
        }
      }
      if (Checkcheeprate()[3] === rateList[i]) {
        if (rateList[i] === emsRate) {
          result.forthImage = "/emslogo.png";
          result.forthVolumeInfo = "(가로x세로x높이) ➗ 6000";
          result.forthVolumeValue = firstVolumeWeight;
          result.forthWeight = realWeight.ems;
        } else if (rateList[i] === UpsRate) {
          result.forthImage = "/upslogo.png";
          result.forthVolumeValue = "(가로x세로x높이) ➗ 6000";
          result.forthVolumeValue = firstVolumeWeight;
          result.forthWeight = realWeight.ups;
        } else if (rateList[i] === SfRate) {
          result.forthImage = "/sflogo.png";
          result.forthVolumeInfo = "(가로x세로x높이) ➗ 5000";
          result.forthVolumeValue = secondVolumeWeight;
          result.forthWeight = realWeight.sf;
        } else if (rateList[i] === dhlRate) {
          result.forthImage = "/dhllogo.png";
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
  ].filter((card) => {
    if (
      (card.image.includes("dhl") || card.image.includes("sf")) &&
      (card.rate === "" || card.rate === null || card.rate === undefined)
    ) {
      return false;
    }
    return true;
  });

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  if (isLoading) {
    return (
      <div className="relative text-gray-800 w-96 h-[80vh] sm:w-[28rem] md:w-[36rem] lg:w-[42rem] p-8 rounded-lg shadow-2xl flex flex-col items-center justify-center">
        <div className="loader mb-4"></div>
        <p className="text-xl font-semibold">로딩 중입니다...</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative text-gray-800 w-96 h-[80vh] sm:w-[28rem] md:w-[36rem] lg:w-[42rem] p-8 rounded-lg shadow-2xl flex flex-col items-center justify-center">
        <button
          onClick={handleGoWeightInputClick}
          className="absolute top-2 left-2 bg-gray-800 text-white text-sm p-1 rounded hover:bg-blue-600 flex items-center"
        >
          무게 부피 수정
        </button>
        <div className="absolute top-10 left-1 p-1 ">
          <button
            onClick={toggleInfoVisibility}
            className="bg-gray-800 text-white text-sm p-1 rounded hover:bg-blue-600 flex items-center mb-2"
          >
            입력 정보
          </button>
          {isInfoVisible && (
            <div>
              <p>국가: {selectedCountry}</p>
              <p>무게: {weight}kg</p>
              <p>가로: {width}</p>
              <p>세로: {length}</p>
              <p>높이: {height}</p>
            </div>
          )}
        </div>
        <div className="container flex flex-col items-center mt-8">
          <div className="flex items-center">
            <div
              className="text-6xl hover:text-blue-600 cursor-pointer"
              onClick={handleGoLandingPageClick}
            >
              택배<span className="text-5xl">의</span> 민족
            </div>
          </div>
          <div className="border-2 p-4 h-128 overflow-y-auto mt-8 w-[500px] scrollbar-hide">
            <div className="grid grid-cols-1 gap-4">
              {cardArray
                .filter((info) => info.rate !== 0 && info.rate !== "0")
                .map((info, index) => (
                  <div
                    className="shadow-md border-2 rounded-lg p-4 grid grid-cols-3 gap-4"
                    key={index}
                  >
                    <div className="col-span-2">
                      요금: {info.rate} 원
                      <br />
                      적용 무게: {info.weight}kg
                      <br />
                      부피중량 : {info.volumeValue}kg
                      <p className="text-gray-500 text-xs">{info.volumeInfo}</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <img src={info.image} className="w-28" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceComparison;
