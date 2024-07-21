import React from "react";
import carImg from "../assets/carImg1.png";

const ResultsPage = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-around">
        <div className="flex flex-col p-[10px] border-[3px] border-black w-3/6 h-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-xl">Car1 Name</h1>
            <img className="w-4/6 h-auto" src={carImg} alt="car image"></img>
          </div>
          <p className="p-[10px]">Price: </p>
          <p className="p-[10px]">Miles Per Gallon: </p>
          <p className="p-[10px]">Horsepower: </p>
          <p className="p-[10px]">Engine: </p>
          <p className="p-[10px]">Transmission: </p>
          <p className="p-[10px]">Weight: </p>
          <div className="flex justify-center p-[10px]">
            <button className="border-black border-[2px] w-[70px] ">
              Add To Saved
            </button>
          </div>
          <div className="flex flex-col mt-[10px]">
            <h1 className="text-xl text-center">Reviews</h1>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
          </div>
        </div>
        <div className="flex flex-col p-[10px] border-[3px] border-black w-3/6 h-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-xl">Car2 Name</h1>
            <img className="w-4/6 h-auto" src={carImg} alt="car image"></img>
          </div>
          <p className="p-[10px]">Price: </p>
          <p className="p-[10px]">Miles Per Gallon: </p>
          <p className="p-[10px]">Horsepower: </p>
          <p className="p-[10px]">Engine: </p>
          <p className="p-[10px]">Transmission: </p>
          <p className="p-[10px]">Weight: </p>
          <div className="flex justify-center p-[10px]">
            <button className="border-black border-[2px] w-[70px] ">
              Add To Saved
            </button>
          </div>
          <div className="flex flex-col mt-[10px]">
            <h1 className="text-xl text-center">Reviews</h1>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
