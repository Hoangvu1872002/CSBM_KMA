import React, { useCallback, useEffect, useState } from "react";
import Footer from "../../Layout/Footer";
import Header from "../../Layout/Header";
import {
  Button,
  InputField,
  Modal,
  ModalInf,
  PersonalInfo,
  TableAuthorization,
  TableInfo,
} from "../../components";
import DataSevices from "../../services/dataServices";
import axiosInstance from "../../services/axiosInstance";

const Home = () => {
  const citizenIdentificationNumber = JSON.parse(
    localStorage.getItem("citizenIdentificationNumber")
  );

  const [dataTableInfoUsers, setDataTableInfoUsers] = useState();
  const [isShowModalInf, setIsShowModalInf] = useState();
  const [dataTableInfoUsersSearch, setDataTableInfoUsersSearch] = useState();
  const [dataTableAuthorization, setDataTableAuthorization] = useState();
  const [individual, setIndividual] = useState();
  const [showModal, setShowModal] = useState(false);
  const [resetData, setResetData] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [search, setSearch] = useState({
    citizenIdentificationNumber: "",
  });

  const handleSetShowTable = () => {
    setShowTable((prev) => !prev);
    setDataTableInfoUsersSearch("");
  };

  const fetchInfPersonal = async () => {
    if (citizenIdentificationNumber) {
      const rs = await DataSevices.getInfPersonal(citizenIdentificationNumber);
      if (rs.data.success) {
        setIndividual(rs?.data?.individual);
      }
    }
  };

  const fetchDataUsers = useCallback(async () => {
    if (citizenIdentificationNumber) {
      const rs = await DataSevices.getDataUsers(citizenIdentificationNumber);
      if (rs?.data.listDataUser) {
        setDataTableInfoUsers(rs?.data.listDataUser);
      }
      // setIndividual(rs?.data?.individual);
    }
  }, [citizenIdentificationNumber]);

  const fetchDataDecentralizations = useCallback(async () => {
    if (citizenIdentificationNumber) {
      const rs = await DataSevices.getDecentralization(
        citizenIdentificationNumber
      );
      setDataTableAuthorization(rs?.data?.listDataUserAuthorizations);
    }
  }, [citizenIdentificationNumber]);

  const handeleSearch = () => {
    if (search.citizenIdentificationNumber !== "") {
      let dataSearch;
      if (showTable) {
        dataSearch = dataTableInfoUsers?.find(
          (e) =>
            e?.citizenIdentificationNumber ===
            search?.citizenIdentificationNumber
        );
      } else {
        dataSearch = dataTableAuthorization?.find(
          (e) =>
            e?.citizenIdentificationNumber ===
            search?.citizenIdentificationNumber
        );
      }
      if (dataSearch) {
        setDataTableInfoUsersSearch([dataSearch]);
      } else setDataTableInfoUsersSearch([]);
    } else setDataTableInfoUsersSearch(null);
  };

  const handleSetShowModelAddAuthor = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    if (tokenLocalStorage) {
      try {
        axiosInstance.defaults.headers.common["x-auth-token"] =
          tokenLocalStorage;
        fetchInfPersonal();
      } catch (error) {
        delete axiosInstance.defaults.headers.common["x-auth-token"];
      }
    }
  }, []);

  useEffect(() => {
    fetchDataUsers();
    fetchDataDecentralizations();
  }, [resetData]);

  return (
    <div>
      <div className="top-0 w-full">
        <Header data={individual?.name}></Header>
      </div>
      <div className="flex w-full pt-5">
        <div className="w-[30%] pl-5 pt-2">
          <PersonalInfo data={individual}></PersonalInfo>
        </div>
        <div className="px-5 w-[70%]">
          <div className="w-full flex justify-between">
            <div className="flex gap-3">
              <div className="w-[350px]">
                <InputField
                  nameKey={"citizenIdentificationNumber"}
                  value={search?.citizenIdentificationNumber}
                  setValue={setSearch}
                  placeholder="Search citizen identification number..."
                  isShowLaybel
                ></InputField>
              </div>
              <Button handleOnClick={handeleSearch}>Search</Button>
            </div>
            <div className=" flex gap-2">
              {!showTable && (
                <Button handleOnClick={handleSetShowModelAddAuthor}>
                  Add Authorization
                </Button>
              )}
              <Button handleOnClick={handleSetShowTable}>
                {showTable
                  ? "Show Table Authorization"
                  : "Show Table Info Users"}
              </Button>
            </div>
          </div>
          {showTable ? (
            <TableInfo
              setIsShowModalInf={setIsShowModalInf}
              data={
                dataTableInfoUsersSearch
                  ? dataTableInfoUsersSearch?.filter(
                      (e) =>
                        e.citizenIdentificationNumber !==
                        individual.citizenIdentificationNumber
                    )
                  : dataTableInfoUsers?.filter(
                      (e) =>
                        e.citizenIdentificationNumber !==
                        individual.citizenIdentificationNumber
                    )
              }
            ></TableInfo>
          ) : (
            <TableAuthorization
              data={
                dataTableInfoUsersSearch
                  ? dataTableInfoUsersSearch
                  : dataTableAuthorization
              }
              individual={individual}
              setResetData={setResetData}
            ></TableAuthorization>
          )}
        </div>
      </div>
      {showModal && (
        <div>
          <Modal
            setShowModal={setShowModal}
            dataTableAuthorization={dataTableAuthorization}
            dataTableInfoUsers={dataTableInfoUsers}
            individual={individual}
            setResetData={setResetData}
          ></Modal>
        </div>
      )}
      {isShowModalInf && (
        <div>
          <ModalInf
            setIsShowModalInf={setIsShowModalInf}
            isShowModalInf={isShowModalInf}
          ></ModalInf>
        </div>
      )}
      <div className="absolute bottom-0 w-full">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
