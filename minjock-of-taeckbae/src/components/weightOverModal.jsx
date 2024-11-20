import useInputFormStore from "../store";

function WeightOverModal() {
  const { handlemodalCloseClick } = useInputFormStore();
  return (
    <>
      <div className="fixed inset-0 h-full w-full cursor-default justify-items-center bg-black bg-opacity-50">
        <div className="border-3 w-54 h-28 bg-white rounded mt-60">
          <div className="flex justify-end">
            <button
              onClick={handlemodalCloseClick}
              className="bg-black text-white w-12 p-1 rounded hover:bg-blue-600"
            >
              닫기
            </button>
          </div>
          <div className="justify-self-center text-1xl mt-6 p-2 text-gray-600">
            20kg 이하로 입력해주세요.
          </div>
        </div>
      </div>
    </>
  );
}

export default WeightOverModal;
