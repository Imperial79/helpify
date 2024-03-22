import welcomeImg from "../assets/welcome.svg";

function HomePage() {
  return (
    <div className="py-5">
      <section
        id="hero"
        className="grid md:grid-cols-2 grid-cols-1 gap-5 items-center "
      >
        <p className="p-5 bg-gray-50 rounded-xl md:order-first order-last">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          praesentium facilis a quidem pariatur esse. Dolor, sint nostrum ipsa
          earum doloremque nulla, sit, doloribus a iste corrupti eius deserunt
          placeat. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Maiores nemo omnis iure consequuntur velit, autem fugiat a corrupti
          nihil aperiam dicta architecto similique quam. Vitae consequatur
          explicabo saepe veniam eum!
        </p>

        <div>
          <img
            src={welcomeImg}
            alt="welcome"
            className="h-full w-full object-contain"
          />
        </div>
      </section>
      <h1 className="text-4xl mt-5">Lorem Ipsum</h1>
      <div className="bg-gray-50 p-5 mt-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
        aperiam quae temporibus vitae nostrum sequi provident dolores!
        Voluptatem accusamus nesciunt voluptate, provident sunt, ullam vero
        fugit aspernatur, iste ipsam error?
      </div>
    </div>
  );
}

export default HomePage;
