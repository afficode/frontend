const Button = ({ variant, size, loading, disabled, children, className, ...rest }) => {
	const primaryStyles = `${
		size === 'small' ? 'py-[0.5rem] px-[1.5rem]' : 'py-[.75rem] px-[2.8rem]'
	} ${size === 'full' ? 'w-full' : 'w-auto'} bg-primary text-white hover:brightness-90 w-auto`;

	const secondaryStyles = `${
		size === 'small' ? 'py-[0.5rem] px-[1.5rem]' : 'py-[.75rem] px-[2.8rem]'
	} ${
		size === 'full' ? 'w-full' : 'w-auto'
	} bg-secondary text-black hover:opacity-90 border hover:border-black`;

	const subtleStyles = `${
		size === 'small' ? 'py-[0.5rem] px-[1.5rem]' : 'py-[.65rem] px-[2.8rem]'
	} ${
		size === 'full' ? 'w-full' : 'w-auto'
	} bg-transparent text-primary border border-primary hover:bg-primary hover:text-white`;

	return (
		<button
			disabled={disabled || loading}
			className={`${className} ${disabled || loading ? 'cursor-not-allowed opacity-60' : ''} ${
				variant === 'primary'
					? primaryStyles
					: variant === 'secondary'
					? secondaryStyles
					: variant === 'subtle'
					? subtleStyles
					: variant === 'outline'
					? 'outline-btn'
					: ''
			}  normal-case transition-all ease-in-out duration-200 active:scale-[0.975]`}
			{...rest}
		>
			{loading ? (
				<span className="flex items-center gap-2 justify-center">
					<span className="loading loading-spinner" />
					{children}
				</span>
			) : (
				children
			)}
		</button>
	);
};

export default Button;