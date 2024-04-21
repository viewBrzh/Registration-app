import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

function Main(props) {

  return (
    <div id="page-top">
      <Header />
      <div style={{ padding: "16px", minHeight: "calc(100vh - 110px)" }}>
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export default Main;
