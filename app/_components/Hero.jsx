import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <section className="bg-gray-50 flex items-center justify-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
        <Image src="/PeraPinoy1.png" alt="logo"
        width={200}
        height={90}
        className= 'mx-auto'
        />
      <h1 className="text-4xl font-extrabold sm:text-4xl text-primary">
       {/* text */}
      </h1>
      <h2 className="font-extrabold text-4xl sm:text-5xl text-red-700"> Welcome to the Pinoy Finance App </h2>
      <p className="mt-4 sm:text-md/relaxed text-yellow-500">
      Are you ready to take control of your finances? Look no further! The Pinoy Finance App is designed specifically for Filipino users, combining cutting-edge technology with local expertise.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-tertiary focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="#"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded bg-secondary px-12 py-3 text-sm font-medium text-white shadow hover:bg-tertiary focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
  
</section>
  )
}

export default Hero