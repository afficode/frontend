

const Spinners = ({
    spinnerType = 'spinner',
    size = 'md',
    color = 'black',
}) => {
    /**
   * - spinnerType: spinner, dots, ring, ball, bars, infinity
   * - size - xs, sm, md, lg
   * - color: normal tailwind / daisyui color
   */
    return (
        <span
            className={`loading loading-${spinnerType} loading-${size} text-${color} `}
        ></span>
    );
};

export default Spinners;
