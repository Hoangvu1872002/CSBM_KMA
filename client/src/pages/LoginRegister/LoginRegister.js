import React, { useCallback, useState } from "react";
import { InputField, Button } from "../../components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validate } from "../../ultils/helper.js";
import AuthServices from "../../services/authServices.js";
import clsx from "clsx";

const LoginRegister = () => {
  const navigate = useNavigate();
  const [payload, setPayLoad] = useState({
    citizenIdentificationNumber: "",
    name: "",
    birthday: "",
    atm: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {
    setPayLoad({
      citizenIdentificationNumber: "",
      name: "",
      birthday: "",
      atm: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
  };
  const [invaliFields, setInvaliFields] = useState([]);
  //   useEffect(() => {}, [isRegister]);

  const handleSubmit = useCallback(async () => {
    const { name, birthday, atm, address, phoneNumber, email, ...data } =
      payload;

    const invalids = isRegister
      ? validate(payload, setInvaliFields)
      : validate(data, setInvaliFields);

    if (invalids === 0) {
      if (isRegister) {
        const response = await AuthServices.register(payload);
        if (response.data.success) {
          Swal.fire("Congratulation!", response.mes, "success").then(() => {
            setIsRegister(false);
            resetPayload();
          });
        } else {
          Swal.fire("Oops!", response.data.mes, "error");
        }
      } else {
        const rs = await AuthServices.login(data);
        if (rs.data.success) {
          localStorage.setItem('citizenIdentificationNumber', JSON.stringify(rs.data.citizenIdentificationNumber));
          localStorage.setItem('token', rs.data.token);
          navigate("/home");
        } else {
          Swal.fire("Oops!", rs.mes, "error");
        }
      }
    }
  }, [payload, isRegister]);
  return (
    <div className="w-screen h-screen relative bg-slate-300">
      <div className="absolute top-0 bottom-0 left-1/2 right-1/2 items-center justify-center flex">
        <div
          className={clsx(
            `p-8 bg-white flex flex-col items-center rounded-md`,
            isRegister ? "min-w-[800px]" : "min-w-[500px]"
          )}
        >
          {/* <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[800px]"> */}
          <h1 className="text-[28px] font-semibold text-gray-700 mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          <div className="w-full">
            {isRegister && (
              <div className="w-full grid grid-cols-2 gap-4">
                <InputField
                  value={payload.name}
                  setValue={setPayLoad}
                  nameKey="name"
                  invaliFields={invaliFields}
                  setInvaliFields={setInvaliFields}
                  fullWidth
                ></InputField>
                <InputField
                  value={payload.birthday}
                  setValue={setPayLoad}
                  nameKey="birthday"
                  invaliFields={invaliFields}
                  setInvaliFields={setInvaliFields}
                  fullWidth
                ></InputField>
                <InputField
                  value={payload.atm}
                  setValue={setPayLoad}
                  nameKey="atm"
                  invaliFields={invaliFields}
                  setInvaliFields={setInvaliFields}
                  fullWidth
                ></InputField>
                <InputField
                  value={payload.address}
                  setValue={setPayLoad}
                  nameKey="address"
                  invaliFields={invaliFields}
                  setInvaliFields={setInvaliFields}
                  fullWidth
                ></InputField>
                <InputField
                  value={payload.phoneNumber}
                  setValue={setPayLoad}
                  nameKey="phone Number"
                  invaliFields={invaliFields}
                  setInvaliFields={setInvaliFields}
                  fullWidth
                ></InputField>
                <InputField
                  value={payload.email}
                  setValue={setPayLoad}
                  nameKey="email"
                  invaliFields={invaliFields}
                  setInvaliFields={setInvaliFields}
                  fullWidth
                ></InputField>
              </div>
            )}
            <div className={clsx(``, isRegister && "flex gap-4 mt-4 mb-2")}>
              <InputField
                value={payload.citizenIdentificationNumber}
                setValue={setPayLoad}
                nameKey="citizen Identification Number"
                invaliFields={invaliFields}
                setInvaliFields={setInvaliFields}
                fullWidth
              ></InputField>
              <InputField
                value={payload.password}
                setValue={setPayLoad}
                nameKey="password"
                type="password"
                invaliFields={invaliFields}
                setInvaliFields={setInvaliFields}
                fullWidth
              ></InputField>
            </div>
          </div>
          <Button handleOnClick={handleSubmit} fw>
            {isRegister ? "Register" : "Login"}
          </Button>
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <div
                className="text-blue-500 hover: underline cursor-pointer w-full text-center"
                onClick={() => {
                  setIsRegister(true);
                  resetPayload();
                  setInvaliFields([]);
                }}
              >
                Create Account.
              </div>
            )}
            {isRegister && (
              <div
                className="text-blue-500 hover: underline cursor-pointer w-full text-center"
                onClick={() => {
                  setIsRegister(false);
                  resetPayload();
                  setInvaliFields([]);
                }}
              >
                Go to login.
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1200} />
    </div>
  );
};

export default LoginRegister;
