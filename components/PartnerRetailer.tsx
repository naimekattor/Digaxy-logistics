import React from 'react'
const logos1 = [
  { id: 1, component: "/images/partLogos/ikea.png" },
  { id: 2, component: "/images/partLogos/Costco-Logo-PNG-Photos 1.png" },
  { id: 3, component: "/images/partLogos/image663.png" },
  { id: 4, component: "/images/partLogos/thehome.png" },
  { id: 5, component: "/images/partLogos/Walmart.png" },
  { id: 6, component: "/images/partLogos/ikea.png" },

];
const PartnerRetailer = () => {

  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes marquee-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const Marquee = ({ logos, pauseOnHover = true }: { logos: typeof logos1; pauseOnHover?: boolean }) => {
    const [isPaused, setIsPaused] = React.useState(false);
    
   
    const allLogos = [...logos, ...logos, ...logos, ...logos]; 

    return (
      <div
        className="max-w-full overflow-hidden relative group"
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        style={{
             maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        } as React.CSSProperties}
      >
        <div
          className="flex gap-8 w-max"
          style={{
            animation: 'marquee-scroll 40s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            width: 'max-content'
          } as React.CSSProperties}
        >
          {allLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[120px] h-[100px] flex justify-center items-center bg-white border border-gray-200 rounded-xl hover:border-[#A87900] transition-colors duration-300"
            >
              <img className="max-w-[70%] max-h-[70%] object-contain opacity-100  hover:grayscale-0 hover:opacity-100 transition-all duration-300" src={logo.component} alt="partner logo" />
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <section className="py-20 px-4 bg-gray-50/50">
            <div className="max-w-7xl mx-auto text-center">
                <h4 className="font-bold text-gray-400 mb-10 tracking-[0.2em] uppercase text-sm">Partner Retailers</h4>
                <div className="w-full max-w-6xl flex flex-col gap-y-6">
            <Marquee logos={logos1} />
        </div>
            </div>
        </section>
  )
}

export default PartnerRetailer
