import React, { useEffect } from "react";
import Banner from "../../component/Banner";
import FeaturedEvent from "./FeaturedEvent";
import Popular from "./Popular";
import Service from "./Service";
export const postPromise = fetch(`${import.meta.env.VITE_base_url}/athletic`).then(
  (res) => res.json()
);
const Home = () => {
  // console.log(allPostPromise);
  return (
    <div className="bg-base-200">
      <Banner></Banner>
      <FeaturedEvent ></FeaturedEvent>
      <Popular></Popular>
      <Service></Service>
    </div>
  );
};

export default Home;
