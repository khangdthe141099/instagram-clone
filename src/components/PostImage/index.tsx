import Image from "next/image";
import { Carousel } from "antd";
import { useRef, useState } from "react";

interface PostImageProps {
  postUrl?: string[];
}

const PostImage = (props: PostImageProps) => {
  const { postUrl } = props;

  const [currentSlide, setCurrentSlide] = useState(0);

  const slider = useRef<any>("");

  const onCarouselChange = (currentSlide: number) => {
    setCurrentSlide(currentSlide);
  };

  return (
    <>
      {postUrl?.length && postUrl?.length > 1 && (
        <div>
          {currentSlide && currentSlide > 0 ? (
            <div
              className="post-btn post-btn--prev"
              onClick={() => slider.current.prev()}
            >
              <div className="post-icon-inside post-icon-inside--prev"></div>
            </div>
          ) : null}
          {currentSlide !== postUrl?.length - 1 ? (
            <div
              className="post-btn post-btn--next"
              onClick={() => slider.current.next()}
            >
              <div className="post-icon-inside post-icon-inside--next"></div>
            </div>
          ) : null}
        </div>
      )}
      <Carousel afterChange={onCarouselChange} ref={slider}>
        {postUrl?.map((url: any, index) => (
          <Image
            key={index}
            width={550}
            height={468}
            src={url?.thumbUrl}
            alt="More option"
          />
        ))}
      </Carousel>
    </>
  );
};

export default PostImage;
