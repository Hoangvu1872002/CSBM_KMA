import React, { useEffect, useState } from "react";
import DataSevices from "../services/dataServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reverseTransformData, transformData } from "../ultils/helper";


const TableAuthorization = ({ data, individual, setResetData }) => {
  const transformedData = transformData(data);

  const [editElm, setEditElm] = useState();

  const handleDeleteAuth = async(id_others) => {
    const rs = await DataSevices.deleteDecentralization({
      id_main: individual.citizenIdentificationNumber,
      id_others,
    });
    if (rs.data.success) {
      toast.success(rs.data.mes);
      setResetData((prev) => !prev);
    } else {
      toast.error(rs.data.mes);
    }
  };

  // Khởi tạo state để theo dõi trạng thái của các checkbox
  const [checkboxValues, setCheckboxValues] = useState(transformedData);

  // Hàm xử lý sự kiện thay đổi trạng thái của checkbox
  const handleCheckboxChange = (event, id, checkboxName) => {
    const { checked } = event.target;
    const updatedData = checkboxValues.map((e) =>
      e.id_others === id ? { ...e, [checkboxName]: checked } : e
    );
    // console.log(updatedData);
    setCheckboxValues(updatedData);
  };

  useEffect(() => {
    setCheckboxValues(transformedData)
  },[transformedData?.length])

  const handleUpdate = async (data, id_main, id_others) => {
    const dataChange = reverseTransformData(data, id_main);
    if (dataChange) {
      const rs = await DataSevices.updateDecentralization({
        id_main,
        dataChange,
        id_others,
      });
      if (rs.data.success) {
        toast.success(rs.data.mes);
        setEditElm(null);
        setResetData((prev) => !prev);
      } else {
        toast.error(rs.data.mes);
      }
    }
  };

  return (
    <div>
      <div className="table-container h-[550px]">
        <table className="table-auto mb-6 text-left w-full ">
          <thead className="font-bold bg-gray-700 text-[13px]  text-white">
            <tr className="border border-gray-500">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2 w-[130px] line-clamp-2">
                Citizen Identification
              </th>
              {/* <th className="px-4 py-2">Check All</th> */}
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Birthday</th>
              <th className="px-4 py-2">Atm</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {checkboxValues?.map((e, index) => (
              <tr key={e.id_others} className=" border">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 ">{e.id_others}</td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={e.name}
                    onChange={(event) =>
                      handleCheckboxChange(event, e.id_others, "name")
                    }
                    disabled={
                      editElm?.id_others === e?.id_others ? false : true
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={e.birthday}
                    onChange={(event) =>
                      handleCheckboxChange(event, e.id_others, "birthday")
                    }
                    disabled={
                      editElm?.id_others === e?.id_others ? false : true
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={e.atm}
                    onChange={(event) =>
                      handleCheckboxChange(event, e.id_others, "atm")
                    }
                    disabled={
                      editElm?.id_others === e?.id_others ? false : true
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={e.address}
                    onChange={(event) =>
                      handleCheckboxChange(event, e.id_others, "address")
                    }
                    disabled={
                      editElm?.id_others === e?.id_others ? false : true
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={e.phoneNumber}
                    onChange={(event) =>
                      handleCheckboxChange(event, e.id_others, "phoneNumber")
                    }
                    disabled={
                      editElm?.id_others === e?.id_others ? false : true
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={e.email}
                    onChange={(event) =>
                      handleCheckboxChange(event, e.id_others, "email")
                    }
                    disabled={
                      editElm?.id_others === e?.id_others ? false : true
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={e.password}
                    onChange={(event) =>
                      handleCheckboxChange(event, e.id_others, "password")
                    }
                    disabled={
                      editElm?.id_others === e?.id_others ? false : true
                    }
                  />
                </td>
                <td className="px-4 py-2 w-[135px]">
                  {editElm?.id_others === e.id_others ? (
                    <span className="">
                      <button
                        onClick={() =>
                          handleUpdate(
                            checkboxValues.find(
                              (el) => el.id_others === editElm?.id_others
                            ),
                            individual?.citizenIdentificationNumber,
                            e.id_others
                          )
                        }
                        className="pr-2 text-orange-600 hover:underline cursor-pointer"
                      >
                        Update
                      </button>
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        setEditElm(e);
                      }}
                      className="pr-2 text-orange-600 hover:underline cursor-pointer"
                    >
                      Edit
                    </span>
                  )}
                  {editElm?.id_others === e.id_others ? (
                    <span className="">
                      <span
                        onClick={() => {
                          setEditElm(null);
                          setCheckboxValues(transformedData);
                        }}
                        className="pr-2 text-orange-600 hover:underline cursor-pointer"
                      >
                        Back
                      </span>
                    </span>
                  ) : (
                    <span
                      onClick={() => handleDeleteAuth(e.id_others)}
                      className="px-2 text-orange-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="w-full">
        <AddAuthorization></AddAuthorization>
      </div> */}
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default TableAuthorization;
