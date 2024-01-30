import Header from "../components/header";
import Footer from "../components/footer";

function Main(props) {
  return (
    <div id="page-top">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default Main;
