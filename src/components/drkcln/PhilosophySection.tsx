import React, { useEffect, useRef } from 'react';

export const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === pillarsRef.current && pillarsRef.current) {
              const pillars = pillarsRef.current.querySelectorAll('.pillar');
              pillars.forEach((pillar, index) => {
                setTimeout(() => {
                  pillar.classList.add('translate-y-0', 'opacity-100');
                  pillar.classList.remove('translate-y-10', 'opacity-0');
                }, index * 200);
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (pillarsRef.current) {
      observer.observe(pillarsRef.current);
    }

    return () => {
      if (pillarsRef.current) {
        observer.unobserve(pillarsRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-black to-gray-900 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-green-400 md:text-6xl">
          <span className="text-white">&lt;</span>
          philosophy
          <span className="text-white">/&gt;</span>
        </h2>

        <div className="mx-auto mb-20 max-w-3xl text-center">
          <p className="mb-8 text-lg text-green-300 md:text-xl">
            Our design philosophy is built on three core principles that guide everything we create.
            Each garment is an extension of these values, brought to life through meticulous
            craftsmanship and forward-thinking design.
          </p>
        </div>

        <div ref={pillarsRef} className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Digital Minimalism */}
          <div className="pillar relative translate-y-10 border border-green-500/30 bg-black p-8 opacity-0 transition-all duration-700 ease-out">
            <div className="absolute -top-5 left-0 right-0 flex justify-center">
              <div className="border border-green-500/30 bg-black px-4 py-2 font-mono text-green-400">
                01
              </div>
            </div>

            <h3 className="mb-4 mt-4 text-2xl font-bold text-white">Digital Minimalism</h3>

            <p className="mb-6 text-green-300">
              We strip away the unnecessary to focus on what truly matters. Our designs embrace the
              elegance of minimalism while incorporating subtle digital elements that speak to the
              technological age.
            </p>

            <div className="mt-6 h-1 w-20 bg-green-400"></div>

            {/* Binary code decoration */}
            <div className="absolute bottom-4 right-4 font-mono text-xs text-green-500/20">
              01001101
            </div>
          </div>

          {/* Sustainable Innovation */}
          <div className="pillar relative translate-y-10 border border-green-500/30 bg-black p-8 opacity-0 transition-all duration-700 ease-out">
            <div className="absolute -top-5 left-0 right-0 flex justify-center">
              <div className="border border-green-500/30 bg-black px-4 py-2 font-mono text-green-400">
                02
              </div>
            </div>

            <h3 className="mb-4 mt-4 text-2xl font-bold text-white">Sustainable Innovation</h3>

            <p className="mb-6 text-green-300">
              Our commitment to the planet is unwavering. We use cutting-edge sustainable materials
              and production methods to minimize our environmental footprint while maximizing design
              innovation.
            </p>

            <div className="mt-6 h-1 w-20 bg-green-400"></div>

            {/* Binary code decoration */}
            <div className="absolute bottom-4 right-4 font-mono text-xs text-green-500/20">
              01001001
            </div>
          </div>

          {/* Digital-Physical Fusion */}
          <div className="pillar relative translate-y-10 border border-green-500/30 bg-black p-8 opacity-0 transition-all duration-700 ease-out">
            <div className="absolute -top-5 left-0 right-0 flex justify-center">
              <div className="border border-green-500/30 bg-black px-4 py-2 font-mono text-green-400">
                03
              </div>
            </div>

            <h3 className="mb-4 mt-4 text-2xl font-bold text-white">Digital-Physical Fusion</h3>

            <p className="mb-6 text-green-300">
              We blend the boundaries between the digital and physical worlds. Our garments exist
              both in reality and virtually, creating a seamless experience across both realms.
            </p>

            <div className="mt-6 h-1 w-20 bg-green-400"></div>

            {/* Binary code decoration */}
            <div className="absolute bottom-4 right-4 font-mono text-xs text-green-500/20">
              01000110
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mx-auto mt-24 max-w-3xl text-center">
          <p className="text-2xl italic text-green-400 md:text-3xl">
            "We don't just create clothing. We encode wearable expressions of digital culture."
          </p>
          <p className="mt-4 text-white">— Founder, &lt;drkcln/&gt;</p>
        </div>
      </div>
    </section>
  );
};
