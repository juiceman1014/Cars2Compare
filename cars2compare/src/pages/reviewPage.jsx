import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

const ReviewPage = () => {
  const { user } = useContext(UserContext);
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [content, setContent] = useState("");
  
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get("http://localhost:3002/years");
        setYears(response.data);
      }catch (error){
        console.error("Error fetching years", error);
      }
    };

    const fetchMakes = async () => {
      try {
        const response = await axios.get("http://localhost:3002/makes");
        setMakes(response.data);
      }catch (error){
        console.error("Error fetching makes", error);
      }
    };

    fetchYears();
    fetchMakes();
  }, []);

  useEffect(() => {
    const fetchModels = async() => {
      if(!make){
        return;
      }

      try{
        const response = await axios.get(`http://localhost:3002/models/${make}`);
        setModels(response.data);
      }catch (error) {
        console.error("Error fetching models", error);
      }
    };

    fetchModels();
  }, [make]);
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-20">
        <div className="flex flex-col items-center h-[500px] w-[400px] border-[2px] gap-2 border-black">
          <h1 className="mt-5">Review</h1>
          <div className="flex flex-col gap-10 mt-5 w-[300px] h-[400px]">
            <div className="flex flex-row items-center gap-10">
              <h1 className="mr-3">Year</h1>
              <select value = {year} onChange={(e) => setYear(e.target.value)}>
                <option value = "">Pick One</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center gap-10">
              <h1 className="mr-1">Make</h1>
              <select value = {make} onChange={(e) => setMake(e.target.value)}>
                <option value = "">Pick One</option>
                {makes.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center gap-10">
              <h1 className="ml-[-2px]"> Model</h1>
              <select value = {model} onChange={(e) => setModel(e.target.value)}>
                <option value = "">Pick One</option>
                {models.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
            <div className = "flex flex-row items-center">
                <p className = "p-[5px]">Review:</p>
                <textarea className = "border-[3px] border-black" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <button className = "border-black border-[2px] w-3/6">Submit Review</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
