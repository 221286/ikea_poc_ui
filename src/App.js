import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login_Page from "./Components/Login_Page";
import Signup_Page from "./Components/Signup_Page";
import Home_page from "./Components/Home_page";
import { useEffect} from "react";
import Bucket from "./Components/Bucket";
import mc from "./utils/mc";
import Content_typepage from "./Components/Content_typepage";
import Home_body from "./Components/Home_body";





//Const bucketname

//make a bucket called as IKEA_Frontend
const createBucket = async(Bucketname)=>{
  try{
    mc.makeBucket(Bucketname,'us-east-1',)
  }catch(err){
    console.log('Error creating the bucket',err);
  }
}
const getbucketlist=async()=>{
  try{
    const res=await mc.listBuckets();
    console.log(res);
  }catch(err){
    console.log("Cannot get the bucketlist due to",err)
  }
}




function App() {
/*Setting up bucket using the useState*/

useEffect(()=>{


  //uploadFile();
 //createBucket('ikea');
 //getbucketlist();
 
},[])
  /**Configuring router with dependencies */
  const route=createBrowserRouter([{
  path:"/",
  element:<Home_page></Home_page>,
  children:[{
    path:"/Home",
    element:<Home_body></Home_body>
  },
{
  path:"/Contents/:bucketname",
  element:<Content_typepage></Content_typepage>
}]
  },{
  path:"/signup",
  element:<Signup_Page></Signup_Page>
  },
  {
  path:"/Bucket",
  element:<Bucket></Bucket>
  },
{
  path:"/Login",
  element:<Login_Page></Login_Page>,
},
    {
      path:"/Contenttypes/:bucketname",
      element:<Content_typepage></Content_typepage>,
    }
  
,
])
  return (
    <div className="w-full h-full ">
      
<RouterProvider router={route}/>
    </div>
  );
}

export default App;
