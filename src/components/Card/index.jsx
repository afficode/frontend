import { Link } from 'react-router-dom';

const Card = ({ title, img, link }) => {
    return (
        <Link
            to={link}
            className=' w-[18rem] sm:w-full h-[22rem] border border-black/25 shadow-sm cursor-pointer hover:shadow-lg transition-all  ease-in-out'
        >
            <img className=' w-full h-[85%] object-cover' src={img} alt='/' />
            <span className='block px-2 mt-3 sm:text-lg '>{title}</span>
        </Link>
    );
};

export default Card;
