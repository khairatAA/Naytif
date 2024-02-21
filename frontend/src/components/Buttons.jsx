// Buttons implementation
import React from 'react';

// Green button customization with icon
export function GreenButtonsWithIcon({ text, icon }) {
    return (
      <button className="flex items-center px-7 py-3 justify-center rounded-lg bg-green gap-4 hover:bg-black active:bg-green focus:outline-none focus:ring">
        <img src={icon} alt="button-icon" />
        <span className="text-white text-xl font-sans font-normal">{text}</span>
      </button>
    )
};

// Yellow button customization
export function YellowButtons({text}) {
    return (
        <button className="flex items-center px-7 py-3 justify-center rounded-lg bg-yellow gap-4 hover:bg-white active:bg-yellow focus:outline-none focus:ring">
          {/* <img src={icon} alt="button-icon" /> */}
          <span className="text-black text-xl font-sans font-normal">{text}</span>
        </button>
      )
};

// Small green buttons
export function GreenButtons({ text }) {
    return (
      <button className="flex items-center px-7 py-3 justify-center rounded-lg bg-green gap-4 hover:bg-black active:bg-green focus:outline-none focus:ring">
        <span className="text-white text-xl font-sans font-normal">{text}</span>
      </button>
    )
};

// Big green button
export function BigGreenButtons({ text }) {
  return (
    <button className="flex items-center px-20 py-3 w-full justify-center rounded-lg bg-green gap-4 hover:bg-black active:bg-green focus:outline-none focus:ring">
      <span className="text-white text-xl font-sans font-normal max-md:text-base">{text}</span>
    </button>
  )
};

// Big yellow button
export function BigYellowButtons({ text }) {
  return (
    <button className="flex items-center px-20 py-3 justify-center rounded-lg bg-yellow gap-4 hover:bg-white active:bg-yellow focus:outline-none focus:ring">
      {/* <img src={icon} alt="button-icon" /> */}
      <span className="text-black text-xl font-sans font-normal max-md:text-base">{text}</span>
    </button>
  )
};
