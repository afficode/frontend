import { FaHandshake, FaHandshakeSlash } from "react-icons/fa6";

const index = ({negotiable}) => {
  return !!negotiable ? 
    <div className="tooltip tooltip-bottom tooltip-primary " data-tip="Negotiable"><FaHandshake className="text-primary"  /></div>: 
    <div className="tooltip tooltip-bottom tooltip-error " data-tip="Not-Negotiable"><FaHandshakeSlash className="text-red-600" /></div>
}

export default index