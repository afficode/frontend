import { StyledButton } from './styles';

const Button = ({ variant, size, loading, disabled, children, className, ...rest }) => {
	return (
		<StyledButton
			$variant={variant}
			$size={size}
			disabled={disabled || loading}
			{...rest}
			className={className ? className : ''}
		>
			{loading ? 'Loading...' : children}
		</StyledButton>
	);
};

export default Button;
