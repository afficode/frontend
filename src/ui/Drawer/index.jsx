const Drawer = ({ items, icon }) => {
    return (
        <div className='drawer'>
            <input id='my-drawer' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content '>
                {/* Page content here */}
                {icon ? (
                    <label htmlFor='my-drawer' className='text-primary drawer-button'>
                        {icon}
                    </label>
                ) : (
                    <label htmlFor='my-drawer' className='btn btn-primary drawer-button'>
                        Open drawer
                    </label>
                )}
            </div>
            <div className='drawer-side z-[2000] !fixed !inset-0 !h-[100dvh]'>
                <label
                    htmlFor='my-drawer'
                    aria-label='close sidebar'
                    className='drawer-overlay !fixed !inset-0 !h-[100dvh]'
                ></label>
                <ul className='menu p-4 w-80 !h-[100dvh] overflow-y-auto bg-white '>
                    {/* Sidebar content here */}
                    {items}
                </ul>
            </div>
        </div>
    );
};

export default Drawer;
