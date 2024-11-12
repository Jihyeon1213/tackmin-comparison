import useUserStore from "../store";
import BeforeNextButton from "./beforenextbutton";

function WeightInputForm() {
  const { weight, handleWeightInputChange } = useUserStore();
  return (
    <>
      <div className="justify-self-center mt-32 text-3xl">
        택배의 무게를 알려주세요.
      </div>
      <div className="justify-self-center mt-12">
        <input
          type="text"
          value={weight}
          placeholder="20"
          onChange={handleWeightInputChange}
          className="justify-self-center text-4xl w-24 focus:outline-none border-b-8"
        ></input>{" "}
        <span className="text-3xl">Kg</span>
      </div>
      <BeforeNextButton />
    </>
  );
}

export default WeightInputForm;
