import React, { useState } from "react";
import Dropdown from "../components/dropDown";
import { Link } from "react-router-dom";

const ReviewPage = ({ options, model, year }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-20">
        <div className="flex flex-col items-center h-[500px] w-[400px] border-[2px] gap-2 border-black">
          <h1 className="mt-5">Review</h1>
          <div className="flex flex-col gap-10 mt-5 w-[300px] h-[400px]">
            <div className="flex flex-row items-center gap-10">
              <h1 className="mr-1">Make</h1>
              <Dropdown options={options}></Dropdown>
            </div>
            <div className="flex flex-row items-center gap-10">
              <h1 className="ml-[-2px]"> Model</h1>
              <Dropdown options={model}></Dropdown>
            </div>
            <div className="flex flex-row items-center gap-10">
              <h1 className="mr-3">Year</h1>
              <Dropdown options={year}></Dropdown>
            </div>
            <div className = "flex flex-row items-center">
                <p className = "p-[5px]">Review:</p>
                <textarea className = "border-[3px] border-black"></textarea>
            </div>
            <button className = "border-black border-[2px] w-3/6">Submit Review</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
