import Banner from "../../component/Banner";
import FeaturedEvent from "./FeaturedEvent";
import Popular from "./Popular";
import Service from "./Service";
import Statistics from "./Statistics";

const Home = () => {
  return (
    <div className="bg-base-200">
      <Banner />
      <FeaturedEvent />
      <Popular />
      <div id="service">
        <Service />
      </div>
      <Statistics />
    </div>
  );
};

export default Home;