import countryList from "../countrylist";
import useInputFormStore from "../store";
import Select from "react-select";

function CountryInputForm() {
  const {
    handleSelectedCountryChange,
    handleGoWeightInputClick,
    handleGoLandingPageClick,
  } = useInputFormStore();

  return (
    <>
      <div className="flex mt-8 items-center">
        <div className="mt-6 text-6xl ml-32">
          택배<span className="text-5xl">의</span>민족
        </div>
        <img src="/src/taeckmin.png" className="w-24" />
      </div>
      <div className="justify-items-center">
        <div className="mt-28 text-3xl">도착국가를 입력해주세요.</div>
        <div className="mt-10">
          <Select
            options={countryList}
            placeholder="도착 국가를 입력해 주세요"
            className="text-2xl w-80 appearance-none outline-none border-b-8"
            onChange={handleSelectedCountryChange}
            value={countryList.label}
          />
        </div>
      </div>
      <div className="flex justify-between mx-8 mt-24 mb-16">
        <button
          onClick={handleGoLandingPageClick}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          메인으로
        </button>
        <button
          onClick={handleGoWeightInputClick}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          다음 👉
        </button>
      </div>
    </>
  );
}
export default CountryInputForm;
