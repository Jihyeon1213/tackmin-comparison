function BeforeNextButton() {
  return (
    <div className="flex justify-between mx-8 mt-28 mb-16">
      <button className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600">
        👈 이전
      </button>
      <button className=" bg-black text-white text-2xl p-2 w-28 rounded hover:bg-blue-600">
        다음 👉
      </button>
    </div>
  );
}

export default BeforeNextButton;
