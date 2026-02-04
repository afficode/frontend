const Modal = ({ modalHeader, children, headerText, buttonChild, className, ...rest }) => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
                {...rest}
                className={` ${className}`}
                onClick={() => document.getElementById('feedbackModal').showModal()}
            >
                {buttonChild}
            </button>
            <dialog id="feedbackModal" className="modal">
                <div className="modal-box bg-white  md:min-w-[700px]">
                    {modalHeader && <h3 className="font-bold text-lg">{headerText}</h3>}
                    <div className="py-4">{children}</div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Modal;
