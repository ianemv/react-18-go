import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Layout from "./components/common/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
