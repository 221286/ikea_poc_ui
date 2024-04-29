import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeftOutlined,
  DownloadOutlined,
  DeleteOutlined,
  PlusOutlined,
  WarningOutlined,
  PaperClipOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

import createMinioClient from "../utils/mc";
import Button from "../components/Button";
import { axiosInstance } from "../api/axiosInstance";
import Loader from "../components/Loader";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import Table from "../components/Table";
import { formatFileSize } from "../utils/commonUtils";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

let fileReaderStream = require("filereader-stream");

const BucketInfo = () => {
  const navigate = useNavigate();
  const { bucketName } = useParams();

  const [bucketDetails, setBucketDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingConfirmationButton, setIsLoadingConfirmationButton] =
    useState(false);
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);
  const [isGrantAccessModal, setIsGrantAccessModal] = useState(false);
  const [isGrantingAccess, setIsGrantingAccess] = useState(false);

  const [file, setFile] = useState(null);
  const [confirmationModalStates, setConfirmationModalStates] = useState({
    isOpen: false,
    data: null,
  });

  const fileInputRef = useRef(null);
  const userNameRef = useRef(null);
  const userAccessRef = useRef(null);

  const cardBaseStyles =
    "col-span-2 px-6 py-8 overflow-hidden bg-white  border-gray-300  rounded-lg max-h-[420px] shadow-lg flex justify-center";

  const getBucketDataByName = async () => {
    try {
      const bucketResponse = await axiosInstance.get(
        `bucket/${bucketName}/dashboard`
      );
      if (
        [200, 201].includes(bucketResponse?.data?.status) &&
        bucketResponse?.data?.data
      ) {
        const responseData = bucketResponse?.data?.data;

        const contentSizeData = responseData?.data_by_content_size?.reduce(
          (acc, item) => {
            acc.labels.push(item?.group);
            acc.values.push(item?.count);
            acc.files.push(...item?.files);
            return acc;
          },
          { labels: [], values: [], files: [] }
        );

        const contentTypeData = responseData?.data_by_content_type?.reduce(
          (acc, item) => {
            acc.labels.push(item?.group);
            acc.values.push(item?.usage);
            acc.files.push(...item?.files);

            return acc;
          },
          { labels: [], values: [], files: [] }
        );

        const formattedResponse = {
          bucketName: responseData?.bucket_info?.name,
          dataStored: responseData?.total_data_stored,
          createdAt: new Date(
            responseData?.bucket_info?.created_at
          ).toLocaleString("en-GB", { timeZone: "UTC" }),
          region: responseData?.bucket_info?.region,
          storageType: responseData?.bucket_info?.storage_type,
          minioPort: responseData?.bucket_info?.minio_port,
          contentSizeData: contentSizeData,
          contentTypeData: contentTypeData,
        };
        setBucketDetails(formattedResponse);
      } else {
        setIsLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (bucketName) {
      setIsLoading(true);
      getBucketDataByName(bucketName).then(() => {
        setIsLoading(false);
      });
    }
  }, [bucketName]);

  const cardValues = [
    {
      label: "Total Data Stored",
      value: bucketDetails?.dataStored,
    },
    {
      label: "Storage Type",
      value: bucketDetails?.storageType,
    },
    {
      label: "Region",
      value: bucketDetails?.region,
    },
    {
      label: "Minio Port",
      value: bucketDetails?.minioPort,
    },
    {
      label: "Created At",
      value: bucketDetails?.createdAt,
    },
  ];

  const fileColumns = [
    {
      header: "File Name",
      accessorKey: "name",
    },
    {
      header: "Size",
      accessorKey: "size",
    },
    {
      header: "Content Type",
      accessorKey: "contentType",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Last Modified At",
      accessorKey: "lastModifiedAt",
    },
    {
      header: "Actions",
      // accessorKey: 'actions'
      cell: (info) => (
        <div className="flex items-center justify-evenly">
          <button
            type="button"
            title="Download file"
            onClick={() => handleDownloadFile(info?.row?.original)}
          >
            <DownloadOutlined
              style={{
                fontSize: "22px",
                color: "purple",
              }}
            />
          </button>
          <button
            type="button"
            title="Delete file"
            onClick={() => handleDeleteFile(info?.row?.original)}
          >
            <DeleteOutlined
              style={{
                fontSize: "22px",
                color: "red",
              }}
            />
          </button>
        </div>
      ),
    },
  ];

  const handleDownloadFile = async (file) => {
    // mc.fGetObject(
    //   bucketDetails?.bucketName,
    //   file?.name,
    //   `./downloads/${file.name}`,
    //   function (err) {
    //     if (err) {
    //       return console.log(err);
    //     }
    //     console.log("success");
    //   }
    // );

    // var size = 0;
    // mc.getObject(
    //   bucketDetails?.bucketName,
    //   file?.name,
    //   function (err, dataStream) {
    //     if (err) {
    //       return console.log(err);
    //     }
    //     dataStream.on("data", function (chunk) {
    //       size += chunk.length;
    //     });
    //     dataStream.on("end", function () {
    //       console.log("End. Total size = " + size);
    //     });
    //     dataStream.on("error", function (err) {
    //       console.log(err);
    //     });
    //   }
    // );

    const downloadToastId = toast.loading("Downloading...", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });

    // mc.presignedUrl(
    //   "GET",
    //   bucketDetails?.bucketName,
    //   file.name,
    //   1000,
    //   async function (err, presignedUrl) {
    //     if (err) {
    //       // handle error
    //       console.log(err);
    //       Toast({ type: "error", message: "Something went wrong" });
    //       return;
    //     }
    //     console.log("presigned", presignedUrl);
    //     try {
    //       const response = await fetch(presignedUrl);
    //       console.log("file response: " + JSON.stringify(response));
    //       if (Object.keys(response)?.length) {
    //         const blob = await response.blob();
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = file.name.split(".")[0]; // Set the filename here
    //         document.body.appendChild(a);
    //         a.click();
    //         window.URL.revokeObjectURL(url);

    //         toast.update(downloadToastId, {
    //           render: "File is downladed",
    //           type: "success",
    //           isLoading: false,
    //           autoClose: 2000,
    //           hideProgressBar: false,
    //         });
    //       } else {
    //         toast.update(downloadToastId, {
    //           render: "Error in downloading",
    //           type: "error",
    //           isLoading: false,
    //           autoClose: 2000,
    //           hideProgressBar: false,
    //         });
    //       }
    //     } catch (error) {
    //       console.error("Error downloading file:", error);
    //       toast.update(downloadToastId, {
    //         render: "Error in downloading",
    //         type: "error",
    //         isLoading: false,
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //       });
    //     }
    //   }
    // );

    try {
      const presignedUrl = await createMinioClient(
        bucketDetails?.minioPort
      ).presignedUrl("GET", bucketDetails?.bucketName, file.name, 1000);
      if (presignedUrl) {
        const link = document.createElement("a");
        link.href = presignedUrl;
        link.target = "_blank";
        link.setAttribute("download", file.name);

        // Trigger download
        document.body.appendChild(link);
        link.click();

        toast.update(downloadToastId, {
          render: "File is opened in new tab",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: false,
        });

        // Remove the anchor element from the DOM
        document.body.removeChild(link);
      }
    } catch (error) {
      console.log("error in getting presigned url:", error);
      toast.update(downloadToastId, {
        render: "Error in downloading",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  const handleDeleteFile = (file) => {
    console.log(file);
    setConfirmationModalStates({
      isOpen: true,
      data: file,
    });
  };

  const filesData = bucketDetails?.contentSizeData?.files.map((item) => {
    const formattedFileData = {
      name: item.name,
      size: formatFileSize(item.content_size),
      contentType: item.content_type,
      createdAt: new Date(item.created_at).toLocaleString("en-GB", {
        timeZone: "UTC",
      }),
      lastModifiedAt: new Date(item.last_modified).toLocaleString("en-GB", {
        timeZone: "UTC",
      }),
    };
    return formattedFileData;
  });

  const handleBackClick = () => {
    navigate("/home");
  };

  const handleAddFile = () => {
    setIsAddFileModalOpen(true);
  };

  const closeAddFileModal = () => {
    setIsAddFileModalOpen(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const onCloseConfirmationModal = () => {
    setConfirmationModalStates((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const onOkConfirmation = async () => {
    console.log("confirmation ok", confirmationModalStates?.data);
    setIsLoadingConfirmationButton(true);
    try {
      await createMinioClient(bucketDetails?.minioPort).removeObject(
        bucketDetails?.bucketName,
        confirmationModalStates?.data?.name
      );
      await axiosInstance.delete("file/remove", {
        params: {
          bucket_name: bucketDetails?.bucketName,
          file_name: confirmationModalStates.data.name,
        },
      });
      onCloseConfirmationModal();
      setIsLoadingConfirmationButton(false);
      Toast({
        type: "success",
        message: "File deleted successfully",
      });
      // reloading the content
      setIsLoading(true);
      setTimeout(() => {
        getBucketDataByName().then(() => {
          setIsLoading(false);
        });
      }, [1000]);
    } catch (e) {
      console.log(e);
      Toast({
        type: "error",
        message: "Error in deleting file",
      });
      setIsLoadingConfirmationButton(false);
    }
  };

  const handleAddFileModalOk = async () => {
    setIsLoadingConfirmationButton(true);
    const readStream = fileReaderStream(file);
    const metaData = {
      "Content-Type": file.type,
      "X-Amz-Meta-App": "SPH-REACT-JS",
    };
    try {
      await createMinioClient(bucketDetails?.minioPort).putObject(
        bucketDetails?.bucketName,
        file?.name,
        readStream,
        metaData
      );
      await axiosInstance.put(
        `file/add?bucket_name=${bucketDetails?.bucketName}&file_name=${file?.name}`
      );
      closeAddFileModal();
      setIsLoadingConfirmationButton(false);
      Toast({
        type: "success",
        message: "File added successfully",
      });
      // reloading the content
      setIsLoading(true);
      setTimeout(() => {
        getBucketDataByName().then(() => {
          setIsLoading(false);
        });
      }, [1000]);
    } catch (error) {
      console.log(error);
      Toast({
        type: "error",
        message: "Error in adding file",
      });
      setIsLoadingConfirmationButton(false);
    }
  };

  useEffect(() => {
    // clearing the input field on opening the modal
    if (isAddFileModalOpen) {
      setFile(null);
      fileInputRef.current.value = "";
    }
  }, [isAddFileModalOpen]);

  const handleGrantAccess = () => {
    setIsGrantAccessModal(true);
  };

  const handleSubmitGrantAccess = async () => {
    const username = userNameRef.current.value;
    const accessType = userAccessRef.current.value;

    if (username && accessType) {
      setIsGrantingAccess(true);
      try {
        const response = await axiosInstance.put(
          `bucket/access?bucket_name=${bucketDetails?.bucketName}&user_name=${username}&access_type=${accessType}`
        );
        if ([200, 201].includes(response.status)) {
          Toast({
            type: "success",
            message: "Access granted successfully",
          });
          setIsGrantAccessModal(false);
        } else {
          Toast({
            type: "error",
            message: "Error granting access",
            options: {
              autoClose: 2500,
            },
          });
          setIsGrantingAccess(false);
        }
      } catch (error) {
        console.log("error in granting access", error);
        Toast({
          type: "error",
          message:
            error?.response?.data?.error?.displayMessage ??
            "Error granting access",
          options: {
            autoClose: 2500,
          },
        });
        setIsGrantingAccess(false);
      }
    } else {
      Toast({
        type: "warning",
        message: "Please fill required fields",
      });
    }
  };

  return (
    <section className="flex items-center justify-center my-5">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative custom-container bg-primary-50">
          <div className="flex justify-between mb-3">
            <h3
              className={`flex justify-between text-3xl font-bold text-gray-800 mb-4`}
            >
              {bucketDetails?.bucketName}
            </h3>
            <div className="flex items-center gap-4 me-3">
              <Button
                variant="secondary"
                icon={<ArrowLeftOutlined />}
                onClick={handleBackClick}
              >
                Back
              </Button>
              {["ADMIN"].includes(localStorage.getItem("roles")) && (
                <Button
                  variant="primary"
                  icon={<KeyOutlined />}
                  onClick={handleGrantAccess}
                >
                  Grant Access
                </Button>
              )}
            </div>
          </div>
          {/* contents */}
          {filesData?.length ? (
            <>
              <div className="grid grid-cols-5 gap-6">
                <div className={cardBaseStyles}>
                  <BarChart
                    labels={bucketDetails?.contentSizeData?.labels ?? []}
                    values={bucketDetails?.contentSizeData?.values ?? []}
                    isLoading={isLoading}
                    title="Usage by size range"
                  />
                </div>
                <div className={cardBaseStyles}>
                  <PieChart
                    labels={bucketDetails?.contentTypeData?.labels ?? []}
                    values={bucketDetails?.contentTypeData?.values ?? []}
                    isLoading={isLoading}
                    title="Usage by content type"
                  />
                </div>

                <div className="px-2">
                  <h4 className="py-2 mb-4 text-xl border-gray-300 ps-2 bg-primary-100 border-y text-primary-900">
                    Bucket Details
                  </h4>
                  {cardValues.map((item, index) => (
                    <div key={index} className="grid grid-cols-2">
                      <label className="py-2 text-sm text-primary-950">
                        {item?.label}
                      </label>
                      <span className="py-2 text-sm font-bold text-right text-gray-800">
                        {item?.value}
                      </span>
                      <div className="col-span-2 border-b border-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
              {/* divider */}
              {/* file management */}
              <div className="mt-12 ">
                <div className="flex items-center justify-between mb-4 border-gray-300 ps-2 pe-5 bg-primary-100 border-y">
                  <h4 className="py-2 text-xl text-primary-900">
                    File Inventory
                  </h4>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<PlusOutlined />}
                    onClick={handleAddFile}
                  >
                    Add File
                  </Button>
                  {/* <span className="flex items-center gap-2 font-semibold cursor-pointer text-primary-700 hover:underline">
                <PlusOutlined />
                Add File
              </span> */}
                </div>
                <div className="mt-2">
                  <Table columns={fileColumns} rowsData={filesData ?? []} />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-72 ">
              <WarningOutlined
                style={{
                  fontSize: "4rem",
                  color: "#a855f7",
                }}
              />
              <div className="mt-2 mb-5 text-lg text-gray-600">
                No files found
              </div>
              <Button
                variant="primary"
                size="lg"
                icon={<PaperClipOutlined />}
                onClick={handleAddFile}
              >
                Add File
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Add file modal */}
      <Modal
        isOpen={isAddFileModalOpen}
        onClose={closeAddFileModal}
        title="Add File"
        okText={isLoadingConfirmationButton ? "Submitting" : "Submit"}
        onOk={handleAddFileModalOk}
        disableOkButton={isLoadingConfirmationButton}
      >
        <div className="px-3 mb-3">
          <div className="flex justify-between mb-3">
            <label className="font-semibold text-gray-700">Bucket name:</label>
            <span className="text-lg font-bold text-primary-800">
              {bucketDetails?.bucketName}
            </span>
          </div>

          {/* upload file */}
          <div>
            {/* <label
              class="block mb-2 font-semibold text-gray-700"
              for="file_input"
            >
              Upload file
            </label> */}
            <input
              class="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-primary-50 focus:outline-none py-2 px-3"
              id="file_input"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {file && (
              <div className="mt-2">
                {/* <p>File selected: {file.name}</p> */}
                <label className="font-semibold text-gray-700">
                  File size:
                </label>
                <span className="font-bold text-gray-700 ms-4">
                  {formatFileSize(file.size)}
                </span>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Grant access modal */}
      <Modal
        isOpen={isGrantAccessModal}
        onClose={() => setIsGrantAccessModal(false)}
        onOk={handleSubmitGrantAccess}
        okText={isGrantingAccess ? "Submitting" : "Submit"}
        disableOkButton={isGrantingAccess}
      >
        <form className="px-3">
          <div className="mb-3">
            <label htmlFor="username" className="font-semibold text-gray-700">
              User Name
            </label>
            <input
              id="username"
              name="username"
              ref={userNameRef}
              required
              type="text"
              placeholder="User Name"
              className="block max-h-10 w-full rounded-md border border-gray-300 bg-primary-50 p-2.5 text-md text-gray-900 shadow-sm disabled:cursor-not-allowed"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="useraccess" className="font-semibold text-gray-700">
              Access
            </label>
            <select
              id="useraccess"
              name="useraccess"
              required
              ref={userAccessRef}
              className={`block max-h-10 w-full rounded-md border border-gray-300 bg-primary-50 p-2 text-md text-gray-900 shadow-sm disabled:cursor-not-allowed`}
            >
              {["GRANT", "REVOKE"]?.map((type) => (
                <option value={type} key={type} selected={type === "GRANT"}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>

      {/* Confirmation modal */}
      <Modal
        isOpen={confirmationModalStates?.isOpen}
        onClose={onCloseConfirmationModal}
        okText={isLoadingConfirmationButton ? "Deleting" : "Delete"}
        onOk={onOkConfirmation}
        disableOkButton={isLoadingConfirmationButton}
      >
        <p>
          Are you sure you want to delete the file{" "}
          {confirmationModalStates?.data?.name}?
        </p>
      </Modal>
    </section>
  );
};

export default BucketInfo;
