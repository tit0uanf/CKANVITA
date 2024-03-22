import React from 'react';

const More = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-7  text-lg font-semibold">
        <p>Register on</p>
        <h3 className=" text-center text-xl text-gray-200 font-bold mt-1 mb-1">
          <a
            href="https://register.ckanvita.com/"
            target="_blank"
            rel="noreferrer"
            className="text-[#fae100d3] hover:text-[#fae100]"
          >
            CKANVITA.com
          </a>
        </h3>
        <p>to get access to the Twitter overlay</p>
        <p className="mt-5 text-gray-400 text-base">
          Make sure to turn on the Overlay in the settings
        </p>
      </div>
      <div className="mt-24">
        <p class="text-sm text-center md:text-base">
          Unofficial Team Vitality extension
        </p>

        <p class="text-sm text-center md:text-base text-gray-500">
          Courtesy of{' '}
          <a
            href="https://twitter.com/VIT_Magenta"
            target="_blank"
            rel="noreferrer"
          >
            @VIT_Magenta
          </a>
        </p>
      </div>
    </>
  );
};
export default More;
