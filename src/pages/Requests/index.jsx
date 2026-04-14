import { useState } from "react";
import { useCategories, useGetRequests } from "../../hooks";
import RequestCard from "./Card";
import RequestMessages from "./Messages";
import { RiSparkling2Fill } from "react-icons/ri";
import { PiSquaresFour } from "react-icons/pi";
import { IoAdd } from "react-icons/io5";
import PostRequest from "./Post";

const Requests = () => {
    const { data: categories } = useCategories();
    const [isOpen, setIsOpen] = useState(false)
    const [isAddOpen, setIsAddOpen] = useState(false)

    const { data, isPending } = useGetRequests()
    console.log(data)

    const active = 'Services'

    return (
        <div className="flex flex-col gap-4 py-6 px-4 ">
            <div className="flex flex-col max-w-2xl space-y-4 mx-auto items-center my-6">
                <span className="bg-primary/10 px-3 py-2 rounded-2xl text-primary uppercase w-fit text-sm font-semibold flex items-center gap-2">
                    <RiSparkling2Fill size={20} /> Request Anything, Find Everything
                </span>
                <h1 className="text-6xl font-[900] text-center">What are you <br />
                    <span className="text-primary">looking for</span> today?
                </h1>
                <p className="text-gray-500 text-center font-semibold">Join the community where requests meet results. Place a request, <br /> interact via templates, and get what you need safely.</p>
            </div>

            <div className="space-y-4 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold  flex items-center justify-center gap-2">
                    <PiSquaresFour size={30} className="text-primary" /> Browse Categories
                </h2>
                <div className="flex items-center justify-center gap-2 flex-wrap ">
                    <button type="button" className={`${active === 'all' && 'bg-primary text-white'} p-2 border border-primary/10 hover:border-primary/100 rounded-xl text-sm text-gray-500 font-semibold`}>
                        All Requests
                    </button>
                    {categories?.slice(0, 13).map((cat) => (
                        <button type="button" key={cat.id} className={`${active === cat.name && 'bg-primary text-white'} p-2 border border-primary/10 hover:border-primary/100 rounded-xl text-sm text-gray-500 font-semibold`}>
                            {cat.name}
                        </button>
                    ))
                    }
                </div>
            </div>

            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <RequestCard setModalOpen={setIsOpen} />
                </div>
            </div>

            <RequestMessages isOpen={isOpen} setIsOpen={setIsOpen} />
            <PostRequest isOpen={isAddOpen} setIsOpen={setIsAddOpen} />

            <button type='button' onClick={() => setIsAddOpen(true)} className='flex items-center py-2 px-4 rounded-full font-semibold bg-primary text-white fixed bottom-8 right-4 shadow-xl gap-2 animate-pulse/80 border border-white'>
                <IoAdd size={25} className="font-bold" /> Request
            </button>
        </div>
    )
}

export default Requests

// TODO:
// Read up web socket on socket.io
// read up its implementation on React
// on, emit, broadcast
//