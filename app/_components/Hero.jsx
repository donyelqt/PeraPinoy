import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <section className="flex items-center justify-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-2xl text-center pb-20">
          <Image src="/NewLogo.png" alt="logo"
            width={200}
            height={100}
            className='mx-auto'
          />
          <h1 className="text-4xl font-extrabold sm:text-4xl text-primary">
            {/* text */}
          </h1>
          <h2 className="font-extrabold text-4xl sm:text-5xl text-orange">Empower <span className='text-secondary'>Your Finances</span><span className='text-primary'> with</span> <span className='text-orange'>Pera</span><span className='text-secondary'>Pin</span><span className='text-primary'>oy</span><span className='text-tertiary'>!</span></h2>
          <p className="mt-4 sm:text-md/relaxed text-gray-500">
            Are you ready to take control of your finances? Look no further! The Pinoy Finance App is designed specifically for Filipino users, combining cutting-edge technology with local expertise.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded-lg bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/sign-in"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded-lg bg-secondary px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="/dashboard"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero