import carImg from "../assets/carImg1.png";
import { useState } from "react";

const CarsSavedPage = () => {
  const [cars, setCars] = useState([
    {
      id: 1,
      img: carImg,
      name: "",
      price: "",
      mpg: "",
      hp: "",
      engine: "",
      transmission: "",
      weight: "",
    },
    {
      id: 2,
      img: carImg,
      name: "",
      price: "",
      mpg: "",
      hp: "",
      engine: "",
      transmission: "",
      weight: "",
    },
    {
      id: 3,
      img: carImg,
      name: "",
      price: "",
      mpg: "",
      hp: "",
      engine: "",
      transmission: "",
      weight: "",
    },
    {
      id: 4,
      img: carImg,
      name: "",
      price: "",
      mpg: "",
      hp: "",
      engine: "",
      transmission: "",
      weight: "",
    },
    {
      id: 5,
      img: carImg,
      name: "",
      price: "",
      mpg: "",
      hp: "",
      engine: "",
      transmission: "",
      weight: "",
    }
  ]);

  const handleDelete = (id) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <>
      <div>
        <h1 className="text-center mt-[20px] text-xl">Saved Cars</h1>
        <carcontainer className="flex flex-col">
          {cars.map((car) => (
            <car
              key={car.id}
              className="border-black m-[10px] border-[3px] flex flex-row p-[10px] justify-between items-center flex-wrap"
            >
              <div>
                <button
                  className="text-[red]"
                  onClick={() => handleDelete(car.id)}
                >
                  Delete
                </button>
                <img
                  className="w-[300px] h-auto"
                  src={car.img}
                  alt="car image"
                ></img>
              </div>
              <p>Name: {car.name}</p>
              <p>Price: {car.price}</p>
              <p>MPG: {car.mpg}</p>
              <p>HP: {car.hp}</p>
              <p>Engine: {car.engine}</p>
              <p>Transmission: {car.transmission}</p>
              <p>Weight: {car.weight}</p>
            </car>
          ))}
        </carcontainer>
      </div>
    </>
  );
};

export default CarsSavedPage;
