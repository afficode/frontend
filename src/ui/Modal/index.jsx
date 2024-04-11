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
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return isOpen ? (
    <div
      className={`fixed inset-0 z-[10000] bg-primary/50 h-full w-full flex items-center justify-center `}
    >
      <div
        ref={modalRef}
        className={` p-[20px] overflow-hidden rounded-lg bg-[#fff] w-[95%] lg:w-[40%] md:w-[60%] xl:w-[40%]`}
      >
        {modalHeader && (
          <div className={`flex justify-between items-center pb-6`}>
            <h5 className="font-bold text-center text-[1.5rem] uppercase text-black">
              {headerText}
            </h5>
            <div
              className="modal-close cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <ImCancelCircle size={25} />
            </div>
          </div>
        )}

        <div
          className={`modal-body relative h-[90%] min-h-[90%] max-h-[90%] overflow-hidden pb-5 `}
        >
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
