import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: "auto", fontSize: "16px" }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
