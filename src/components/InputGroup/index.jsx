import React from 'react';

const InputGroup = ({
    placeHolder,
    type,
    bgColor,
    hasBorder,
    handleShowPassword,
    hasPassword = false,
    name,
    value,
    handleChange,
    error,
}) => {
    return (
        <div className="mb-[1.7rem]">
            <div
                className={`${bgColor} ${
                    hasBorder && 'border-solid border-2 border-black'
                } w-full  flex items-center`}
            >
                <input
                    type={type}
                    className={`${bgColor} border-none outline-none w-full text-[rgba(0, 0, 0, 0.30)] text-[1.2rem] font-sans py-2 px-6`}
                    placeholder={placeHolder}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    required
                />
                {hasPassword && (
                    <span
                        className="text-[rgba(0, 0, 0, 0.30)] text-[1.2rem] font-sans px-3 cursor-pointer  border-l "
                        onClick={handleShowPassword}
                    >
            Show
                    </span>
                )}
            </div>
            {error}
        </div>
    );
};

export default InputGroup;
