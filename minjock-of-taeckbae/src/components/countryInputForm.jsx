import { useNavigate } from "react-router-dom";
import countryList from "../countrylist";
import useInputFormStore from "../store";
import Select from "react-select";

function CountryInputForm() {
  const { handleGoVolumeInputClick, handleSelectedCountryChange } =
    useInputFormStore();
  const navigate = useNavigate();

  function handleMoveServiceListPage() {
    navigate("/comparison");
  }

  return (
    <>
      <div className="justify-items-center">
        <div className="mt-28 text-3xl">
          마지막으로 <br />
          도착국가를 알려주세요.
        </div>
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
          onClick={handleGoVolumeInputClick}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          👈 이전
        </button>
        <button
          onClick={handleMoveServiceListPage}
          className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600"
        >
          다음 👉
        </button>
      </div>
    </>
  );
}
export default CountryInputForm;
