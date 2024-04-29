import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Button from "../components/Button";
import { axiosInstance } from "../api/axiosInstance";
import Loader from "../components/Loader";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import Table from "../components/Table";
import { formatFileSize } from "../utils/commonUtils";

const BucketInfo = () => {
  const navigate = useNavigate();
  const { bucketName } = useParams();

  const [bucketDetails, setBucketDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const cardBaseStyles =
    "col-span-2 px-6 py-8 overflow-hidden bg-white  border-gray-300  rounded-lg max-h-[420px] shadow-lg flex justify-center";

  const getBucketDataByName = async (name) => {
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

        // console.log(responseData);
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
        console.log(formattedResponse);
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
          <DownloadOutlined
            style={{
              fontSize: "22px",
              color: "purple",
            }}
          />
          <DeleteOutlined
            style={{
              fontSize: "22px",
              color: "red",
            }}
          />
        </div>
      ),
    },
  ];

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
  return (
    <section className="flex items-center justify-center my-5">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative custom-container bg-primary-50">
          {" "}
          <div className="flex justify-between mb-3">
            <h3
              className={`flex justify-between text-3xl font-bold text-gray-800 mb-4`}
            >
              {bucketDetails?.bucketName}
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
          {/* contents */}
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
              <h4 className="py-2 text-xl text-primary-900">File Inventory</h4>
              <Button variant="primary" size="sm" icon={<PlusOutlined />}>
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
        </div>
      )}
    </section>
  );
};

export default BucketInfo;
