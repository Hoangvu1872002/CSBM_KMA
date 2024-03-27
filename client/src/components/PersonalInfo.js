import React from 'react';

const PersonalInfo = ({data}) => {
    return (
        <div className='border'>
            <div className="flex justify-center font-bold text-lg mt-3 text-gray-700">
              <p>Personal Information</p>
            </div>
            <div className="inf flex justify-around  mt-10 mb-3 ml-2">
              <div className="lable">
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

              <div className="contentModel ml-2 mr-1">
                <p> {data?.citizenIdentificationNumber}</p> <br></br>
                <p> {data?.name}</p> <br></br>
                <p> {data?.birthday}</p> <br></br>
                <p> {data?.atm}</p> <br></br>
                <p> {data?.address}</p> <br></br>
                <p> {data?.phoneNumber}</p> <br></br>
                <p> {data?.email}</p> <br></br>
                <p> {data?.password}</p> <br></br>
              </div>
            </div>
        </div>
    );
};

export default PersonalInfo;