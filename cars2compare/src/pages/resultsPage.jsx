import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";
import carImg from "../assets/carImg1.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
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

  const handleSavedCar = async (carID) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/savedCar",
        {
          carID: carID,
          userID: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert("Car saved successfully");
    } catch (error) {
      alert("Error saving car");
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-around">
        <div className="flex flex-col p-[10px] border-[3px] border-black w-3/6 h-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-xl p-[20px]">
              {year} {make} {model}
            </h1>
            <img className="w-auto h-4/6" src={carInfo.image_path} alt="car image"></img>
          </div>
          <p className="p-[10px]">Edmunds Rating: {carInfo.rating}</p>
          <p className="p-[10px]">Price: {carInfo.price}</p>
          <p className="p-[10px]">Body Style: {carInfo.body_style}</p>
          <p className="p-[10px]">Miles Per Gallon: {carInfo.MPG} </p>
          <p className="p-[10px]">Horsepower: {carInfo.HP} </p>
          <p className="p-[10px]">Engine: {carInfo.engine} </p>
          <p className="p-[10px]">Transmission: {carInfo.transmission} </p>
          <p className="p-[10px]">Weight(lbs.): {carInfo.weight} </p>
          <div className="flex justify-center p-[10px]">
            <button
              className="border-black border-[2px] w-[70px]"
              onClick={() => handleSavedCar(carInfo.car_ID)}
            >
              Add To Saved
            </button>
          </div>
          <div className="flex justify-center p-[10px] mt-[10px]">
            <button
              className="text-xl text-center border-black border-[2px] w-[300px]"
              onClick={() => {
                navigate(
                  `/ReviewForCar?carID=${carInfo.car_ID}&make=${make}&model=${model}`
                );
              }}
            >
              Click here to view REVIEWS
            </button>
          </div>
        </div>
        <div className="flex flex-col p-[10px] border-[3px] border-black w-3/6 h-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-xl p-[20px]">
              {yearTwo} {makeTwo} {modelTwo}
            </h1>
            <img className="w-auto h-4/6" src={carInfoTwo.image_path} alt="car image"></img>
          </div>
          <p className="p-[10px]">Edmunds Rating: {carInfoTwo.rating}</p>
          <p className="p-[10px]">Price: {carInfoTwo.price}</p>
          <p className="p-[10px]">Body Style: {carInfoTwo.body_style}</p>
          <p className="p-[10px]">Miles Per Gallon: {carInfoTwo.MPG} </p>
          <p className="p-[10px]">Horsepower: {carInfoTwo.HP} </p>
          <p className="p-[10px]">Engine: {carInfoTwo.engine} </p>
          <p className="p-[10px]">Transmission: {carInfoTwo.transmission} </p>
          <p className="p-[10px]">Weight(lbs.): {carInfoTwo.weight} </p>
          <div className="flex justify-center p-[10px]">
            <button
              className="border-black border-[2px] w-[70px]"
              onClick={() => handleSavedCar(carInfoTwo.car_ID)}
            >
              Add To Saved
            </button>
          </div>
          <div className="flex justify-center p-[10px] mt-[10px]">
            <button
              className="text-xl text-center border-black border-[2px] w-[300px]"
              onClick={() => {
                navigate(
                  `/ReviewForCar?carID=${carInfoTwo.car_ID}&make=${makeTwo}&model=${modelTwo}`
                );
              }}
            >
              Click here to view REVIEWS
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
