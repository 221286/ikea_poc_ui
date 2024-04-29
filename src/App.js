import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import mc from "./utils/mc";
import { routes } from "./configs/routes";

//Const bucketname

//make a bucket called as IKEA_Frontend
const createBucket = async (Bucketname) => {
  try {
    mc.makeBucket(Bucketname, "us-east-1");
  } catch (err) {
    console.log("Error creating the bucket", err);
  }
};
const getbucketlist = async () => {
  try {
    const res = await mc.listBuckets();
    console.log(res);
  } catch (err) {
    console.log("Cannot get the bucketlist due to", err);
  }
};

function App() {
  /*Setting up bucket using the useState*/

  useEffect(() => {
    //uploadFile();
    //createBucket('ikea');
    //getbucketlist();
  }, []);
  /**Configuring router with dependencies */
  return (
    <div className="w-full h-full ">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
