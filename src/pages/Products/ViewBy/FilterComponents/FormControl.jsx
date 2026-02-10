import Checkbox from './Checkbox';
import Modal from './Modal';

const FormControl = (props) => {
    const { type } = props;
    switch (type) {
    case 'modal':
        return <Modal {...props} />;
    case 'checkbox':
        return <Checkbox {...props} />;
    case 'radio':
        return <Checkbox {...props} />;
    default:
        return '';
    }
};

export default FormControl;
