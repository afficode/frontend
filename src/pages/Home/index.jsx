import { Banner } from "../../components";
import { Approutes } from "../../constants";
import { Button } from "../../ui";
import Hero from "./Hero";
import RowContainer from "./RowContainer";

const Home = () => {
  return (
    <>
      <Banner />
      <Hero />
      <RowContainer title={"Shops"} />
      <RowContainer
        title={"Featured Products"}
        link={Approutes.product.initial}
      />
    </>
  );
};

export default Home;
