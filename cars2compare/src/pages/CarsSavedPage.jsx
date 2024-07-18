import carImg from "../assets/carImg1.png";
import { useState } from 'react';


const CarsSavedPage = () => {

  const [cars, setCars] = useState([
    {id: 1, name: '', price: '', mpg: '', hp: '', engine: '', transmission: '', weight: ''},
    {id: 2, name: '', price: '', mpg: '', hp: '', engine: '', transmission: '', weight: ''},
    {id: 3, name: '', price: '', mpg: '', hp: '', engine: '', transmission: '', weight: ''},
    {id: 4, name: '', price: '', mpg: '', hp: '', engine: '', transmission: '', weight: ''}
  ]);

  const handleDelete = (id) => {
    setCars(cars.filter(car => car.id !== id));
  }

  return (
    <>
      <div className = "h-screen">
        <h1 className = "text-center mt-[20px] text-xl">Saved Cars</h1>
        <carcontainer className = "flex flex-col">
      {cars.map((car) => ( 
          <car key = {car.id} className = "border-black m-[10px] border-[3px] flex flex-row p-[10px] justify-between items-center flex-wrap">
            <div>
              <button className = "text-[red]" onClick = {() => handleDelete(car.id)}>Delete</button>
              <img className = "w-[300px] h-auto" src = {carImg} alt = "car image"></img>
            </div>
            <p>Name:</p>
            <p>Price:</p>
            <p>MPG:</p>
            <p>HP:</p>
            <p>Engine:</p>
            <p>Transmission:</p>
            <p>Weight:</p>
          </car>
      ))}
        </carcontainer>
      </div>
    </>
  );
};

export default CarsSavedPage;
