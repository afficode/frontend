import React from 'react';
import { ImCancelCircle } from 'react-icons/im';

const Modal = ({ isOpen, setIsOpen, modalHeader = true, children, headerText }) => {
	return (
		<div
			style={{ zIndex: 100000002 }}
			className={`fixed  inset-0 m-auto backdrop-opacity-5 backdrop-invert bg-primary/30 min-h-screen w-full backdrop-blur-sm md:p-0 p-5 items-center justify-center rounded-sm ${
				isOpen ? 'flex' : 'hidden'
			}`}
		>
			<div
				className={`shadow p-[20px] overflow-hidden rounded-lg bg-[#fff] w-[95%] lg:w-[40%] md:w-[60%] xl:w-[40%]`}
			>
				{modalHeader && (
					<div className={`flex justify-between items-center pb-6`}>
						<h5 className="font-bold text-center text-[1.5rem] uppercase text-black">{headerText}</h5>
						<div className="modal-close cursor-pointer" onClick={() => setIsOpen(false)}>
							<ImCancelCircle size={25} />
						</div>
					</div>
				)}

				<div className={`modal-body relative h-[90%] min-h-[90%] max-h-[90%] overflow-hidden pb-5 `}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
