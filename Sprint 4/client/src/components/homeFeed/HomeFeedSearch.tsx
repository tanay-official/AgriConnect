import React from "react";

const HomeFeedSearch = () => {
  return (
    <div className="w-full fixed flex justify-center items-center top-12 left-0 right-0 bg-white pb-6 z-50">
      <div className="h-12 w-full max-w-5xl flex justify-center items-center gap-8 mt-6">
        <div className="h-full w-3/4 border border-green-800 rounded-full relative">
          <input
            type="text"
            className="w-full focus:outline-none h-full rounded-full placeholder:text-gray-500 pl-4 headline"
            placeholder="🔍 Search fresh vegetables, fruits, or farmers..."
          />
        </div>
      </div>
    </div>
  );
};

export default HomeFeedSearch;
