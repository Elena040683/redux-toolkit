import s from './SolidTitle.module.css';
import { gsap } from 'gsap';
import { useRef, useCallback } from 'react';

export function SolidTitle({ titleText }) {
  const title = useRef(); // теперь title - переменная, которая общается с заголовком <h2></h2> 
  // и получается, что 2 обработчика handleMouseLeave и handleMouseEnter будут работать конкретно с <h2></h2>
  // Обработчики событий
  // Обработчики требуют ссылку на дом-узел title.current
  // нужно получить доступ к title т.е. к нашему <h2></h2> через useRef()
  const handleMouseLeave = useCallback(() => {
    gsap.to(
      'feDisplacementMap',
      1,
      {
        attr: {
          scale: 0,
        },
        ease: 'circ.out',
      },
      1,
    );
    gsap.to(
      'feTurbulence',
      1,
      {
        attr: {
          baseFrequency: '2.01 .01',
        },
        ease: 'circ.out',
      },
      1,
    );
    gsap.to(
      title.current,
      1,
      {
        fontVariationSettings: "'wght' 700",
        ease: 'back.out',
      },
      1,
    );
  }, []);
  const handleMouseEnter = useCallback(() => {
    gsap.to('feDisplacementMap', 1, {
      attr: {
        scale: 100,
      },
      ease: 'circ.out',
    });
    gsap.to(
      'feTurbulence',
      1,
      {
        attr: {
          baseFrequency: '2.08 .08',
        },
        ease: 'circ.out',
      },
      1,
    );
    gsap.to(title.current, 1, {
      fontVariationSettings: "'wght' 650",
      ease: 'back.out',
    });
  }, []);

  return (
    <>
      <h2
        className={s.title3}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={title}
      >
        {titleText} {/* ожидаю через пропы значение заголовка */}
      </h2>
      <svg className={s.distort}>
        <filter id="distortionFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2.01 .01"
            numOctaves="5"
            seed="2"
            stitchTiles="noStitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="noise"
          ></feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="userSpaceOnUse"
          ></feDisplacementMap>
        </filter>
      </svg>
    </>
  );
}