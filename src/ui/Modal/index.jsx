import { useEffect } from 'react';
import { useRef } from 'react';
import { ImCancelCircle } from 'react-icons/im';

const Modal = ({
	isOpen,
	setIsOpen,
	modalHeader = true,
	children,
	headerText,
	headerStye,
	headerSize,
	className,
}) => {
	const modalRef = useRef();

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, setIsOpen]);

	return (
		<div
			className={`fixed inset-0 z-[100000] bg-primary/50 h-full w-full flex items-center justify-center 
      ${
							isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none '
						} transition-opacity duration-300 ease-in-out
      `}
		>
			<div
				ref={modalRef}
				className={` px-6 py-4 overflow-auto max-h-[90%] rounded-lg bg-[#fff] w-[95%] lg:w-[70%] md:w-[60%] xl:w-[80%] transform ${
					isOpen ? 'scale-100' : 'scale-0 '
				} transition-transform duration-300 ease-in-out ${className}`}
			>
				{modalHeader && (
					<div className={`flex justify-between items-center pb-6`}>
						{headerSize === 'small' ? (
							<h4 className={` text-center text-black uppercase ${headerStye}`}>{headerText}</h4>
						) : headerSize === 'text' ? (
							<p className={`text-black ${headerStye}`}>{headerText}</p>
						) : (
							<h3 className={` text-center text-black uppercase ${headerStye}`}>{headerText}</h3>
						)}
						<div className="cursor-pointer modal-close" onClick={() => setIsOpen(false)}>
							<ImCancelCircle size={25} />
						</div>
					</div>
				)}

				<div className={`modal-body relative overflow-auto py-4  `}>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
