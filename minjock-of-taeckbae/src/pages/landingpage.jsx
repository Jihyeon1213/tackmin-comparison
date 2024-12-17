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
          <div className="relative w-full flex justify-center items-center mb-8">
            <div className="text-6xl font-bold text-center space-x-2">
              <span className="text-blue-500">택배</span>
              <span className="text-5xl">의</span>
              <span className="text-yellow-400">민족</span>
            </div>
            <img
              src="/src/taeckmin.png"
              className="absolute right-0 w-16 h-16"
              alt="택배의 민족 캐릭터"
            />
          </div>
          <div className="text-center space-y-10">
            <div className="text-4xl font-semibold">가장 빠르고</div>
            <div className="text-4xl font-semibold">저렴한 가격의</div>
            <div className="text-6xl lg:text-6xl text-blue-400 font-bold">
              국제 택배
            </div>
            <div className="text-4xl font-light mt-4">지금 찾아드릴게요</div>
            <div className="mt-16">
              <button
                onClick={handlegoCountryInputClick}
                className=" bg-blue-600 text-white text-3xl p-4 rounded-lg hover:bg-yellow-500 transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                한 번에 비교하기
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LandingPage;
