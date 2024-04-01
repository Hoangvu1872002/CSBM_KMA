import React from "react";
import Button from "./Button";

const Modal = ({isShowModalInf, setIsShowModalInf}) => {
  return (
    <div>
        <div className="modall mt-10">
          <div className="overlay"></div>
          <div className="modal-content px-12">
            <div className="flex justify-center font-bold text-lg border-b pb-3 border-gray-800">
              <p>Information User</p>
            </div>
            <div className="inf flex justify-around  mt-4 mb-3 gap-8 ">
              <div className="lable">
                <p>Citizen identification: </p> <br></br>
                <p>Name: </p> <br></br>
                <p>Birthday: </p> <br></br>
                <p>Atm: </p> <br></br>
                <p>Address: </p> <br></br>
                <p>Phone number: </p> <br></br>
                <p>Email: </p> <br></br>
                <p>Password: </p> <br></br>
              </div>

              <div className="contentModel">
                <p> {isShowModalInf?.citizenIdentificationNumber}</p> <br></br>
                <p> {isShowModalInf?.name}</p> <br></br>
                <p> {isShowModalInf?.birthday}</p> <br></br>
                <p> {isShowModalInf?.atm}</p> <br></br>
                <p> {isShowModalInf?.address}</p> <br></br>
                <p> {isShowModalInf?.phoneNumber}</p> <br></br>
                <p> {isShowModalInf?.email}</p> <br></br>
                <p> {isShowModalInf?.password}</p> <br></br>
              </div>
            </div>
            <div className="close-modal flex">
            <div className="mt-[-3px]">
              <Button
                style={
                  "px-3 py-1 mr-[-5px] rounded-md text-white bg-gray-700 text-seminold"
                }
                handleOnClick={() => setIsShowModalInf(null)}
              >
                X
              </Button>
            </div>
          </div>
          </div>
        </div>
    </div>
  );
};

export default Modal;
