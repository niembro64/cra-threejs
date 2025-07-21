import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-green-500/30 bg-black px-6 py-12 font-mono text-gray-400">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 text-3xl font-bold text-green-400">&lt;drkcln/&gt;</div>
            <p className="mb-6 text-sm">
              Digital streetwear for the cybernetic generation. Bridging the gap between fashion and
              technology.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-green-400 transition-colors duration-300 hover:text-green-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm.003 2.5h.001c2.115 0 2.365.009 3.204.047a5.3 5.3 0 0 1 1.772.33 2.4 2.4 0 0 1 .91.593c.259.259.435.546.592.908.167.433.275.98.33 1.772.036.839.046 1.088.046 3.204 0 2.117-.01 2.366-.046 3.205a5.3 5.3 0 0 1-.33 1.772 2.55 2.55 0 0 1-.592.909c-.26.259-.547.435-.91.592a5.34 5.34 0 0 1-1.772.33c-.838.037-1.088.046-3.204.046-2.117 0-2.366-.009-3.205-.047a5.33 5.33 0 0 1-1.77-.33 2.55 2.55 0 0 1-.909-.591 2.4 2.4 0 0 1-.592-.909 5.32 5.32 0 0 1-.332-1.773C2.509 10.366 2.5 10.117 2.5 8s.01-2.366.047-3.205c.037-.792.145-1.339.332-1.773a2.4 2.4 0 0 1 .591-.908 2.4 2.4 0 0 1 .909-.592 5.33 5.33 0 0 1 1.772-.33c.838-.038 1.088-.047 3.205-.047z" />
                  <path d="M8 5.293a2.707 2.707 0 1 0 0 5.414 2.707 2.707 0 0 0 0-5.414zM8 9.93a1.223 1.223 0 1 1 0-2.446A1.223 1.223 0 0 1 8 9.93zm2.578-5.785a.63.63 0 0 0-.63.63.63.63 0 0 0 1.26 0 .63.63 0 0 0-.63-.63z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-green-400 transition-colors duration-300 hover:text-green-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 3.539a6.839 6.839 0 0 1-1.89.518 3.262 3.262 0 0 0 1.443-1.813 6.555 6.555 0 0 1-2.08.794A3.28 3.28 0 0 0 7.88 6.01 9.293 9.293 0 0 1 1.112 2.6 3.28 3.28 0 0 0 .66 5.983a3.28 3.28 0 0 0 1.46 2.723 3.28 3.28 0 0 1-1.484-.411v.041a3.29 3.29 0 0 0 2.63 3.226 3.29 3.29 0 0 1-1.483.056 3.29 3.29 0 0 0 3.067 2.28 6.588 6.588 0 0 1-4.078 1.404c-.264 0-.524-.015-.783-.045A9.312 9.312 0 0 0 5.03 16c6.038 0 9.341-5.003 9.341-9.341 0-.142-.003-.284-.009-.425A6.63 6.63 0 0 0 16 3.539z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-green-400 transition-colors duration-300 hover:text-green-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C6.27 0 4.6.08 3.6.4a3.9 3.9 0 0 0-1.8 1.8C1.48 3.2 1.4 4.85 1.4 8c0 3.14.07 4.8.4 5.8.39.82.97 1.4 1.8 1.8 1 .32 2.67.4 4.4.4 1.74 0 3.4-.08 4.4-.4a3.9 3.9 0 0 0 1.8-1.8c.33-1 .4-2.66.4-5.8 0-3.15-.07-4.8-.4-5.8a3.88 3.88 0 0 0-1.8-1.8C11.4.08 9.74 0 8 0ZM8 10.8c1.9 0 3.43-1.5 3.43-3.36 0-1.86-1.52-3.37-3.4-3.37S4.6 5.58 4.6 7.44c0 1.86 1.53 3.37 3.4 3.37Zm4.9-8.92c.46 0 .84.37.84.82 0 .46-.38.83-.84.83a.83.83 0 0 1-.83-.83c0-.45.37-.82.83-.82ZM8 9.16c-.96 0-1.74-.79-1.74-1.75 0-.97.78-1.75 1.74-1.75s1.74.78 1.74 1.75-.78 1.75-1.74 1.75Z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-green-400 transition-colors duration-300 hover:text-green-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg text-white">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-lg text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="mb-4 text-lg text-white">Help</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-green-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower footer */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 text-sm md:flex-row">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} &lt;drkcln/&gt; | All rights reserved
          </p>

          <div className="flex space-x-6">
            <a href="#" className="transition-colors duration-300 hover:text-green-400">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-green-400">
              Terms of Service
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-green-400">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Digital decoration */}
        <div className="mt-6 text-center font-mono text-xs text-gray-600">
          {'// POWERED BY THE DIGITAL UNDERGROUND'}
        </div>
      </div>
    </footer>
  );
};
