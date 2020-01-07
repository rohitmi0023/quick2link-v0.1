import React from 'react';
import PropTypes from 'prop-types';
import './GetCarousel.css';

const CarouselCaptions = props => {
	const { captionHeaders } = props;

	return (
		<div className='header'>
			<div className='HeaderTexts'>{captionHeaders} </div>
		</div>
	);
};

CarouselCaptions.propTypes = {
	captionHeaders: PropTypes.string.isRequired
};

export default CarouselCaptions;
