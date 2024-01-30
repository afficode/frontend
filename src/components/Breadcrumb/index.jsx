import { Link } from "react-router-dom";

const Breadcrumb = ({ items, className }) => {
  return (
    <div className={className || "text-lg breadcrumbs sm:ml-2 w-full mx-4"}>
      <ul>
        {items &&
          items.map((item, index) => (
            <li
              key={index}
              className={`uppercase ${
                !item.link ? "text-black" : "hover:text-secondary text-primary"
              }`}
            >
              {item.link ? (
                <Link to={item.link}>{item.name}</Link>
              ) : (
                <span>{item.name}</span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
