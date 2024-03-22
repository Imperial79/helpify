import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";
import HomePage from "./Screens/Home";
import ContentArea from "./components/ContentArea";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Register } from "./Screens/Authentication/Register";
import { Login } from "./Screens/Authentication/Login";
import Geolocation from "./Screens/GeoLocation";
import Profile from "./Screens/Profile/Profile";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <ContentArea>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/geo" element={<Geolocation />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ContentArea>
      <Footer />
    </div>
  );
}

export default App;
