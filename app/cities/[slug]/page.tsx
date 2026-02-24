import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/MainLayout';
import CityBookingForm from '@/components/CityBookingForm';

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CityPage({ params }: CityPageProps) {

  const {slug} =await params;
  console.log(slug);
  
  const cityName = slug
    .split('--')
    .map((part, i) => 
      i === slug.split('-').length - 1 
        ? part.toUpperCase() 
        : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(' ')
    .replace(/-/g, ' ');

  const cityDisplay = `${cityName}`; 

  return (
    <MainLayout>
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section with City Image */}
      <section className="relative bg-gray-50 py-16">
  <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-8">
    {/* Left - Form and Text */}
    <div className="  flex-1 p-8 md:p-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Digaxy Movers in {cityDisplay}
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">
        Fast, affordable on-demand moving and delivery services anywhere in {cityDisplay}
      </p>

      <CityBookingForm />
    </div>

    {/* Right - City Image */}
    <div className="flex-1 rounded-2xl overflow-hidden shadow-xl h-80 md:h-[28rem] relative">
      <Image
        src="https://thumbs.dreamstime.com/b/sunny-day-denver-colorado-united-states-downtown-city-skyline-blue-sky-48913281.jpg"
        alt={`Skyline of ${cityDisplay}`}
        fill
        className="object-cover"
        priority
      />
    </div>
  </div>
</section>


      <div className="max-w-6xl mx-auto px-6 md:px-8 -mt-16 relative z-10">
        {/* Main Card / Form Section */}
        <div className=" overflow-hidden  ">
          

          {/* Ratings */}
          <div className=" py-8 px-8 md:px-12 ">
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 text-center">
              <div>
                <div className="text-4xl font-bold text-brand-gold">4.9/5</div>
                <div className="text-sm text-gray-600 mt-1">Digaxy Overall Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-gold">4.8/5</div>
                <div className="text-sm text-gray-600 mt-1">Delivery Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-gold">4.7/5</div>
                <div className="text-sm text-gray-600 mt-1">Furniture Moves</div>
              </div>
            </div>
          </div>

          {/* Available Services - Vehicle Types */}
          <div className="p-8 md:p-12 ">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
              Services Available in This City
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { name: 'Lite', desc: 'Small/light items', icon: '/images/pickup_truck.png' },
                { name: 'Van', desc: 'Large moves', icon: '/images/van.png' },
                { name: 'Pickup', desc: 'Medium moves', icon: '/images/mini_box_truck.png' },
                { name: 'XL', desc: 'Oversized loads', icon: '/images/26Feet_box_truck.png' },
              ].map((service) => (
                <div key={service.name} className="text-center group">
                  <div className="relative h-32 md:h-40 mb-4 rounded-xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                    <Image
                      src={service.icon}
                      alt={`${service.name} vehicle icon`}
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Why Choose Digaxy in This City (Local Benefits)
          </h2>

          <ul className="max-w-3xl mx-auto space-y-4 text-left text-lg">
            {[
              'Near-instant delivery times',
              'Best rates for short-distance moves',
              'Movers available 7 days a week',
              'Same-day and scheduled deliveries',
              'Able to make call / message',
            ].map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="text-brand-gold text-2xl font-bold">✔</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
    </MainLayout>
  );
}

