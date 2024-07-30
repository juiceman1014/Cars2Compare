import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const [yearsTwo, setYearsTwo] = useState([]);
  const [makesTwo, setMakesTwo] = useState([]);
  const [modelsTwo, setModelsTwo] = useState([]);
  const [yearTwo, setYearTwo] = useState("");
  const [makeTwo, setMakeTwo] = useState("");
  const [modelTwo, setModelTwo] = useState("");

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get("http://localhost:3002/years");
        setYears(response.data);
      } catch (error) {
        console.error("Error fetching years", error);
      }
    };

    const fetchMakes = async () => {
      try {
        const response = await axios.get("http://localhost:3002/makes");
        setMakes(response.data);
      } catch (error) {
        console.error("Error fetching makes", error);
      }
    };

    fetchYears();
    fetchMakes();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (!make || !year) {
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3002/models/${make}/${year}`
        );
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models", error);
      }
    };

    fetchModels();
  }, [make, year]);

  useEffect(() => {
    const fetchYearsTwo = async () => {
      try {
        const response = await axios.get("http://localhost:3002/years");
        setYearsTwo(response.data);
      } catch (error) {
        console.error("Error fetching years", error);
      }
    };

    const fetchMakesTwo = async () => {
      try {
        const response = await axios.get("http://localhost:3002/makes");
        setMakesTwo(response.data);
      } catch (error) {
        console.error("Error fetching makes", error);
      }
    };

    fetchYearsTwo();
    fetchMakesTwo();
  }, []);

  useEffect(() => {
    const fetchModelsTwo = async () => {
      if (!makeTwo || !yearTwo) {
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3002/models/${makeTwo}/${yearTwo}`
        );
        setModelsTwo(response.data);
      } catch (error) {
        console.error("Error fetching models", error);
      }
    };

    fetchModelsTwo();
  }, [makeTwo, yearTwo]);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-20">
        <div className="flex flex-col items-center h-[500px] w-[400px] border-[2px] gap-2 border-black">
          <h1 className="mt-5">Review</h1>
          <div className="flex flex-col gap-10 mt-5 w-[300px] h-[400px]">
            <div className="flex flex-row items-center gap-10">
              <h1 className="mr-3">Year</h1>
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Pick One</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center gap-10">
              <h1 className="mr-1">Make</h1>
              <select value={make} onChange={(e) => setMake(e.target.value)}>
                <option value="">Pick One</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center gap-10">
              <h1 className="ml-[-2px]">Model</h1>
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="">Pick One</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center h-[500px] w-[400px] border-[2px] gap-2 border-black">
          <h1 className="mt-5">Review</h1>
          <div className="flex flex-col gap-10 mt-5 w-[300px] h-[400px]">
            <div className="flex flex-row items-center gap-10">
              <h1 className="mr-3">Year</h1>
              <select
                value={yearTwo}
                onChange={(e) => setYearTwo(e.target.value)}
              >
                <option value="">Pick One</option>
                {yearsTwo.map((yearTwo) => (
                  <option key={yearTwo} value={yearTwo}>
                    {yearTwo}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center gap-10">
              <h1 className="mr-1">Make</h1>
              <select
                value={makeTwo}
                onChange={(e) => setMakeTwo(e.target.value)}
              >
                <option value="">Pick One</option>
                {makesTwo.map((makeTwo) => (
                  <option key={makeTwo} value={makeTwo}>
                    {makeTwo}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center gap-10">
              <h1 className="ml-[-2px]">Model</h1>
              <select
                value={modelTwo}
                onChange={(e) => setModelTwo(e.target.value)}
              >
                <option value="">Pick One</option>
                {modelsTwo.map((modelTwo) => (
                  <option key={modelTwo} value={modelTwo}>
                    {modelTwo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center my-[10px]">
        <button
          className="text-center w-[100px] border-[2px] border-black"
          onClick={() => {
            if (!year || !make || !model || !yearTwo || !makeTwo || !modelTwo) {
              console.error("Need all cars");
              return;
            }
            navigate(
              `/Result?year=${year}&make=${make}&model=${model}&yearTwo=${yearTwo}&makeTwo=${makeTwo}&modelTwo=${modelTwo}`
            );
          }}
        >
          Compare
        </button>
      </div>
    </>
  );
};

export default SearchPage;
