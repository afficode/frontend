import { PiSquaresFour } from "react-icons/pi"
import { Avatar } from "../../../assets/images"

const ChatList = () => {
    const isImg = false
    return (
        <div className='flex items-start gap-4 w-full border border-gray-200 rounded-xl hover:border-primary hover:shadow-lg p-4 cursor-pointer'>
            {
                isImg ? (
                    <img src={Avatar} alt="/" className="w-10 h-10 rounded-full" />
                ) : (
                    <span className='p-[6px] bg-primary/10 rounded-full'>
                        <PiSquaresFour size={30} className="text-primary" />
                    </span>
                )
            }

            <div className='flex flex-col gap-1 w-full'>
                <div className="flex items-center justify-between">
                    <span className='text-sm font-semibold text-gray-500 '>Godstime Agholor</span>
                    <span className='p-1  bg-green-500 rounded-full animate-bounce' />
                </div>
                <h4 className='text-base font-bold text-black'>Mechanical keyboard</h4>
                <span className='text-[10px] text-gray-500 uppercase'>About 20 hours ago</span>
            </div>
        </div>
    )
}

export default ChatList
