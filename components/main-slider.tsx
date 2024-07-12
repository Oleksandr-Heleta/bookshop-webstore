'use client';

import { Billboard as BillboardType } from "@/type";
import React from "react"
import { useKeenSlider } from "keen-slider/react"
import { useState } from "react"
import Billboard from "./billboard";

interface MainSliderProps {
    billboards: BillboardType[];
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
  


const MainSlider: React.FC<MainSliderProps> = ({ billboards }) => {

    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
      [
        (slider: any) => {
          let timeout: ReturnType<typeof setTimeout>
          let mouseOver = false
          function clearNextTimeout() {
            clearTimeout(timeout)
          }
          function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
              slider.next()
            }, 8000)
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true
              clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false
              nextTimeout()
            })
            nextTimeout()
          })
          slider.on("dragStarted", clearNextTimeout)
          slider.on("animationEnded", nextTimeout)
          slider.on("updated", nextTimeout)
        },
      ],
    )

    return (
        <div className="relative">
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
            {billboards?.map((billboard : BillboardType, idx : number) => (
              <div key={idx} className="keen-slider__slide">
                  <Billboard data={billboard} />
              </div>
            ))}
            </div>
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
          {loaded && instanceRef.current && (
            <div className="dots absolute inset-x-0 bottom-2 z-10">
              {[
                ...Array(instanceRef.current.track.details.slides.length).keys(),
              ].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                    className={"dot border-gray-100" + (currentSlide === idx ? " active" : "")}
                  ></button>
                )
              })}
            </div>
          )}
        </div>
      )
  
//     const [currentSlide, setCurrentSlide] = useState(0)
//     const [loaded, setLoaded] = useState(false)
//   const [sliderRef, instanceRef] = useKeenSlider({
//     initial: 0,
//   })
//   const [thumbnailRef] = useKeenSlider(
//     {
//       initial: 0,
//       slides: {
//         perView: 4,
//         spacing: 10,
//       },
//       slideChanged(slider) {
//         setCurrentSlide(slider.track.details.rel)
//       },
//       created() {
//         setLoaded(true)
//       },
//     },
    
//   )

//   return (
//     <div className="flex flex-col">
//       <div ref={sliderRef} className="keen-slider relative flex aspect-square cursor-pointer items-center rounded-md bg-white">
//         {billboards?.map((billboard : BillboardType, idx : number) => (
//         <div key={idx} className="keen-slider__slide absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md ">
//          <Billboard data={billboard} />
//         </div>))}
      
//         {loaded && instanceRef.current && (
//           <>
//             <Arrow
//               left
//               onClick={(e: any) =>
//                 e.stopPropagation() || instanceRef.current?.prev()
//               }
//               disabled={currentSlide === 0}
//             />

//             <Arrow
//               onClick={(e: any) =>
//                 e.stopPropagation() || instanceRef.current?.next()
//               }
//               disabled={
//                 currentSlide ===
//                 instanceRef.current.track.details.slides.length - 1
//               }
//             />
//           </>
//         )}
//      </div>
//      </div>);
};

export default MainSlider;