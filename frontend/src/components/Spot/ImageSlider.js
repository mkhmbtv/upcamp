import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";

const ImageSlider = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={15}
      slidesPerView={2}
      navigation={true}
      loop={true}
    >
      {images.map((img) => (
        <SwiperSlide key={img.id}>
          <img src={img.url} alt='slide' />
        </SwiperSlide>
      ))}
    </Swiper>
  )
};

export default ImageSlider;