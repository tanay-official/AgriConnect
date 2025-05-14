import React from "react";

const MainContainer = ({ parentClass = "", childClass = "", children }) => {
  return (
    <div className={`w-full flex justify-center ${parentClass}`}>
      <div className={`max-w-5xl w-full ${childClass}`}>{children}</div>
    </div>
  );
};

export default MainContainer;
