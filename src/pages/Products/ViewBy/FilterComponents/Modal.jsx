import { useState, useMemo, useEffect } from 'react';
import { fetchLGA, fetchStates } from '../../../../hooks/useLocation';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';

const Modal = ({ setfieldvalue }) => {
    const [searchParams] = useSearchParams();
    const [selectedState, setSelectedState] = useState({});
    const [stateId, setStateId] = useState(null);
    const [buttonDisplay, setButtonDisplay] = useState('');
    const { data: state } = fetchStates();
    const { data: lga } = fetchLGA();
    // null means nothing has been done, and should be empty or show skeleton
    // true means we can show state but not lga.
    // false means we want to show the lga and remove state
    const [showState, setShowState] = useState(null);
    const [lgaId, setLgaId] = useState(null);

    const locationCleared = useMemo(() => {
        const stateIdParam = searchParams.get('state_id');
        const lgaIdParam = searchParams.get('lga_id');
        return !stateIdParam && !lgaIdParam;
    }, [searchParams]);

    useEffect(() => {
        if (locationCleared) {
            setButtonDisplay('');
            setStateId(null);
            setLgaId(null);
            setSelectedState({});
            setShowState(null);
        }
    }, [locationCleared]);

    const setState = (state) => {
        setStateId(state.state_id);
        setButtonDisplay(state.name);
        setLgaId(null);
        setfieldvalue('state_id', state.state_id);
        setSelectedState(state);
        setShowState(false);
    };

    const setLGA = (lga) => {
        setfieldvalue('lga_id', lga.id);
        setButtonDisplay(lga.lga_name + ', ' + selectedState.name);
        setLgaId(lga.id);
    };

    const resetModal = () => {
        setButtonDisplay('');
        setfieldvalue('state_id', '');
        setfieldvalue('lga_id', '');
        setShowState(true);
    };

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="">
            <button
                className={`${
                    buttonDisplay ? ' text-start' : 'text-center'
                } w-full border-1 border-gray-50 p-1 py-3 bg-gray-50 pl-2 mt-2 text-sm`}
                onClick={() => {
                    // document.getElementById('location').showModal();
                    resetModal();
                    setModalOpen(true);
                }}
                type="button"
            >
                {buttonDisplay || 'SELECT LOCATION'}
            </button>
            {modalOpen &&
                createPortal(
                    <div
                        id="location"
                        className="fixed inset-0 !z-[1000000000] bg-black/50 flex items-center justify-center"
                    >
                        <div className="modal-box w-11/12 max-w-5xl bg-gray-50">
                            <div className="flex items-center justify-between my-2">
                                <h3 className="font-bold text-lg tracking-normal lg:tracking-wide">
                                    Please select from below
                                </h3>
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="btn bg-gray-100 text-gray-600 border-gray-400 hover:bg-primary hover:border-0 hover:text-white "
                                    >
                                        ✕
                                    </button>
                                </form>
                            </div>

                            <div className="">
                                <input name="state_id" type="hidden" id="state" />
                                <input name="lga_id" type="hidden" id="lga" />
                                {(showState === null || showState) && state?.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-center ">
                                        {state.map((state, index) => (
                                            <span
                                                className="bg-gray-200 p-3 text-black antialiased cursor-pointer hover:bg-primary hover:text-white hover:uppercase hover:font-semibold"
                                                key={index * 2}
                                                onClick={() => {
                                                    setState(state);
                                                }}
                                            >
                                                {state.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {showState === false && lga?.length > 0 && stateId !== null && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-center mt-">
                                        <span
                                            className={`${
                                                lgaId === null ? 'bg-primary text-white uppercase' : 'bg-gray-200 text-black capitalize'
                                            }  p-3  antialiased cursor-pointer hover:bg-primary hover:text-white hover:uppercase hover:font-semibold`}
                                            onClick={() => {
                                                setfieldvalue('lga_id', '');
                                                setButtonDisplay(selectedState.name);
                                                setLgaId(null);
                                            }}
                                        >
                                            ALL
                                        </span>
                                        {lga
                                            .filter((val) => val.state_id === stateId)
                                            .map((lga, index) => (
                                                <span
                                                    className={`${
                                                        lgaId === lga.id
                                                            ? 'bg-primary text-white uppercase'
                                                            : 'bg-gray-200 text-black capitalize'
                                                    }  p-3 text-black antialiased cursor-pointer hover:bg-primary hover:text-white hover:uppercase hover:font-semibold`}
                                                    key={index * 3}
                                                    onClick={() => {
                                                        setLGA(lga);
                                                    }}
                                                >
                                                    {lga.lga_name}
                                                </span>
                                            ))}
                                    </div>
                                )}
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button, it will close the modal */}
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="btn bg-gray-100 text-gray-600 border-gray-400  hover:bg-primary hover:border-0 hover:text-white"
                                    >
                                        Close
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>,
                    document.getElementById('portal')
                )}
        </div>
    );
};

export default Modal;
