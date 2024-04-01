import React from 'react';

const PersonalInfo = ({data}) => {
    return (
        <div className='border'>
            <div className="flex justify-center font-bold text-lg mt-3 text-gray-700 border-b m-3 pb-2">
              <p>Personal Information</p>
            </div>
            <div className="inf flex justify-around  mt-5 mb-3 ml-2">
              <div className="lable mr-1">
                <p>Citizen Identification: </p> <br></br>
                <p>Name: </p> <br></br>
                <p>Birthday: </p> <br></br>
                <p>Atm: </p> <br></br>
                <p>Address: </p> <br></br>
                <p>Phone Number: </p> <br></br>
                <p>Email: </p> <br></br>
                <p>Password: </p> <br></br>
              </div>

              <div className='border'></div>

              <div className="contentModel ml-2 mr-2">
                <div className='contentInf max-w-[220px]'> {data?.citizenIdentificationNumber}</div> <br></br>
                <div className='contentInf max-w-[220px]'> {data?.name}</div> <br></br>
                <div className='contentInf max-w-[220px]'> {data?.birthday}</div> <br></br>
                <div className='contentInf max-w-[220px]'> {data?.atm}</div> <br></br>
                <div className='contentInf max-w-[220px]'> {data?.address}</div> <br></br>
                <div className='contentInf max-w-[220px]'> {data?.phoneNumber}</div> <br></br>
                <div className='contentInf max-w-[220px]'>{data?.email}</div> <br></br>
                <div> {data?.password}</div> <br></br>
              </div>
            </div>
        </div>
    );
};

export default PersonalInfo;