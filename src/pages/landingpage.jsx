import useInputFormStore from "../store.js";
import ServiceComparison from "./serviceComparison.jsx";
import WeightAndVolumeInputForm from "../components/weightAndVolumeInputForm.jsx";
import CountryInputForm from "../components/countryInputForm.jsx";

function LandingPage() {
  const {
    handlegoCountryInputClick,
    landingPage,
    isNextCountry,
    isComparison,
    isNextWeightAndVolume,
  } = useInputFormStore();
  return (
    <>
      {!landingPage &&
        !isNextCountry &&
        !isNextWeightAndVolume &&
        isComparison && <ServiceComparison />}
      {!landingPage && isNextCountry && <CountryInputForm />}
      {!landingPage && isNextWeightAndVolume && !isNextCountry && (
        <WeightAndVolumeInputForm />
      )}
      {!isNextWeightAndVolume && !isNextCountry && landingPage && (
        <>
          <div className=" w-96 h-[90vh] sm:w-[28rem] md:w-[36rem] lg:w-[42rem] p-8 rounded-lg shadow-2xl flex flex-col items-center justify-center">
            <div className="container flex flex-col items-center mt-8">
              <div className="flex items-center">
                <div className="text-6xl mb-20">
                  택배<span className="text-5xl">의</span> 민족
                </div>
              </div>
              <div className="mt-8 animate-slideInFromRight">
                <img src="/taeckmin.png" alt="택민이이미지" className="w-64" />
              </div>
              <div className="mt-20">
                <button
                  onClick={handlegoCountryInputClick}
                  className=" bg-blue-600 text-white text-3xl p-4 rounded-lg hover:bg-blue-700 transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                  가격 비교하기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LandingPage;
