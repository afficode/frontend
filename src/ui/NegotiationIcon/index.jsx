import { FaHandshake, FaHandshakeSlash } from "react-icons/fa6";

const index = ({ negotiable }) => {
  return !!negotiable ? (
    <span
      className="tooltip tooltip-bottom tooltip-primary "
      data-tip="Negotiable"
    >
      <FaHandshake className="text-primary" />
    </span>
  ) : (
    <span
      className="tooltip tooltip-bottom tooltip-error "
      data-tip="Not-Negotiable"
    >
      <FaHandshakeSlash className="text-red-600" />
    </span>
  );
};

export default index;
