import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
	/* variant styles  */
	${({ $variant }) => {
		$variant === 'primary' && css``;
	}}

	${({ $variant }) => {
		$variant === 'secondary' && css``;
	}}

   ${({ $variant }) =>
		$variant === 'styled' &&
		css`
			font-size: 1.2rem;
			border-radius: 1.875rem;
			background: #2686ce;
			padding: 1rem 3rem;
			color: #fff;
		`}

   ${({ $variant }) => {
		$variant === 'text' && css``;
	}}
`;
