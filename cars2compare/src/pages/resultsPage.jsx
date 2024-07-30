import React from "react";
import carImg from "../assets/carImg1.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ResultsPage = () => {
  const location = useLocation();
  const paramaters = new URLSearchParams(location.search);

  const year = paramaters.get("year");
  const make = paramaters.get("make");
  const model = paramaters.get("model");
  const yearTwo = paramaters.get("yearTwo");
  const makeTwo = paramaters.get("makeTwo");
  const modelTwo = paramaters.get("modelTwo");

  const [carInfo, setCarInfo] = useState([]);
  const [carInfoTwo, setCarInfoTwo] = useState([]);

  useEffect(() => {
    const carData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/carData", {
          params: {
            make: make,
            model: model,
            year: year,
          },
        });
        const responseTwo = await axios.get("http://localhost:3002/carData", {
          params: {
            make: makeTwo,
            model: modelTwo,
            year: yearTwo,
          },
        });
        setCarInfo(response.data);
        setCarInfoTwo(responseTwo.data);
      } catch (error) {
        console.error("Error fetching cardata", error);
      }
    };

    carData();
  }, []);

  return (
    <>
      <div className="flex flex-row items-center justify-around">
        <div className="flex flex-col p-[10px] border-[3px] border-black w-3/6 h-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-xl">
              {year} {make} {model}
            </h1>
            <img className="w-4/6 h-auto" src={carImg} alt="car image"></img>
          </div>
          <p className="p-[10px]">Price: {carInfo.price}</p>
          <p className="p-[10px]">Miles Per Gallon: {carInfo.MPG} </p>
          <p className="p-[10px]">Horsepower: {carInfo.HP} </p>
          <p className="p-[10px]">Engine: {carInfo.engine} </p>
          <p className="p-[10px]">Transmission: {carInfo.transmission} </p>
          <p className="p-[10px]">Weight: {carInfo.weight} </p>
          <div className="flex justify-center p-[10px]">
            <button className="border-black border-[2px] w-[70px] ">
              Add To Saved
            </button>
          </div>
          <div className="flex flex-col mt-[10px]">
            <h1 className="text-xl text-center">Reviews</h1>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
          </div>
        </div>
        <div className="flex flex-col p-[10px] border-[3px] border-black w-3/6 h-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-xl">
              {yearTwo} {makeTwo} {modelTwo}
            </h1>
            <img className="w-4/6 h-auto" src={carImg} alt="car image"></img>
          </div>
          <p className="p-[10px]">Price: {carInfoTwo.price}</p>
          <p className="p-[10px]">Miles Per Gallon: {carInfoTwo.MPG} </p>
          <p className="p-[10px]">Horsepower: {carInfoTwo.HP} </p>
          <p className="p-[10px]">Engine: {carInfoTwo.engine} </p>
          <p className="p-[10px]">Transmission: {carInfoTwo.transmission} </p>
          <p className="p-[10px]">Weight: {carInfoTwo.weight} </p>
          <div className="flex justify-center p-[10px]">
            <button className="border-black border-[2px] w-[70px] ">
              Add To Saved
            </button>
          </div>
          <div className="flex flex-col mt-[10px]">
            <h1 className="text-xl text-center">Reviews</h1>
            <div className="p-[10px]">Username: Review</div>
            <div className="p-[10px]">Username: Review</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
