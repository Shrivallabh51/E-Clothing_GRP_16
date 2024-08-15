import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <section className="section-center">
      <article className="content">
        <h1>
          " Design Your <br />
          Fashion Future ”
        </h1>
        <p>
          Stay ahead of the trends. With our exclusive designs and trend-forward
          pieces, you can shape your fashion future and lead the way in style.
          Discover the latest collections and set new trends.
        </p>
        <Link to="/products" className="btn hero-btn">
          shop now
        </Link>
      </article>
      <article className="img-container">
        <img
          src={"http://localhost:8090/api/products/image/2"}
          alt="nice table"
          className="main-img"
        />
        <img
          src={"http://localhost:8090/api/products/image/2"}
          alt="person working"
          className="accent-img"
        />
      </article>
    </section>
  );
};

export default Home;
