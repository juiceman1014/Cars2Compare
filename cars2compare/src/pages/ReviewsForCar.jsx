import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const ReviewsForCar = () => {
  const location = useLocation();
  const parameters = new URLSearchParams(location.search);
  const carID = parameters.get("carID");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const respose = await axios.get(
          "http://localhost:3002/getReviews/${carID}"
        );
      } catch {}
    };
    fetchReviews();
  }, []);
  return (
    <div className="flex flex-col w-full mx-8 lg:mx-24">
      <h1 className="text-xl">Reviews</h1>
      <div className="flex flex-col w-full">{carID}</div>
    </div>
  );
};

export default ReviewsForCar;
