import React from 'react'
import Input from './Input.jsx';

const FormControl = (props) => {
  const { control, ...rest }   = props;

  switch(control) {
    case 'input':
      return <><Input /></>
    default: 
      return null
  }
    
  
}

export default FormControl;
