import carImg from "../assets/carImg1.png";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

const CarsSavedPage = () => {
  const { user } = useContext(UserContext);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchSavedCars = async () => {
      if (user && user.token) {
        try {
          const response = await axios.get("http://localhost:3002/savedCars", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          console.log(response.data);
          setCars(response.data);
        } catch (error) {
          console.error("Error fetching saved cars", error);
        }
      }
    };
    fetchSavedCars();
  }, [user]);

  const handleDelete = async (carID) => {
    if (user && user.token) {
      try {
        await axios.delete(`http://localhost:3002/savedCars/${carID}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCars(cars.filter((car) => car.car_ID !== carID));
      } catch (error) {
        console.error("Error deleting car", error);
      }
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center mt-[20px] text-xl">Saved Cars</h1>
        <div className="flex flex-col">
          {cars.map((car) => (
            <div
              key={car.car_ID}
              className="border-black m-[10px] border-[3px] flex flex-col lg:flex-row p-[10px] justify-between items-start lg:items-center flex-wrap"
            >
              <div>
                <button
                  className="text-[red]"
                  onClick={() => handleDelete(car.car_ID)}
                >
                  Delete
                </button>
                <img
                  className="w-[300px] h-auto"
                  src={car.image_path}
                  alt="car image"
                ></img>
              </div>
              <p>
                Name: {car.year} {car.make} {car.model}
              </p>
              <p>Edmund Rating: {car.rating}</p>
              <p>Price: {car.price}</p>
              <p>Body type: {car.body_style}</p>
              <p>MPG: {car.MPG}</p>
              <p>HP: {car.HP}</p>
              <p>Engine: {car.engine}</p>
              <p>Transmission: {car.transmission}</p>
              <p>Weight(lbs.): {car.weight}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarsSavedPage;
