import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';
import CarouselCaptions from './CarouselCaptions';
import './GetCarousel.css';

const items = [
	{
		id: 1,
		src: 'https://i.ytimg.com/vi/pyBtwWDzacI/maxresdefault.jpg',
		altText: 'SOCIAL'
	},
	{
		src:
			'https://cdn.iphonelife.com/sites/iphonelife.com/files/styles/promo_in_content_breakpoints_theme_newmango_mobile_2x/public/shutterstock_500148850.jpg?itok=LKlfcqcy',
		id: 2,
		altText: 'MOVIES'
	},
	{
		id: '3',
		src:
			'https://www.telegraph.co.uk/content/dam/technology/2018/02/19/Apple-Music-Amazon-Music-Compared_trans_NvBQzQNjv4BqzpLIMkIGUMcygT0RwMtmygpcDfsC-seRM-lm2nZ7XJA.jpg?imwidth=450',

		altText: 'MUSIC'
	},
	{
		id: '4',
		src: 'https://d1sgwhnao7452x.cloudfront.net/360i_test1_CA_EN.jpg',
		altText: 'SPORTS'
	}
];

class GetCarousel extends Component {
	constructor(props) {
		super(props);
		this.state = { activeIndex: 0 };
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}

	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex =
			this.state.activeIndex === items.length - 1
				? 0
				: this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex =
			this.state.activeIndex === 0
				? items.length - 1
				: this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	render() {
		const { activeIndex } = this.state;

		const slides = items.map(item => {
			return (
				<CarouselItem
					className='custom-tag'
					tag='div'
					key={item.id}
					onExiting={this.onExiting}
					onExited={this.onExited}
				>
					<img
						src={item.src}
						className='imageStyling'
						alt={item.caption}
						style={{
							maxHeight: '400px',
							display: 'block',
							marginLeft: 'auto',
							marginRight: 'auto'
						}}
					/>
					<CarouselCaptions className='header' captionHeaders={item.altText} />
				</CarouselItem>
			);
		});

		return (
			<div>
				<style>
					{`.custom-tag {
			}`}
				</style>
				<Carousel
					activeIndex={activeIndex}
					next={this.next}
					previous={this.previous}
				>
					{slides}
					<CarouselControl
						direction='prev'
						directionText='Previous'
						onClickHandler={this.previous}
					/>
					<CarouselControl
						direction='next'
						directionText='Next'
						onClickHandler={this.next}
					/>
				</Carousel>
			</div>
		);
	}
}

export default GetCarousel;
