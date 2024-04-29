import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import fileSystemLogo from "../assets/logo.png";
import { axiosInstanceNoAuth } from "../api/axiosInstance";
import Button from "./Button";

const SignupPage = () => {
  const firstnameref = useRef();
  const lastnameref = useRef();
  const phoneref = useRef();
  const userref = useRef();
  const passref = useRef();
  const emailref = useRef();
  const consfirmpassref = useRef();
  const [message, getmessage] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      navigate("/home");
    }
  }, [navigate]);
  const signUp = async () => {
    setIsLoading(true);
    try {
      const signupData = {
        first_name: firstnameref.current.value,
        last_name: lastnameref.current.value,
        username: userref.current.value,
        password: passref.current.value,
        email: emailref.current.value,
        phone: phoneref.current.value,
      };

      const response = await axiosInstanceNoAuth.post(
        "auth/register",
        signupData
      );

      console.log(response.data.status);
      if (response.data.status === 200) {
        navigate("/login");
      } else {
        setIsLoading(false);
      }
      console.log(response.data.status);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
      <div className="w-5/6 max-w-[640px]">
        <div className="w-3/5 m-auto mb-12">
          <img src={fileSystemLogo} alt="logo" className="h-auto max-w-full" />
        </div>

        <div className="px-6 py-8 overflow-hidden bg-white border border-gray-300 rounded-lg">
          <div
            className={`p-4 pt-0 text-center text-3xl font-bold text-gray-800`}
          >
            <h3>Signup</h3>
          </div>
          <form
            className="space-y-6 "
            onSubmit={(e) => {
              e.preventDefault();
              if (passref.current.value === consfirmpassref.current.value) {
                signUp();
                getmessage(false);
              } else {
                getmessage(true);
              }
            }}
            action="#"
            method="POST"
          >
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-grey-900"
                >
                  First Name
                </label>
                <input
                  id="first_name"
                  ref={firstnameref}
                  name="first_name"
                  type="text"
                  autoComplete="new-password"
                  required
                  className="block w-full px-2 py-2 text-gray-900 border-0 rounded-md shadow-sm bg-primary-50 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6 text-grey-900"
                >
                  Last Name
                </label>
                <input
                  id="last_name"
                  ref={lastnameref}
                  name="last_name"
                  type="text"
                  autoComplete="new-password"
                  required
                  className="block w-full px-2 py-2 text-gray-900 border-0 rounded-md shadow-sm bg-primary-50 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-grey-900"
                >
                  Username
                </label>
                <input
                  id="username"
                  ref={userref}
                  name="username"
                  type="text"
                  autoComplete="new-password"
                  required
                  className="block w-full px-2 py-2 text-gray-900 border-0 rounded-md shadow-sm bg-primary-50 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-grey-900"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  ref={emailref}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-2 py-2 text-gray-900 border-0 rounded-md shadow-sm bg-primary-50 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-grey-900"
              >
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                ref={phoneref}
                type="tel"
                autoComplete="tel"
                required
                className="block w-full px-2 py-2 text-gray-900 border-0 rounded-md shadow-sm bg-primary-50 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  ref={passref}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-2 py-2 text-gray-900 border-0 rounded-md shadow-sm bg-primary-50 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  ref={consfirmpassref}
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full px-2 py-2 text-gray-900 border-0 rounded-md shadow-sm bg-primary-50 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {message ? (
              <span className="block text-lg font-medium leading-6 text-red-600">
                Password does not match{" "}
              </span>
            ) : (
              <></>
            )}

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Signing" : "Sign"} Up
              </Button>
            </div>
          </form>

          <p className="mt-10 text-sm text-center text-gray-500">
            Already Signed Up ?
            <Link
              to={"/"}
              className="font-semibold leading-6 text-primary-700 hover:underline"
            >
              {" "}
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
