// CategoryPage.js
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useCategories } from "../hooks";
import { useEffect } from "react";

const CategoryPage = (props) => {
  const { id } = useParams();

  // fetch categories
const { data } = useCategories();


  // console.log(id);

const allCategories = ()=>{
  if (id && id == 50) {
    const vehicle = data?.filter((data) => data.id >= 5000 && data.id < 5100);
     console.log(vehicle);
     
   } 
 
   else if (id == 51) {
     const propertyCat = data?.filter(
       (data) => data.id >= 5100 && data.id < 5200
     );
     console.log(propertyCat);
   }
}


  useEffect(() => {
     allCategories()
  }, []);

  // const propertyCat = data?.filter((data) => data.id >= 5100 && data.id < 5200);
  // const servicesCat = data?.filter((data) => data.id >= 5200 && data.id < 5300);
  // const dealsCat = data?.filter((data) => data.id >= 6500 && data.id < 6600);

  // console.log(vehicleCat);

  return (
    <div>
      <h1>Hellow WOrld</h1>
      <h1>Hellow WOrld</h1>
      <h1>Hellow WOrld</h1>
      <h1>Hellow WOrld</h1>
    </div>
  );
};

export default CategoryPage;
