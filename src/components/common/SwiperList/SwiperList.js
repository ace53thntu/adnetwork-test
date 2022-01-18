import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

import './SwiperList.styles.scss';

import PropTypes from 'prop-types';
import * as React from 'react';
import SwiperCore, {Navigation, Virtual} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

// install Virtual module
SwiperCore.use([Virtual, Navigation]);

const SLIDES_PER_VIEW = 4;

function SwiperList(props) {
  const {slides, onAsyncNext} = props;

  const [swiperRef, setSwiperRef] = React.useState(null);

  // const prepend = () => {
  //   swiperRef.virtual.prependSlide([
  //     'Slide ' + --prependNumber,
  //     'Slide ' + --prependNumber
  //   ]);
  // };

  // const append = () => {
  //   swiperRef.virtual.appendSlide('Slide ' + ++appendNumber);
  // };

  // const slideTo = index => {
  //   swiperRef.slideTo(index - 1, 0);
  // };

  const onNext = () => {
    onAsyncNext?.(swiperRef);
  };

  return (
    <Swiper
      virtual
      onSwiper={setSwiperRef}
      slidesPerView={SLIDES_PER_VIEW}
      spaceBetween={15}
      pagination={{
        type: 'fraction',
        clickable: true
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }}
      onSlideNextTransitionStart={onNext}
    >
      {slides.map((slideContent, index) => (
        <SwiperSlide key={index} virtualIndex={index}>
          {slideContent}
        </SwiperSlide>
      ))}

      {slides?.length > SLIDES_PER_VIEW && (
        <>
          <div className="swiper-button-prev swiper-navigation-button"></div>
          <div className="swiper-button-next swiper-navigation-button"></div>
        </>
      )}
    </Swiper>
  );
}

SwiperList.propTypes = {
  slides: PropTypes.array
};
SwiperList.defaultProps = {
  slides: []
};

export default SwiperList;
