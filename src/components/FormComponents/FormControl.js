import React from 'react'
import { Field } from 'formik';
import Input from './Input';

const FormControl = (props) => {
  const { control, ...rest }   = props;

  switch(control) {
    case 'input':
        return <Input {...rest} />
    default: null
  }
    
  
}

export default FormControl;
