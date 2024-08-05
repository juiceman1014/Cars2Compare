import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import thumbs_up from "../assets/images/thumbs_up.png";
import thumbs_down from "../assets/images/thumbs_up.png";

//page that displays a cars reviews and comments
const ReviewsForCar = () => {
  //variables that store query paramters passed in from the results page
  const { user } = useContext(UserContext);
  const location = useLocation();
  const parameters = new URLSearchParams(location.search);
  const carID = parameters.get("carID");
  const make = parameters.get("make");
  const model = parameters.get("model");

  //use states that help display relevant information
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reply, setReply] = useState("");
  const [content, setContent] = useState("");
  const [reviewLikes, setReviewLikes] = useState([]);
  const [reviewDislikes, setReviewDislikes] = useState([]);
  const [commentLikes, setCommentLikes] = useState([]);
  const [commentDislikes, setCommentDislikes] = useState([]);

  //function that is invoked when a reply is left on a review
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

  //if the text box is empty we wont submit the comment, otherwise submit it
  const handleCommentSubmit = (reviewID) => {
    if (content.length === 0) {
      alert("Cannot be blank");
    } else {
      submitComment(reviewID);
    }
  };

  //gets all reviews for a car
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/getReviews/${carID}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };
    fetchReviews();
  }, [carID]);

  //fetches all comments for that car
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/getComments`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  }, [comments]);

  //fetches review likes
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/getReviewLikes/${carID}`
        );
        setReviewLikes(response.data);
      } catch (error) {
        console.error("Error fetching review likes", error);
      }
    };
    fetchLikes();
  }, []);

  //fetches review dislikes
  useEffect(() => {
    const fetchDislikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/getReviewDislikes/${carID}`
        );
        setReviewDislikes(response.data);
      } catch (error) {
        console.error("Error fetching review likes", error);
      }
    };
    fetchDislikes();
  }, []);

  //fetches comment likes
  useEffect(() => {
    const fetchCommentLikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/getCommentLikes/${carID}`
        );
        setCommentLikes(response.data);
      } catch (error) {
        console.error("Error fetching comment likes", error);
      }
    };
    fetchCommentLikes();
  }, []);

  //fetches comment dislikes
  useEffect(() => {
    const fetchCommentDislikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/getCommentDislikes/${carID}`
        );
        setCommentDislikes(response.data);
      } catch (error) {
        console.error("Error fetching comment likes", error);
      }
    };
    fetchCommentDislikes();
  }, []);

  //function for when a user likes a review
  const handleReviewLike = async (reviewID) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/submitReviewLike",
        { reviewID },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert(response.data);
      const updatedLikes = await axios.get(
        `http://localhost:3002/getReviewLikes/${carID}`
      );
      setReviewLikes(updatedLikes.data);
    } catch (error) {
      console.error("Error liking review", error);
      alert("Error liking review");
    }
  };

  //function for when a user dislikes a review
  const handleReviewDisLike = async (reviewID) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/submitReviewDislike",
        { reviewID },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert(response.data);
      const updatedLikes = await axios.get(
        `http://localhost:3002/getReviewDislikes/${carID}`
      );
      setReviewDislikes(updatedLikes.data);
    } catch (error) {
      console.error("Error liking review", error);
      alert("Error liking review");
    }
  };

  //function to handle like a comment
  const handleCommentLikes = async (commentID) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/submitCommentLike",
        { commentID },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert(response.data);
      const updatedLikes = await axios.get(
        `http://localhost:3002/getCommentLikes/${carID}`
      );
      setCommentLikes(updatedLikes.data);
    } catch (error) {
      console.error("Error liking comment", error);
      alert("Error liking comment");
    }
  };

  //funcition to handle disliking a comment
  const handleCommentDislikes = async (commentID) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/submitCommentDislike",
        { commentID },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert(response.data);
      const updatedLikes = await axios.get(
        `http://localhost:3002/getCommentDislikes/${carID}`
      );
      setCommentDislikes(updatedLikes.data);
    } catch (error) {
      console.error("Error liking comment", error);
      alert("Error liking comment");
    }
  };

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
            <div className="flex flex-row mt-3 gap-2">
              <img
                className="cursor-pointer object-contain"
                src={thumbs_up}
                width={17}
                onClick={() => {
                  handleReviewLike(review.review_ID);
                }}
              ></img>
              {reviewLikes.find((like) => like.review_ID === review.review_ID)
                ?.like_count || 0}
              <img
                className="cursor-pointer rotate-180 object-contain"
                src={thumbs_down}
                width={17}
                onClick={() => {
                  handleReviewDisLike(review.review_ID);
                }}
              ></img>
              {reviewDislikes.find(
                (dislike) => dislike.review_ID === review.review_ID
              )?.like_count || 0}
            </div>
            <div className="mt-4">
              <h2 className="text-lg">Comments:</h2>
              {comments
                .filter((comment) => comment.review_ID === review.review_ID)
                .map((comment, commentIndex) => (
                  <div
                    key={commentIndex}
                    className="border-t border-gray-300 pt-2 mt-2"
                  >
                    <p>
                      {comment.name}: {comment.textualContent}
                    </p>
                    <div className="flex flex-row mt-3 gap-2">
                      <img
                        className="cursor-pointer object-contain"
                        src={thumbs_up}
                        width={12}
                        onClick={() => handleCommentLikes(comment.comment_ID)}
                      ></img>
                      {commentLikes.find(
                        (like) => like.comment_ID === comment.comment_ID
                      )?.like_count || 0}
                      <img
                        className="rotate-180 cursor-pointer object-contain"
                        src={thumbs_down}
                        width={12}
                        onClick={() =>
                          handleCommentDislikes(comment.comment_ID)
                        }
                      ></img>
                      {commentDislikes.find(
                        (dislike) => dislike.comment_ID === comment.comment_ID
                      )?.dislike_count || 0}
                    </div>
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
