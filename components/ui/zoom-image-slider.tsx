'use client';

import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? ' arrow--disabled' : '';

  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? 'arrow--left' : 'arrow--right'
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

type SliderProps = {
  slides: string[];
  startSlide?: number;
};

const ZoomImageSlider: React.FC<SliderProps> = ({ slides, startSlide }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: startSlide ?? 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    drag: false, // Забороняємо зміну слайду перетягуванням
  });

  return (
    <div className="flex flex-col">
      <div
        ref={sliderRef}
        className="keen-slider relative flex aspect-square cursor-pointer items-center rounded-md bg-white"
        style={{ touchAction: 'none' }} // Додаємо touchAction, щоб уникнути блокування подій
      >
        {slides?.map((slide, idx) => (
          <div
            key={idx}
            className={`keen-slider__slide relative h-full w-full aspect-square inset-0 overflow-hidden rounded-md }`}
          >
            <TransformWrapper
              maxScale={5}
              onZoomStop={(ref) => {
                if (ref.state.scale >= 5) {
                  ref.resetTransform();
                }
              }}
              pinch={{ disabled: false, step: 0.5 }}
              doubleClick={{ disabled: false, step: 0.5 }}
            >
              <TransformComponent>
                <div
                  className="relative w-full h-full cursor-zoom-in"
                  style={{ touchAction: 'none' }}
                >
                  <Image
                    ref={imageRef}
                    src={slide}
                    alt="Image"
                    width={1000}
                    height={1000}
                    className={'object-contain object-center cursor-zoom-in '}
                    priority={idx === 0}
                    onLoad={() => instanceRef.current?.update()}
                  />
                </div>
              </TransformComponent>
            </TransformWrapper>
          </div>
        ))}

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ZoomImageSlider;
