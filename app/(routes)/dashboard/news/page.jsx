import { ArrowRight, ArrowRightCircleIcon } from 'lucide-react'
import React from 'react'

function FinancialNewsPage() {
    return (
        <section class="text-gray-400 bg-transparent body-font p-10">
            <div className='font-bold text-tertiary text-4xl md:text-6xl'>Business News in progress...</div>
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col">
                    <div class="h-1 bg-gray-800 rounded overflow-hidden">
                        <div class="w-24 h-full bg-blue-600"></div>
                    </div>
                    <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                        <h1 class="sm:w-2/5 text-white font-medium title-font text-2xl mb-2 sm:mb-0">Space The Final Frontier</h1>
                        <p class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Street art subway tile salvia four dollar toast bitters selfies quinoa yuccie synth meditation iPhone intelligentsia prism tofu. Viral gochujang bitters dreamcatcher.</p>
                    </div>
                </div>
                <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                    <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
                        <div class="rounded-lg h-64 overflow-hidden">
                            <img alt="content" class="object-cover object-center h-full w-full" src="https://dummyimage.com/1203x503"></img>
                        </div>
                        <h2 class="text-xl font-medium title-font text-white mt-5">Shooting Stars</h2>
                        <p class="text-base leading-relaxed mt-2">Swag shoindxgoitch literally meditation subway tile tumblr cold-pressed. Gastropub street art beard dreamcatcher neutra, ethical XOXO lumbersexual.</p>
                        <a class="text-blue-600 inline-flex items-center mt-3 cursor-pointer">Learn More
                            <ArrowRightCircleIcon className='text-blue-600 ml-2 w-4 h-4' />
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </a>
                    </div>
                    <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
                        <div class="rounded-lg h-64 overflow-hidden">
                            <img alt="content" class="object-cover object-center h-full w-full" src="https://dummyimage.com/1204x504"></img>
                        </div>
                        <h2 class="text-xl font-medium title-font text-white mt-5">The Catalyzer</h2>
                        <p class="text-base leading-relaxed mt-2">Swag shoindxigoitch literally meditation subway tile tumblr cold-pressed. Gastropub street art beard dreamcatcher neutra, ethical XOXO lumbersexual.</p>
                        <a class="text-blue-600 inline-flex items-center mt-3 cursor-pointer">Learn More
                            <ArrowRightCircleIcon className='text-blue-600 ml-2 w-4 h-4' />
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </a>
                    </div>
                    <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
                        <div class="rounded-lg h-64 overflow-hidden">
                            <img alt="content" class="object-cover object-center h-full w-full" src="https://dummyimage.com/1205x505"></img>
                        </div>
                        <h2 class="text-xl font-medium title-font text-white mt-5">The 400 Blows</h2>
                        <p class="text-base leading-relaxed mt-2">Swag shoindegoitch literally meditation subway tile tumblr cold-pressed. Gastropub street art beard dreamcatcher neutra, ethical XOXO lumbersexual.</p>
                        <a class="text-blue-600 inline-flex items-center mt-3 cursor-pointer">Learn More
                            <ArrowRightCircleIcon className='text-blue-600 ml-2 w-4 h-4' />
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FinancialNewsPage