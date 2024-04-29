import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { axiosInstance } from "../api/axiosInstance";
import Table from "../components/Table";
import Button from "./Button";

import {
  PlusOutlined,
  FilterOutlined,
  CheckSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import usePopover from "../hooks/usePopover";
import Modal from "./Modal";
import Toast from "./Toast";

const Home = () => {
  const bucketNameRef = useRef(null);
  const minioPortRef = useRef(null);
  const regionRef = useRef(null);
  const storageTypeRef = useRef(null);

  const storageTypes = ["AZURE", "S3"];
  const regions = ["US_EAST", "US_WEST"];

  let columns = [
    {
      header: "Bucket Name",
      accessorKey: "bucketName",
    },
    {
      header: "Total Data Stored",
      accessorKey: "dataStored",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Storage Type",
      accessorKey: "storageType",
    },
    {
      header: "Region",
      accessorKey: "region",
    },
  ];

  const navigate = useNavigate();
  const { isPopoverOpen, togglePopover, popoverRef, triggerRef } = usePopover();

  const [tableData, setTableData] = useState([]);
  const [isAddBucketModalOpen, setIsAddBucketModalOpen] = useState(false);
  const [renderedTableData, setRenderedTableData] = useState([]);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState({
    storageTypes: [],
    regions: [],
  });
  const [filterOptions, setFilterOptions] = useState({
    storageTypes: [],
    regions: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAddBucketLoading, setIsAddBucketLoading] = useState(false);

  const handleRowClick = (rowDetails) => {
    navigate(`/bucket/${rowDetails.bucketName}`);
  };

  const getBucketData = async () => {
    try {
      const bucketResponse = await axiosInstance.get("bucket/dashboard");
      if (
        [200, 201].includes(bucketResponse?.data?.status) &&
        bucketResponse?.data?.data &&
        bucketResponse?.data?.data?.length
      ) {
        const responseData = bucketResponse?.data?.data;
        const formattedResponse = responseData.map((bucket) => {
          return {
            bucketName: bucket?.bucket_info?.name,
            dataStored: bucket?.total_data_stored,
            createdAt: new Date(bucket?.bucket_info?.created_at).toLocaleString(
              "en-GB",
              { timeZone: "UTC" }
            ),
            region: bucket?.bucket_info?.region,
            storageType: bucket?.bucket_info?.storage_type,
          };
        });
        setTableData(formattedResponse);
        setRenderedTableData(formattedResponse);

        // setting filter options
        const uniqueStorageTypes = [
          ...new Set(
            responseData.map((bucket) => bucket.bucket_info.storage_type)
          ),
        ];
        const uniqueRegions = [
          ...new Set(responseData.map((bucket) => bucket.bucket_info.region)),
        ];

        // Update filter options state
        setFilterOptions({
          storageTypes: uniqueStorageTypes,
          regions: uniqueRegions,
        });
        setSelectedFilterOptions({
          storageTypes: uniqueStorageTypes,
          regions: uniqueRegions,
        });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getBucketData().then(() => {
      setIsLoading(false);
    });
  }, []);

  // Function to toggle selected filter options
  const toggleFilterCheckbox = (type, value) => {
    setSelectedFilterOptions((prevState) => {
      if (prevState[type].includes(value)) {
        return {
          ...prevState,
          [type]: prevState[type].filter((option) => option !== value),
        };
      } else {
        return {
          ...prevState,
          [type]: [...prevState[type], value],
        };
      }
    });
  };

  const handleCancelFilter = () => {
    togglePopover();
  };

  const handleApplyFilter = () => {
    let data = tableData?.filter(
      (item) =>
        selectedFilterOptions?.regions?.includes(item?.region) &&
        selectedFilterOptions?.storageTypes?.includes(item?.storageType)
    );
    console.log(data);
    setRenderedTableData(data);
    togglePopover();
  };

  const handleSelectAllFilters = (type) => {
    setSelectedFilterOptions((prevState) => {
      return {
        ...prevState,
        [type]:
          selectedFilterOptions[type]?.length === filterOptions[type]?.length
            ? []
            : filterOptions[type],
      };
    });
  };

  const handleAddBucket = () => {
    setIsAddBucketModalOpen(true);
  };

  const closeAddBucketModal = () => {
    setIsAddBucketModalOpen(false);
  };

  const resetForm = () => {
    if (bucketNameRef.current) bucketNameRef.current.value = "";
    if (minioPortRef.current) minioPortRef.current.value = "";
    if (regionRef.current) regionRef.current.value = "";
    if (storageTypeRef.current) storageTypeRef.current.value = "";
  };

  useEffect(() => {
    if (isAddBucketModalOpen) {
      resetForm();
    }
  }, [isAddBucketModalOpen]);

  const handleSubmitAddBucket = async () => {
    const name = bucketNameRef.current.value;
    const minio_port = minioPortRef.current.value;
    const region = regionRef.current.value;
    const storage_type = storageTypeRef.current.value;

    if (name && minio_port && region && storage_type) {
      setIsAddBucketLoading(true);
      try {
        const requestBody = {
          name: name,
          region: region,
          minio_port: minio_port,
          storage_type: storage_type,
        };
        await axiosInstance.post("bucket/create", requestBody);
        Toast({
          type: "success",
          message: "Bucket created successfully",
        });
        setIsAddBucketLoading(false);
        // calling the buckets listing
        setIsLoading(true);
        setTimeout(() => {
          getBucketData().then(() => {
            setIsLoading(false);
          });
        }, 1000);
      } catch (error) {
        console.log(error);
        Toast({
          type: "error",
          message:
            error?.response?.data?.error?.displayMessage ??
            "Error creating bucket",
          options: {
            autoClose: 2500,
          },
        });
        setIsAddBucketLoading(false);
      }
    } else {
      // handle required fields
      Toast({
        type: "warning",
        message: "Please fill required fields",
      });
    }
  };

  return (
    <section className="flex items-center justify-center my-5">
      <div className="relative custom-container">
        <div className="relative flex justify-between">
          <h3
            className={`flex justify-between text-3xl font-bold text-gray-800 mb-4`}
          >
            Buckets
          </h3>
          <div className="flex items-center gap-3">
            <button
              type="button"
              title="Filter options"
              ref={triggerRef}
              onClick={togglePopover}
            >
              <FilterOutlined
                style={{
                  fontSize: "24px",
                  color: "gray",
                }}
              />
            </button>
            {["ADMIN"].includes(localStorage.getItem("roles")) && (
              <Button
                variant="primary"
                icon={<PlusOutlined />}
                onClick={handleAddBucket}
              >
                Create Bucket
              </Button>
            )}
          </div>
          {/* filter popup */}
          {isPopoverOpen && (
            <div
              ref={popoverRef}
              className="absolute top-12 right-36 w-64  z-[20] bg-white rounded-md origin-top-right shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4"
            >
              <div className="mb-4">
                <p className="flex justify-between mb-2 font-bold">
                  <span>Regions</span>
                  <button onClick={() => handleSelectAllFilters("regions")}>
                    {selectedFilterOptions?.regions?.length ===
                    filterOptions?.regions?.length ? (
                      <MinusSquareOutlined
                        style={{
                          color: "#808080",
                        }}
                      />
                    ) : (
                      <CheckSquareOutlined
                        style={{
                          color: "#808080",
                        }}
                      />
                    )}
                  </button>
                </p>
                <div className="space-y-2">
                  {filterOptions?.regions?.map((item) => {
                    return (
                      <label className="flex items-center" key={item}>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedFilterOptions.regions.includes(item)}
                          onChange={() => toggleFilterCheckbox("regions", item)}
                        />
                        {item}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* buttons */}
              <div className="grid grid-cols-2 gap-2 p-2 mt-2">
                <Button
                  variant="secondary"
                  className="w-full"
                  size="sm"
                  onClick={handleCancelFilter}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="w-full"
                  size="sm"
                  onClick={handleApplyFilter}
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>
        <Table
          columns={columns}
          rowsData={renderedTableData}
          onRowClick={handleRowClick}
          loading={isLoading}
        />
      </div>

      {/* Add Bucket modal */}
      <Modal
        isOpen={isAddBucketModalOpen}
        title={"Add Bucket"}
        onClose={closeAddBucketModal}
        okText={isAddBucketLoading ? "Submitting" : "Submit"}
        onOk={handleSubmitAddBucket}
        disableOkButton={isAddBucketLoading}
      >
        <form className="px-3">
          <div className="mb-3">
            <label htmlFor="name" className="font-semibold text-gray-700">
              Bucket Name
            </label>
            <input
              id="name"
              name="name"
              ref={bucketNameRef}
              required
              type="text"
              placeholder="Bucket Name"
              className="block max-h-10 w-full rounded-md border border-gray-300 bg-primary-50 p-2.5 text-md text-gray-900 shadow-sm disabled:cursor-not-allowed"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="port" className="font-semibold text-gray-700">
              Minio Port
            </label>
            <input
              id="port"
              name="port"
              ref={minioPortRef}
              required
              type="text"
              placeholder="Minio Port"
              className={classnames(
                "block max-h-10 w-full rounded-md border border-gray-300 bg-primary-50 p-2.5 text-md text-gray-900 shadow-sm disabled:cursor-not-allowed"
              )}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="region" className="font-semibold text-gray-700">
              Region
            </label>
            <select
              id="region"
              name="region"
              required
              // type="text"
              ref={regionRef}
              className={classnames(
                "block max-h-10 w-full rounded-md border border-gray-300 bg-primary-50 p-2 text-md text-gray-900 shadow-sm disabled:cursor-not-allowed"
              )}
            >
              <option value="" disabled selected>
                Select Region
              </option>
              {regions?.map((region) => (
                <option value={region} key={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="storageType"
              className="font-semibold text-gray-700"
            >
              Storage Type
            </label>
            <select
              id="storageType"
              name="storageType"
              required
              ref={storageTypeRef}
              className={`block max-h-10 w-full rounded-md border border-gray-300 bg-primary-50 p-2 text-md text-gray-900 shadow-sm disabled:cursor-not-allowed`}
            >
              <option value="" disabled selected>
                Select Storage Type
              </option>
              {storageTypes?.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Home;
