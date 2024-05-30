import React from "react";
import Carousel from "./Carousel";

const CarouselShowcase: React.FC = () => {
  const carouselItems = [
    {
      title: "Item 1",
      description: "Description for item 1",
      imgSrc: "https://via.placeholder.com/800x400",
    },
    {
      title: "Item 2",
      description: "Description for item 2",
      imgSrc: "https://via.placeholder.com/800x400",
    },
    {
      title: "Item 3",
      description: "Description for item 3",
      imgSrc: "https://via.placeholder.com/800x400",
    },
  ];

  return (
    <>
      <a
        href="https://react-slick.neostack.com/docs/example/simple-slider"
        target="_blank"
      >
        설치플러그인
      </a>
      gpt 예제는 사이즈가 이상함...
      <a
        href="https://react-slick.neostack.com/docs/example/variable-width/"
        target="_blank"
      >
        샘플
      </a>
      <Carousel items={carouselItems} />
    </>
  );
};

export default CarouselShowcase;
