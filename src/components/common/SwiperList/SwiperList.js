import 'swiper/swiper.min.css';
// import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

import './SwiperList.styles.scss';

import PropTypes from 'prop-types';
import * as React from 'react';
import SwiperCore, {Lazy, Navigation, Virtual} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

// install Virtual module
SwiperCore.use([Virtual, Navigation, Lazy]);

const SLIDES_PER_VIEW = 4;

function SwiperList(props) {
  const {slides, onAsyncNext} = props;

  const slidesCount = slides?.length ?? 0;
  const isEnableNavigation = slidesCount > SLIDES_PER_VIEW;

  const [swiperRef, setSwiperRef] = React.useState(null);

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
      navigation={isEnableNavigation}
      onSlideNextTransitionStart={onNext}
    >
      {slides.map((slideContent, index) => (
        <SwiperSlide key={index} virtualIndex={index}>
          {slideContent}
        </SwiperSlide>
      ))}
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
