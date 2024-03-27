import React from "react";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const Header = (props) => {
  const navigate = useNavigate();
  const handleOnClickLogout = () => {
    localStorage.removeItem("citizenIdentificationNumber");
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["x-auth-token"];
    navigate("/");
  };
  return (
    <div className="h-[8vh] bg-neutral-300 w-full flex justify-between pr-5 items-center">
      <div className="pl-6 font-bold text-[60px] flex justify-center items-center font-serif italic  text-gray-700">
        XIX
      </div>
      <div>
        <div className="flex border-red-50 border-2 p-1 rounded-lg ">
          <span className="flex items-center justify-center pl-2">
            {props?.data?.slice(0, 1).toUpperCase() + props?.data?.slice(1)}
          </span>
          <Button
            style={
              "ml-2 text-slate-50 bg-gray-700 hover:bg-black  border-solid border-2 rounded-lg border-blue-400 p-1.5"
            }
            handleOnClick={handleOnClickLogout}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
