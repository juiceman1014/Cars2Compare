import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

const ReviewsForCar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const parameters = new URLSearchParams(location.search);
  const carID = parameters.get("carID");
  const make = parameters.get("make");
  const model = parameters.get("model");

  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reply, setReply] = useState("");
  const [content, setContent] = useState("");

  const submitComment = async (reviewID) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/submitComment",
        {
          reviewID,
          userID: user.id,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const message = response.data;
      alert(message);
    } catch (error) {
      console.error("Error posting comments", error);
      alert("Error posting comment");
    }
  };

  const handleCommentSubmit = (reviewID) => {
    if (content.length === 0) {
      alert("Cannot be blank");
    } else {
      submitComment(reviewID);
    }
  };

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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/getComments`);
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  }, [comments]);

  return (
    <div className="flex flex-col mx-8 lg:mx-24">
      <h1 className="text-xl">
        Reviews for {make} {model}
      </h1>
      <div className="flex flex-col space-y-4 mt-2">
        {reviews.map((review, index) => (
          <div key={index} className="border border-black p-4">
            <div className="flex flex-row justify-between">
              <h1>User: {review.name}</h1>
              <button
                className="border border-black rounded-full px-2 py-1"
                onClick={() => {
                  if (index === reply) {
                    setReply("");
                    setContent("");
                  } else {
                    setReply(index);
                    setContent("");
                  }
                }}
              >
                Reply
              </button>
            </div>
            <p className="mt-[-5px]">{review.content}</p>
            {reply === index && (
              <div className="flex flex-row gap-5 mt-5 items-center">
                <textarea
                  className="border-[3px] border-black w-full"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="self-end">
                  <button
                    className="border border-black rounded-full px-2 py-1 text-center"
                    onClick={() => handleCommentSubmit(review.review_ID)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            <div className="mt-4">
              <h2 className="text-lg">Comments:</h2>
              {comments
                .filter((comment) => comment.reviewID === review.review_ID)
                .map((comment, commentIndex) => (
                  <div
                    key={commentIndex}
                    className="border-t border-gray-300 pt-2 mt-2"
                  >
                    <p>
                      {comment.name}: {comment.textualContent}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsForCar;
