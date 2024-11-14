import useInputFormStore from "../store";

function VolumeAlertModal() {
  const { handlemodalCloseClick } = useInputFormStore();
  return (
    <>
      <div className="fixed inset-0 h-full w-full cursor-default justify-items-center bg-black bg-opacity-50">
        <div className="border-3 w-56 h-36 bg-white rounded mt-60">
          <div className="flex justify-end">
            <button
              onClick={handlemodalCloseClick}
              className="bg-black text-white text-sm w-12 p-1 rounded hover:bg-blue-600"
            >
              닫기
            </button>
          </div>
          <div className="justify-self-center text-1xl mt-6 text-gray-600">
            가로x세로x높이 <br />
            또는 가로,세로,높이 <br />
            형식으로 입력해주세요.
          </div>
        </div>
      </div>
    </>
  );
}

export default VolumeAlertModal;
