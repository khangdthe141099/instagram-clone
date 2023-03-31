import { FC, useRef, useEffect, useState, useCallback } from "react";
import ReelsItem from "./ReelsItem";
import { reels } from "./data";

const HomeReels: FC = () => {
  const initialArrow = {
    arrowLeft: true,
    arrowRight: true,
  };

  const [arrowDisplay, setArrowDisplay] = useState<{
    arrowLeft: boolean;
    arrowRight: boolean;
  }>(initialArrow);
  const carouselRef = useRef<any>("");
  const [carouseState, setCarouseState] = useState(0);

  const handleSlide = (direction?: any) => {
    if (direction === "left") {
      carouselRef.current.scrollLeft -= 400;
      setCarouseState((prev) => prev - 400);
    }
    if (direction === "right") {
      carouselRef.current.scrollLeft += 400;
      setCarouseState((prev) => prev + 400);
    }

    if (carouseState !== 0) {
      setArrowDisplay({ ...initialArrow });
    }

    if (
      Math.floor(carouselRef.current.scrollLeft) ===
      carouselRef.current.scrollWidth - carouselRef.current.clientWidth
    ) {
      setArrowDisplay((prev) => ({ ...prev, arrowRight: false }));
    }

    if (carouseState === 0) {
      //Spread object with previous value work when wrap object in ():
      setArrowDisplay((prev) => ({ ...prev, arrowLeft: false }));
    }
  };

  useEffect(() => {
    handleSlide();
  }, [carouseState]);

  return (
    <section className="check">
      {arrowDisplay.arrowLeft && (
        <div className="arrow-btn left-icon">
          <div
            onClick={() => handleSlide("left")}
            className="icon-inside icon-inside--left"
          ></div>
        </div>
      )}
      {arrowDisplay.arrowRight && (
        <div className="arrow-btn right-icon">
          <div
            onClick={() => handleSlide("right")}
            className="icon-inside icon-inside--right"
          ></div>
        </div>
      )}
      <div ref={carouselRef} className="carousel-body">
        {reels.map((item, index) => {
          return <ReelsItem key={index} {...item} />;
        })}
      </div>
    </section>
  );
};

export default HomeReels;
