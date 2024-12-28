import axios from "axios";
import { useEffect, useState } from "react";
import useInputFormStore from "../store";

function ServiceComparison() {
  const [emsRate, setEmsRate] = useState(0);
  const [upsRate, setUpsRate] = useState(0);
  const [sfRate, setSfRate] = useState(0);
  const [dhlRate, setDhlRate] = useState(0);
  const [realWeight, setRealWeight] = useState({
    ems: 0,
    sf: 0,
    dhl: 0,
    ups: 0,
  });
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
          setEmsRate(
            responses[0].data[realWeight.ems][selectedCountry].toLocaleString()
          );
          setUpsRate(responses[1].data.slice(0, 7));

          if (dhlSfSupportedCountries[selectedCountry]) {
            setDhlRate(responses[2].data["DHL"]);
            setSfRate(responses[3].data["SF"]);
          } else {
            setDhlRate(null);
            setSfRate(null);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [realWeight, selectedCountry]);

  function getCarrierInfo(rate, realWeight, volumeWeight) {
    const carrierInfo = {
      ems: {
        image: "/emslogo.png",
        volumeInfo: "(가로x세로x높이) ➗ 6000",
        weight: realWeight.ems,
        volumeValue: volumeWeight.first,
      },
      ups: {
        image: "/upslogo.png",
        volumeInfo: "(가로x세로x높이) ➗ 6000",
        weight: realWeight.ups,
        volumeValue: volumeWeight.first,
      },
      sf: {
        image: "/sflogo.png",
        volumeInfo: "(가로x세로x높이) ➗ 5000",
        weight: realWeight.sf,
        volumeValue: volumeWeight.second,
      },
      dhl: {
        image: "/dhllogo.png",
        volumeInfo: "(가로x세로x높이) ➗ 5000",
        weight: realWeight.dhl,
        volumeValue: volumeWeight.second,
      },
    };

    if (rate === Number(emsRate)) return carrierInfo.ems;
    if (rate === Number(upsRate)) return carrierInfo.ups;
    if (rate === Number(sfRate)) return carrierInfo.sf;
    if (rate === Number(dhlRate)) return carrierInfo.dhl;
    return null;
  }

  function createCardArray() {
    const rates = [
      Number(upsRate),
      Number(emsRate),
      Number(sfRate),
      Number(dhlRate),
    ];
    const sortedRates = rates.slice().sort((a, b) => a - b);

    return sortedRates
      .map((rate) => {
        const info = getCarrierInfo(rate, realWeight, {
          first: firstVolumeWeight,
          second: secondVolumeWeight,
        });
        return {
          country: selectedCountry,
          rate,
          weight: info.weight,
          image: info.image,
          volumeInfo: info.volumeInfo,
          volumeValue: info.volumeValue,
        };
      })
      .filter((card) => card.rate !== 0 && card.rate !== "0");
  }

  const cardArray = createCardArray();

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  if (isLoading) {
    return (
      <div className="relative text-gray-800 w-96 h-[90vh] sm:w-[28rem] md:w-[36rem] lg:w-[42rem] p-8 rounded-lg shadow-2xl flex flex-col items-center justify-center">
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
