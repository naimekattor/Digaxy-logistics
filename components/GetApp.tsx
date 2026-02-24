import React from "react"
import Image from "next/image"
import Link from "next/link"

const GetApp = () => {
  return (
    <section className="bg-white py-24">
    <div className="max-content mx-auto flex flex-col items-center gap-10 ">
      <Link target="_blank" href={"https://play.google.com/store/apps?hl=en-us"}
       className="md:text-[24px] text-[16px]  md:font-bold font-semibold px-6 py-3 bg-[#A97200] text-white rounded-[16px]">
        Get the Digaxy App
      </Link>

      <div className="relative aspect-[13/5] w-full max-w-5xl">
        <Image
          src="/images/iPhone15Pro.png"
          alt="iPhone 15 Pro"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
    </section>
  )
}

export default GetApp
