import { Sidebar } from 'flowbite-react';
import { HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';
import { Approutes } from '../../constants';
import { getCategoryName } from '../../utils';

const SidebarUI = ({ items }) => {
    return (
        <Sidebar
            aria-label='Sidebar for categories'
            className='min-h-[96vh] h-full md:min-h-[1000px]  w-full tracking-tighter line-clamp-1'
        >
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {items?.null.map(({ id, name }, index) => (
                        <div key={index}>
                            {' '}
                            {Array.isArray(items[`${id}`]) ? (
                                <Sidebar.Collapse
                                    key={index}
                                    label={`${name}`}
                                    renderChevronIcon={(theme, open) => {
                                        const IconComponent = open
                                            ? HiOutlineMinusSm
                                            : HiOutlinePlusSm;

                                        return (
                                            <div>
                                                <IconComponent
                                                    key={index}
                                                    aria-hidden
                                                    className={twMerge(
                                                        theme.label.icon.open[open ? 'on' : 'off']
                                                    )}
                                                />
                                            </div>
                                        );
                                    }}
                                >
                                    <Sidebar.Item
                                        as={Link}
                                        to={`${Approutes.product.category}/${getCategoryName(id)}`}
                                        key={index}
                                    >
                                        {name}
                                    </Sidebar.Item>
                                    {items[`${id}`].map(({ id, name }, index) => (
                                        <Sidebar.Item
                                            as={Link}
                                            to={`${Approutes.product.category}/${getCategoryName(id)}`}
                                            key={index}
                                        >
                                            {name}
                                        </Sidebar.Item>
                                    ))}
                                </Sidebar.Collapse>
                            ) : 
                            null}
                        </div>
                    ))}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default SidebarUI;
