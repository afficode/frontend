
import { PiSquaresFour } from 'react-icons/pi'
import { Button } from '../../../ui'
import { IoChatbubbleOutline } from "react-icons/io5";

const RequestCard = ({ setModalOpen }) => {
    const isImg = true

    return (
        <div role='button' onClick={() => setModalOpen(true)} className='bg-white w-full h-[520px] flex flex-col justify-between rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-103'>
            {isImg &&
                <div className='w-full h-full relative'>
                    <div className={`${BADGE_STYLE} absolute top-4 left-4`}>
                        Electronics
                    </div>
                    < img src="" alt="" className='w-full h-full object-cover' />
                </div >
            }

            <div className=' p-6 flex flex-col gap-4 justify-between '>
                {
                    !isImg && <div className={BADGE_STYLE}>
                        Electronics
                    </div>
                }

                <div className='flex items-center gap-2'>
                    <span className='p-[6px] bg-primary/10 rounded-full'>
                        <PiSquaresFour size={30} className="text-primary" />
                    </span>
                    <div className='flex flex-col items-start'>
                        <span className='text-[10px] uppercase font-bold text-gray-500'>Published by</span>
                        <h6 className='text-xs font-bold'>Samuel CHika</h6>
                        <span className='text-[10px] uppercase font-bold text-gray-500'>5 days ago</span>
                    </div>
                </div>

                <div className='flex flex-col items-start'>
                    <h3 className='font-bold text-xl'>Mechanical</h3>
                    <p className='text-xs text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nihil illum facilis repudiandae vitae alias eum aliquid sed nobis quo!</p>
                </div>

                <Button variant={'primary'} className='w-full rounded-xl !bg-black flex items-center justify-center gap-2 hover:!bg-primary'><IoChatbubbleOutline size={20} /> Interact</Button>

            </div>
        </div >
    )
}

export default RequestCard

const BADGE_STYLE = 'px-2 py-1 uppercase bg-primary/10 text-primary font-extrabold text-[10px] w-fit rounded-xl'