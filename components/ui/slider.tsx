"use client";

import React from "react"
import { useKeenSlider } from "keen-slider/react"
import { useState } from "react"
import Image from "next/image"


function ThumbnailPlugin(mainRef: any) {
return (slider: any) => {
    function removeActive() {
      slider.slides.forEach((slide: any) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx:number) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide: any, idx: number) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main: any) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
  }) {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${
          props.left ? "arrow--left" : "arrow--right"
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
    )
  }
  

type SliderProps = {
    slides: string[];
  };

 const Slider: React.FC<SliderProps> = ({slides}) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  return (
    <div className="flex flex-col">
      <div ref={sliderRef} className="keen-slider relative flex aspect-square cursor-pointer items-center rounded-md bg-white">
        {slides?.map((slide, idx) => (
        <div key={idx} className="keen-slider__slide absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md ">
          <Image
            src={slide}
            alt="Image"
            fill
            className="object-contain object-center"
            priority={idx === 0}
            onLoad={() => instanceRef.current?.update()}
          />
        </div>))}
      
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

      <div ref={thumbnailRef} className="keen-slider thumbnail gap-1 mx-auto mt-6   w-full  overflow-hidden max-w-2xl sm:block lg:max-w-none">
      {slides?.map((slide, idx) => (
        <div key={idx} className="keen-slider__slide cursor-pointer aspect-square ">
            <Image
                src={slide}
                alt="Image"
                fill
                className="object-contain object-center"
            />
            </div>))}
      </div>
    </div>
  )
}

export default Slider;