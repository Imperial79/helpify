import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../context/ContextProvider";
function ContactUs() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const { showAlert } = useContext(Context);

  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/users/send-feedback",
        { email, feedback }
      );
      if (!res.data.error) {
        showAlert(res.data.message, false);
      }
    } catch (e) {
      console.log(e);
      showAlert(res.data.message, true);
    }finally{
      setEmail("");
      setFeedback("");
    }
  };
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
      <img src="/contact-hero.svg" alt="contact-us" />

      <form onSubmit={handleFeedback}>
        <div className="pageTitle">Contact Us</div>
        <p className="mt-2 text-gray-500 md:text-md text-sm">
          You can provide your valuable feedback so that we can improve our
          website and make it more optimised for users
        </p>
        <div className="mt-5 flex flex-col gap-5">
          <input
            type="email"
            className="bg-white border-2 w-full p-2"
            placeholder="Provide an Email where we can reach you!"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            rows={5}
            className="bg-white border-2 w-full p-2"
            placeholder="What's in your mind?"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <button type="submit" className="kButton">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactUs;
