import { Loading3QuartersOutlined } from "@ant-design/icons";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div>
        <Loading3QuartersOutlined
          className="animate-spin"
          style={{
            fontSize: "56px",
            color: "purple",
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
