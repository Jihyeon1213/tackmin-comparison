import useInputFormStore from "../store.js";
import CountryInputForm from "../components/countryinputform.jsx";
import ServiceComparison from "./serviceComparison.jsx";
import WeightAndVolumeInputForm from "../components/weightAndVolumeInputForm.jsx";

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
          <div className="flex ml-10 mt-8 items-center">
            <div className="mt-6 text-6xl ml-32">
              택배<span className="text-5xl">의</span>민족
            </div>
            <img src="/src/taeckmin.png" className="w-24" />
          </div>
          <div className="mt-5 justify-items-center">
            <div className="mt-12 text-4xl">가장 빠르고</div>
            <div className="text-4xl">저렴한 가격의</div>
            <div className="mt-10 text-6xl text-blue-600">국제 택배</div>
            <div className="mt-10 text-4xl">지금 찾아드릴게요</div>
            <div className="mt-20 mb-8">
              <button
                onClick={handlegoCountryInputClick}
                className=" bg-black text-white text-3xl p-2 rounded hover:bg-blue-600"
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
