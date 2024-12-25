import countryList from "../countrylist";
import useInputFormStore from "../store";
import Select from "react-select";

function CountryInputForm() {
  const {
    handleSelectedCountryChange,
    handleGoWeightInputClick,
    handleGoLandingPageClick,
    selectedCountry,
  } = useInputFormStore();

  return (
    <>
      <div className="text-gray-800 w-96 h-[90vh] sm:w-[28rem] md:w-[36rem] lg:w-[42rem] p-8 rounded-lg shadow-2xl flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center mt-8">
          <div className="flex items-center">
            <div
              className="text-6xl hover:text-blue-600 cursor-pointer"
              onClick={handleGoLandingPageClick}
            >
              택배<span className="text-5xl">의</span> 민족
            </div>
          </div>
          <div className="mt-12 animate-slideInfromLeft">
            <img src="/airplane.png" alt="택민이이미지" className="w-64" />
          </div>
          <div className="justify-items-center">
            <div className="mt-16 text-4xl">도착국가를 입력해주세요.</div>
            <div className="mt-16">
              <Select
                options={countryList}
                placeholder="도착 국가를 입력해 주세요"
                className="text-2xl w-80 appearance-none outline-none text-gray-500"
                onChange={handleSelectedCountryChange}
                value={countryList.label}
              />
            </div>
          </div>
          <div
            className={`mt-24 transition-opacity duration-1500 ${
              selectedCountry ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={handleGoWeightInputClick}
              className="bg-blue-600 text-white text-3xl p-4 rounded-lg hover:bg-blue-700 transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              무게와 부피 입력하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CountryInputForm;
