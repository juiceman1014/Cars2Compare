import carImg from "../assets/carImg1.png";

const CarsSavedPage = () => {
  return (
    <>
      <div className = "h-screen">
        <h1 className = "text-center mt-[20px] text-xl">Saved Cars</h1>
        <div className = "flex flex-col">
          <car className = "border-black m-[10px] border-[3px] flex flex-row p-[10px] justify-between items-center flex-wrap">
            <img className = "w-[300px] h-auto" src = {carImg}></img>
            <p>Name:</p>
            <p>Price:</p>
            <p>MPG:</p>
            <p>HP:</p>
            <p>Engine:</p>
            <p>Transmission:</p>
            <p>Weight:</p>
          </car>

          <car className = "border-black m-[10px] border-[3px] flex flex-row p-[10px] justify-between items-center flex-wrap">
            <img className = "w-[300px] h-auto" src = {carImg}></img>
            <p>Name:</p>
            <p>Price:</p>
            <p>MPG:</p>
            <p>HP:</p>
            <p>Engine:</p>
            <p>Transmission:</p>
            <p>Weight:</p>
          </car>

          <car className = "border-black m-[10px] border-[3px] flex flex-row p-[10px] justify-between items-center flex-wrap">
            <img className = "w-[300px] h-auto" src = {carImg}></img>
            <p>Name:</p>
            <p>Price:</p>
            <p>MPG:</p>
            <p>HP:</p>
            <p>Engine:</p>
            <p>Transmission:</p>
            <p>Weight:</p>
          </car>

        </div>
      </div>
    </>
  );
};

export default CarsSavedPage;
