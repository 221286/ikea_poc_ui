import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import Table from "../components/Table";
import Button from "./Button";

import { PlusOutlined } from "@ant-design/icons";

const Home = () => {
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
    // {
    //   header: "Actions",
    // },
  ];

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRowClick = (rowDetails) => {
    console.log(rowDetails);
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
            // contentSizeData: bucket?.data_by_content_size,
            // contentTypeData: bucket?.data_by_content_type,
          };
        });
        setTableData(formattedResponse);
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

  return (
    <section className="flex items-center justify-center my-5">
      <div className="relative custom-container">
        <div className="flex justify-between">
          <h3
            className={`flex justify-between text-3xl font-bold text-gray-800 mb-4`}
          >
            Buckets
          </h3>
          <div>
            <Button
              variant="primary"
              icon={<PlusOutlined />}
              // onClick={handleAddWebsite}
            >
              Create Bucket
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          rowsData={tableData}
          onRowClick={handleRowClick}
          loading={isLoading}
        />
      </div>
    </section>
  );
};

export default Home;
