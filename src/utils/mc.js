import * as Minio from "minio";
//Initializing minio

  //create the client
  // Instantiate the minio client with the endpoint
  // and access keys as shown below.
  const mc= new Minio.Client({ 
    endPoint: "54.198.138.169",/**localhost127.0.0.1 */
    port: 9000,
    useSSL: false,
    accessKey: 'admin',
    secretKey: '12345678'})

    export default mc;