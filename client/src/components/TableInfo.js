import React, { useState } from "react";

const TableInfo = ({ data, setIsShowModalInf }) => {

  return (
    <div className="table-container">
      <table className="table-auto mb-6 text-left w-full ">
        <thead className="font-bold bg-gray-700 text-[13px]  text-white">
          <tr className="border border-gray-500">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2 w-[160px] line-clamp-2">Citizen Identification</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Birthday</th>
            <th className="px-4 py-2">Atm</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Password</th>
          </tr>
        </thead>
        <tbody >
          {data?.map((e, index) => (
            <tr key={e._id} className="border hover:cursor-pointer hover:bg-slate-200" onClick={() => setIsShowModalInf(e)}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2 ">{e.citizenIdentificationNumber}</td>
              <td className="px-4 py-2">{e.name}</td>
              <td className="px-4 py-2">{e.birthday}</td>
              <td className="px-4 py-2">{e.atm}</td>
              <td className="px-4 py-2">{e.address}</td>
              <td className="px-4 py-2">{e.phoneNumber}</td>
              <td className="px-4 py-2 w-[110px] line-clamp-1">{e.email}</td>
              <td className="px-4 py-2">{e.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.length === 0 && (
        <div className="font-bold text-xl flex justify-center items-center text-gray-700">
          <h3>Table has no data.</h3>
        </div>
      )}
    </div>
  );
};

export default TableInfo;
