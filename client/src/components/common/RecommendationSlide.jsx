import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";

const RecommendationSlide = ({ media, mediaTypes }) => {
  return (
    <AutoSwiper>
      {media.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaTypes} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendationSlide;
