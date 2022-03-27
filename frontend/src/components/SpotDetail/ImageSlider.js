import { useSelector } from 'react-redux';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";

const ImageSlider = ({ imageIds }) => {
  const images = useSelector((state) => state.images.byId);

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={15}
      slidesPerView={2}
      navigation={true}
      loop={true}
    >
      {imageIds.map((imgId) => (
        <SwiperSlide key={imgId}>
          <img src={images[imgId].url} alt='slide' />
        </SwiperSlide>
      ))}
    </Swiper>
  )
};

export default ImageSlider;