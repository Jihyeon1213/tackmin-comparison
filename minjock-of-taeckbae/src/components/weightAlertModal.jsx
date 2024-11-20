import useInputFormStore from "../store";

function WeightAlertModal() {
  const { handlemodalCloseClick } = useInputFormStore();
  return (
    <>
      <div className="fixed inset-0 h-full w-full cursor-default justify-items-center bg-black bg-opacity-50">
        <div className="border-3 w-56 h-28 bg-white rounded mt-60">
          <div className="flex justify-end">
            <button
              onClick={handlemodalCloseClick}
              className="bg-black text-white w-12 p-1 rounded hover:bg-blue-600"
            >
              닫기
            </button>
          </div>
          <div className="justify-self-center text-2xl mt-6 text-gray-600">
            숫자를 입력해주세요.
          </div>
        </div>
      </div>
    </>
  );
}

export default WeightAlertModal;