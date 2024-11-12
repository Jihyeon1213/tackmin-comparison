import WeightInputForm from "../components/weightinputform.jsx";
import useInputFormStore from "../store.js";
import VolumeInputForm from "../components/volumeinputform.jsx";

function LandingPage() {
  const { isComparisonButtonClick, isNextVolume, moveQuestion } =
    useInputFormStore();
  return (
    <>
      <div className="justify-self-center mt-6 text-2xl">택배의 민족</div>
      {isComparisonButtonClick && <WeightInputForm />}
      {!isComparisonButtonClick && isNextVolume && <VolumeInputForm />}
      {!isComparisonButtonClick && !isNextVolume && (
        <>
          <div className="mt-10 justify-items-center">
            <div className="mt-20 text-3xl">가장 빠르고</div>
            <div className="text-3xl">저렴한 가격의</div>
            <div className="mt-10 text-5xl text-blue-600">국제 택배</div>
            <div className="mt-10 text-3xl">지금 찾아드릴게요</div>
            <div className="mt-20 mb-5">
              <button
                onClick={moveQuestion}
                className=" bg-black text-white text-2xl p-2 rounded hover:bg-blue-600"
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
