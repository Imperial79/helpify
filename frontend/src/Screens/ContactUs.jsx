function ContactUs() {
  return (
    <div>
      <div className="pageTitle">Contact Us</div>
      <p className="mt-2 text-gray-500 md:text-xl text-sm">
        You can provide your valuable feedback so that we can imporve our
        website and make it more optimised for users
      </p>

      <div className="mt-5 flex flex-col gap-5">
        <input
          type="email"
          className="bg-white border-2 w-full p-2"
          placeholder="Your E-mail Here ..."
        />

        <textarea
          type="email"
          rows={5}
          className="bg-white border-2 w-full p-2"
          placeholder="What's in your mind?"
        />
      </div>
    </div>
  );
}

export default ContactUs;
