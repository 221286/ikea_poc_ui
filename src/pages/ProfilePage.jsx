import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import Button from "../components/Button";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("profile/info");
        if (
          [200, 201].includes(response?.data?.status) &&
          response?.data?.data
        ) {
          setUserDetails(response?.data?.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    setIsLoading(true);
    fetchUser().then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <section className="flex items-center justify-center my-5">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative custom-container">
          <div className="relative flex justify-between">
            <h3 className={`text-3xl font-bold text-gray-800 mb-4`}>
              User Profile
            </h3>
            <div>
              <Button
                variant="secondary"
                icon={<ArrowLeftOutlined />}
                onClick={handleBackClick}
              >
                Back
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <div className="w-5/6 max-w-[640px]">
              <div className="px-6 py-8 overflow-hidden bg-white border border-gray-300 rounded-lg">
                <div className="grid grid-cols-1 gap-8 mt-6 text-lg">
                  <div className="grid grid-cols-3 px-3 py-2 ">
                    <label className="font-semibold text-gray-700">
                      User name:
                    </label>
                    <span className="font-bold cols-span-2">
                      {userDetails?.username}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 px-3 py-2 ">
                    <label className="font-semibold text-gray-700">
                      First name:
                    </label>
                    <span className="font-bold cols-span-2">
                      {userDetails?.first_name}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 px-3 py-2 ">
                    <label className="font-semibold text-gray-700">
                      Last name:
                    </label>
                    <span className="font-bold cols-span-2">
                      {userDetails?.last_name}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 px-3 py-2 ">
                    <label className="font-semibold text-gray-700">
                      Email:
                    </label>
                    <span className="font-bold cols-span-2">
                      {userDetails?.email}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 px-3 py-2 ">
                    <label className="font-semibold text-gray-700">
                      Roles:
                    </label>
                    <span className="font-bold cols-span-2">
                      {userDetails?.roles.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
