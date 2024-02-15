import React from 'react'
import { FaMicrochip } from "react-icons/fa6";

const GrabIcon = ({ className, ...others }) => {
  return (
    <div className={className} {...others}>
        <FaMicrochip  />
    </div>
  )
}

export default GrabIcon