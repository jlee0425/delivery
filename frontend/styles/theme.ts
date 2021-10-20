import { css } from 'styled-components';

const TextEllipsis = css`
	display: inline-block;
	width: 100%;
	height: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

const FlexCenter = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const OverflowScroll = css`
	height: 100%;
	overflow-y: scroll;
`;

const theme = {
	TextEllipsis,
	FlexCenter,
	OverflowScroll,
};

export default theme;
