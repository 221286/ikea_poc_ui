import { RouterProvider } from "react-router-dom";
import { routes } from "./configs/routes";

function App() {
  return (
    <div className="w-full h-full ">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
