import videoFile from "../assets/demonstration.webm";
import { Link } from "react-router-dom";

const IntroductionPage = () => {
  return (
    <>
      <div className="flex flex-col w-screen h-screen px-5 lg:px-20 py-4 font-bold">
        <div className="flex flex-col items-center pt-10">
          <div className="flex justify-center items-center bg-black w-[400px] h-[300px] md:w-[600px] md:h-[400px]">
            <video className="w-full h-full" controls>
              <source src={videoFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-col items-center mt-4">
            <Link to="/Search">
              <button className="text-black px-4 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white">
                Start Comparing
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroductionPage;
