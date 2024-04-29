import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import fileSystemLogo from "../assets/logo.png";

const LoginPage = () => {
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //Retrieving the access Token
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      navigate("/home");
      return;
    }
  }, [navigate]);

  const login = async () => {
    const username = emailref.current.value,
      password = passwordref.current.value;
    if (username && password) {
      setIsLoading(true);
      try {
        const postData = {
          // Specify any data to be sent in the request body
          //'GodUser#123'
          //'god_user'

          username: emailref.current.value,
          password: passwordref.current.value,
        };

        /* endpoint:54.198.138.169 */
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_API_URL}auth/login`,
          postData,
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );
        // const response = await axios.get('http://54.198.138.169:7000/swagger-ui/index.html#/Profile%20Controller/minio');

        const { access_token, username } = response?.data?.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem(
          "roles",
          JSON.stringify(response?.data?.data?.roles[0])
        );
        localStorage.setItem("username", JSON.stringify(username));
        navigate("/home");

        //console.log(data?.data[0]?.access_token);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    } else {
      // handle if no username and password are not priovided
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
      <div className="w-5/6 max-w-[640px]">
        {" "}
        <div className="w-3/5 m-auto mb-12">
          <img src={fileSystemLogo} alt="logo" className="h-auto max-w-full" />
        </div>
        {/* <h1 className="gap-6 mb-12 text-4xl font-extrabold tracking-wider text-center sm:text-5xl md:text-6xl xl:text-7xl text-primary-500">
          File System POC
        </h1> */}
        <div className="px-6 py-8 overflow-hidden bg-white border border-gray-300 rounded-lg">
          <div className={`p-4 text-center text-3xl font-bold text-gray-800`}>
            <h3>Login</h3>
          </div>
          <form
            className="space-y-6"
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-grey-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  ref={emailref}
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="block max-h-10 w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-md text-gray-900 shadow-sm disabled:cursor-not-allowed"
                />{" "}
                {/* Increased py value */}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    // to={"/signup"}
                    className="font-semibold leading-6 text-primary-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  ref={passwordref}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block max-h-10 w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-md text-gray-900 shadow-sm disabled:cursor-not-allowed"
                />{" "}
                {/* Increased py value */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-3 py-2 text-sm font-semibold leading-6 text-white rounded-md shadow-sm disabled:bg-primary disabled:cursor-not-allowed bg-primary-600 hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? "Signing" : "Sign"} In
              </button>{" "}
              {/* Increased py value */}
            </div>
          </form>

          <p className="mt-10 text-sm text-center text-gray-500">
            Not a member?
            <Link
              // to={"/signup"}
              className="font-semibold leading-6 text-primary-700 hover:underline"
            >
              {" "}
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
