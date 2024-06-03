import { useEffect } from "react";
import { useRef } from "react";
import { ImCancelCircle } from "react-icons/im";

const Modal = ({
  isOpen,
  setIsOpen,
  modalHeader = true,
  children,
  headerText,
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
      document.removeEventListener("mousedown", handleClickOutside);
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
				className={` p-[20px] overflow-hidden rounded-lg bg-[#fff] w-[95%] lg:w-[40%] md:w-[60%] xl:w-[40%] transform ${
					isOpen ? 'scale-100' : 'scale-0 '
				} transition-transform duration-300 ease-in-out`}
			>
				{modalHeader && (
					<div className={`flex justify-between items-center pb-6`}>
						<h5 className="font-bold text-center text-[1.5rem] uppercase text-black">{headerText}</h5>
						<div className="cursor-pointer modal-close" onClick={() => setIsOpen(false)}>
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
