import * as Minio from "minio";
//Initializing minio
//create the client
// Instantiate the minio client with the endpoint
// and access keys as shown below.
const createMinioClient = (port) => {
  // Instantiate the Minio client with the endpoint
  // and access keys as shown below.
  return new Minio.Client({
    endPoint: "54.198.138.169", // or localhost: 127.0.0.1
    port: port,
    useSSL: false,
    accessKey: "admin",
    secretKey: "12345678",
  });
};

export default createMinioClient;
