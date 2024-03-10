import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";
import HomePage from "./Screens/Home";
import ContentArea from "./components/ContentArea";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <ContentArea>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </ContentArea>
      <Footer />
    </div>
  );
}

export default App;
