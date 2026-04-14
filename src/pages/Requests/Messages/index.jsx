import { Modal } from "../../../ui"
import { MdChatBubbleOutline } from "react-icons/md";
import ChatWindow from "./ChatWindow";
import ChatList from "./ChatList";

const RequestMessages = ({ isOpen, setIsOpen }) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} padding={false} modalHeader={false} className={'!py-0 !w-[90%]'} >
            <div className='w-full h-full overflow-y-hidden flex'>
                <aside className="flex flex-col items-start gap-2 w-[45%] border-r border-gray-200  bg-white overflow-y-auto h-[calc(100vh-8rem)]  scrollbar-thin scrollbar-track-gray-100">
                    <div className="w-full flex items-center gap-2 text-black font-bold text-xl pt-2 px-4 pb-4 border-b border-gray-200">
                        <span className='p-[6px] bg-primary/10 rounded-full'>
                            <MdChatBubbleOutline size={25} className='text-primary' />
                        </span>
                        <h3 className='text-lg font-bold'>
                            Messages
                        </h3>
                    </div>

                    <div className="w-full p-4 flex flex-col gap-4 ">
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                        <ChatList />
                    </div>
                </aside>

                <section className="w-[65%] h-[calc(100vh-8rem)]">
                    <ChatWindow />
                </section>
            </div>
        </Modal>
    )
}

export default RequestMessages