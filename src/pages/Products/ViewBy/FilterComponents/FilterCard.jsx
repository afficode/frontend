import React from "react";
import FormControl from "./FormControl";
import Input from "../../../../components/FormComponents/Input";
import { Field } from "formik";

const FilterCard = ({ field, setfieldvalue }) => {
  return (
    <div className="w-full  my-4 border-2 border-gray-300 rounded-sm p-2 relative tracking-tighter line-clamp-1 ">
      <header className=" font-bold text-lg md:text-lg lg:text-xl xl:text-2xl block sticky">
        {field.title}
      </header>
      {field?.options && (
        <div className="flex items-center justify-between my-2">
          {/* if more than 2, use the map function and make the index output a span with the to when index value is 0 */}
          <Field
            type={field.options[0].type}
            name={field.options[0].name}
            placeholder={field.options[0].placeholder}
            className={field.options[0].className}
          />{" "}
          <span className=" antialiased text-lg">- to -</span>
          <Field
            type={field.options[1].type}
            name={field.options[1].name}
            placeholder={field.options[1].placeholder}
            className={field.options[1].className}
          />{" "}
        </div>
      )}

      <div className="flex flex-col m-1 gap-2 pb-2 overflow-y-scroll min-h-[30px] max-h-[200px]">
        {field?.content?.map((content, index) => (
          <FormControl
            type={field.type}
            content={content}
            key={index}
            className="hover:bg-primary"
            setfieldvalue={setfieldvalue}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
