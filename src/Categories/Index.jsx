import React from "react";
import { useCategories } from "../hooks";
import { Banner, Card } from "../components";
import { Car, Spa, SportCar } from "../assets/images";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { useNavigate} from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();


// fetch categories
const { data } = useCategories();
// console.log(data)
// filter categories
const allCat = data?.filter((data) => data.id >= 10 && data.id < 100);


const vehicleCat = data?.filter((data) => data.id >= 5000 && data.id < 5100);

// console.log(vehicleCat)


  const handleViewClick = (id) => {
    navigate(`/categorychild/${id}`);
  };

 
  return (
    <div className="mb-10">
      <Banner />

      <div>
        <h1 className="mt-5">Categories</h1>
      </div>

      <div className="flex flex-wrap -mx-4 mt-10">
      {allCat ? (
          allCat.map((category) => (
            <div
              key={category.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4"
              onClick={()=> handleViewClick (category.id)}
            >
              <Card title={category.name} img={Car} />
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
};

export default Index;

const sectionStyles = "px-[4rem] py-8 max-sm:px-4";

// const vehicleCat = data?.filter((data) => data.id >= 5000 && data.id < 5100);
// const propertyCat = data?.filter((data) => data.id >= 5100 && data.id < 5200);
// const servicesCat = data?.filter((data) => data.id >= 5200 && data.id < 5300);
// const dealsCat = data?.filter((data) => data.id >= 6500 && data.id < 6600);

// console.log(vehicleCat);
