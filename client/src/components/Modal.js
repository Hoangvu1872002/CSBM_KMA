import React, { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { reverseTransformData } from "../ultils/helper";
import DataSevices from "../services/dataServices";
import Swal from "sweetalert2";
const Modal = ({
  setShowModal,
  dataTableAuthorization,
  dataTableInfoUsers,
  individual,
  setResetData,
}) => {
  const [dataUpdateAuth, setDataUpdateAuth] = useState({
    name: "",
    birthday: "",
    atm: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [userAuthSearch, setUserAuthSearch] = useState({
    citizenIdentificationNumber: "",
  });
  const [mesSearch, setMesSearch] = useState(
    "Please do find the user you want to authorize."
  );
  const [idUserAddAuth, setIdUserAddAuth] = useState();

  const handleCheckboxChange = (event, checkboxName) => {
    const { checked } = event.target;
    setDataUpdateAuth({ ...dataUpdateAuth, [checkboxName]: checked });
  };

  const handleSearchAddAuth = (userAuthSearch) => {
    if (dataTableAuthorization?.find((e) => e.id_others === userAuthSearch)) {
      setMesSearch("This user already exists in authorization.");
    } else if (
      !dataTableInfoUsers?.find(
        (e) => e.citizenIdentificationNumber === userAuthSearch
      )
    ) {
      setMesSearch("No users were found with the ID card number above.");
    } else if (individual.citizenIdentificationNumber === userAuthSearch) {
      setMesSearch("Don't delegate to yourself.");
    } else {
      setMesSearch("");
      setIdUserAddAuth(userAuthSearch);
    }
  };

  const handleSubmitAddUserAuth = async () => {
    const dataChange = reverseTransformData(
      { ...dataUpdateAuth, id_others: idUserAddAuth },
      individual.citizenIdentificationNumber
    );
    console.log(dataChange);
    if (dataChange) {
      const rs = await DataSevices.addDecentralization(dataChange);
      if (rs.data.success) {
        Swal.fire("Congratulation!", rs.mes, "success").then(() => {
          setResetData((prev) => !prev);
          setShowModal((prev) => !prev);
        });
      } else {
        Swal.fire("Oops!", rs.data.mes, "error");
      }
    }
  };

  return (
    <div>
      <div className="modall">
        <div className="overlay"></div>
        <div className="modal-content">
          <div className="flex justify-center font-bold text-lg mt-5">
            <p>Add Authorization</p>
          </div>
          <div className=" flex flex-col  mt-4 mb-3">
            <div>
              <span>
                Enter the ID card number of the person you want to authorize:
              </span>
              <div className=" flex gap-2">
                <div className="w-[400px]">
                  <InputField
                    nameKey={"citizenIdentificationNumber"}
                    value={userAuthSearch?.citizenIdentificationNumber}
                    setValue={setUserAuthSearch}
                    placeholder="Search citizen identification number..."
                    isShowLaybel
                  ></InputField>
                </div>
                <Button
                  handleOnClick={() =>
                    handleSearchAddAuth(
                      userAuthSearch?.citizenIdentificationNumber
                    )
                  }
                >
                  Search
                </Button>
              </div>
            </div>
            {mesSearch && (
              <div className="flex justify-center items-center">
                {mesSearch}
              </div>
            )}
            {!mesSearch && (
              <div className="flex flex-col gap-4">
                <div className=" flex flex-col gap-5">
                  <div className="w-full flex justify-center items-center">
                    <p>Choose what information you allow others to see.</p>
                  </div>

                  <div className="flex gap-4">
                    <span className="flex flex-col">
                      <input
                        type="checkbox"
                        checked={dataUpdateAuth.name}
                        onChange={(event) =>
                          handleCheckboxChange(event, "name")
                        }
                      />
                      <span>{"Name"}</span>
                    </span>
                    <br></br>
                    <span className="flex flex-col">
                      <input
                        type="checkbox"
                        checked={dataUpdateAuth.birthday}
                        onChange={(event) =>
                          handleCheckboxChange(event, "birthday")
                        }
                      />
                      <span>{"Birthday"}</span>
                    </span>
                    <br></br>
                    <span className="flex flex-col">
                      <input
                        type="checkbox"
                        checked={dataUpdateAuth.atm}
                        onChange={(event) => handleCheckboxChange(event, "atm")}
                      />
                      <span>{"Atm"}</span>
                    </span>
                    <br></br>
                    <span className="flex flex-col">
                      <input
                        type="checkbox"
                        checked={dataUpdateAuth.address}
                        onChange={(event) =>
                          handleCheckboxChange(event, "address")
                        }
                      />
                      <span>{"Address"}</span>
                    </span>
                    <br></br>
                    <span className="flex flex-col">
                      <input
                        type="checkbox"
                        checked={dataUpdateAuth.phoneNumber}
                        onChange={(event) =>
                          handleCheckboxChange(event, "phoneNumber")
                        }
                      />
                      <span>{"Phone"}</span>
                    </span>
                    <br></br>
                    <span className="flex flex-col">
                      <input
                        type="checkbox"
                        checked={dataUpdateAuth.email}
                        onChange={(event) =>
                          handleCheckboxChange(event, "email")
                        }
                      />
                      <span>{"Email"}</span>
                    </span>
                    <br></br>
                    <span className="flex flex-col">
                      <input
                        type="checkbox"
                        checked={dataUpdateAuth.password}
                        onChange={(event) =>
                          handleCheckboxChange(event, "password")
                        }
                      />
                      <span>{"Password"}</span>
                    </span>
                  </div>
                </div>
                <Button fw handleOnClick={handleSubmitAddUserAuth}>
                  Submit
                </Button>
              </div>
            )}
          </div>
          <div className="close-modal flex">
            <div className="mt-[-3px]">
              <Button
                style={
                  "px-3 py-1 mr-[-5px] rounded-md text-white bg-gray-700 text-seminold"
                }
                handleOnClick={() => setShowModal((prev) => !prev)}
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
