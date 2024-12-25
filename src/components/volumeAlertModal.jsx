import useInputFormStore from "../store";

function VolumeAlertModal() {
  const { handlemodalCloseClick } = useInputFormStore();
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-80 sm:w-96">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-bold text-gray-800">알림</h2>
            <button
              onClick={handlemodalCloseClick}
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              ✖
            </button>
          </div>
          <div className="mt-4 text-center text-gray-700">
            부피를 초과하였습니다.
            <br />
            가로 150cm 이하, 둘레 300cm 이하로 입력해주세요.
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handlemodalCloseClick}
              className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VolumeAlertModal;
