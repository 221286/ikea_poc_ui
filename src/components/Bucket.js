import React, { useEffect, useRef, useState } from "react";
import Bucket_dropdown from "./Bucket_dropdown";
import { Link, useNavigate } from "react-router-dom";
import Bucket_Grant_access from "./Bucket_Grant_access";
import Bucket_create from "./Bucket_create";
import axios from "axios";

const Bucket = () => {
  const bucketNameRef = useRef(null);
  const userNameRef = useRef(null);
  const navigate = useNavigate();
  const [Bucket_page, setBucket_page] = useState(false);
  const [headerselectedOption, headersetSelectedOption] =
    useState("Grant Access");
  const [selectedOption, setSelectedOption] = useState("GRANT");
  const access_token = localStorage.getItem("access_token");
  const roles = JSON.parse(localStorage.getItem("roles"));

  useEffect(() => {
    if (!access_token) {
      navigate("/login");
      return;
    } else if (roles != "ADMIN") {
      navigate("/");
      return;
    }

    handle_header_selection();
  }, [][navigate]);

  const handle_header_selection = () => {
    switch (headerselectedOption) {
      case "Grant Access":
        setBucket_page(false);
        break;
      case "Create Bucket":
        setBucket_page(true);
        break;
      case "Home":
        navigate("/home");
        break;
      case "Sign Out":
        navigate("/login");
        localStorage.clear();
        return;

        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bucketName = bucketNameRef.current.value;
    const userName = userNameRef.current.value;

    const data = {
      bucket_name: bucketName,
      user_name: userName,
      access_type: selectedOption,
    };

    /*end point:54.198.138.169*/
    const url = `http://54.198.138.169:7000/bucket/access?bucket_name=${bucketName}&user_name=${userName}&access_type=${selectedOption}`;

    // Request headers
    const headers = {
      Accept: "*/*",
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const response = await axios.put(url, data, { headers });
      console.log("Response", response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full min-h-screen font-extrabold bg-yellow-400 ">
      <div className="flex items-center justify-between h-24 px-6 bg-blue-700 rounded-b-xl shadow-3xl ">
        <span className="flex items-center gap-4 font-extrabold text-yellow-400 text-7xl ">
          {" "}
          IKEA
        </span>

        <Bucket_dropdown
          headerselectedOption={headerselectedOption}
          headersetSelectedOption={headersetSelectedOption}
        ></Bucket_dropdown>
      </div>
      {Bucket_page ? (
        <Bucket_create></Bucket_create>
      ) : (
        <>
          <Bucket_Grant_access
            handleSubmit={handleSubmit}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            bucketNameRef={bucketNameRef}
            userNameRef={userNameRef}
          ></Bucket_Grant_access>
        </>
      )}
    </div>
  );
};

export default Bucket;
