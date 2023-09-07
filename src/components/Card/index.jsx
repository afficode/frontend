const Card = ({ title, img }) => {
	return (
		<div className=" w-[18rem] sm:w-[25rem] h-[22rem] border border-black/25 shadow-sm cursor-pointer hover:shadow-lg transition-all  ease-in-out">
			<img className=" w-full h-[85%] object-cover" src={img} alt="/" />
			<span className="text-lg block sm:text-xl px-2 mt-3">{title}</span>
		</div>
	);
};

export default Card;
