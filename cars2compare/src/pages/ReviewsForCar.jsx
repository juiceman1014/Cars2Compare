import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const ReviewsForCar = () => {
  const location = useLocation();
  const parameters = new URLSearchParams(location.search);
  const carID = parameters.get("carID");
  const make = parameters.get("make");
  const model = parameters.get("model");

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/getReviews/${carID}`
        );
        setReviews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };
    fetchReviews();
  }, [carID]);

  return (
    <div className="flex flex-col mx-8 lg:mx-24">
      <h1 className="text-xl">
        Reviews for {make} {model}
      </h1>
      <div className="flex flex-col space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border p-4">
            <h1>User: {review.name}</h1>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsForCar;
