
const MessageInput = () => {
    return (
        <div className='bg-white p-4 flex items-center gap-2 flex-wrap'>
            {
                response.map((res) => {
                    if (res.type === 'text') {
                        return (
                            <button key={res.label}>{res.label}</button>
                        )
                    } else {
                        return <input key={res.label} type='file' />
                    }
                })
            }
        </div>
    )
}

export default MessageInput

const response = [
    {
        label: 'I have this Item',
        type: 'text',
    },
    {
        label: 'I know exactly where you can get this',
        type: 'text',
    },
    {
        label: 'Share image(s)',
        type: 'file',
    },
]