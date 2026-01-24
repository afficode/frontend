import React from "react";
import { categoryData } from "../../constants/Category";
import CategoryCard from "./CategoryCard";
const index = () => {
  return (
    <div className="flex items-center justify-evenly flex-wrap gap-4 cursor-pointer m">
      {categoryData.map((category, index) => (
        <CategoryCard category={category} key={index} />
      ))}
    </div>
  );
};

export default index;
