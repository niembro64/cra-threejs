import React, { useState, useRef, useEffect } from 'react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animation for section when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setStatus('success');

      // Reset status after a delay
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  // Terminal-like typing effect for section title
  const TerminalText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 100);

      const cursorInterval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 500);

      return () => {
        clearInterval(interval);
        clearInterval(cursorInterval);
      };
    }, [text]);

    return (
      <div className="font-mono">
        <span className="text-green-400">&gt; </span>
        <span>{displayText}</span>
        {cursorVisible && <span className="animate-pulse text-green-400">|</span>}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="translate-y-10 bg-black px-6 py-24 text-green-400 opacity-0 transition-all duration-1000"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-4xl font-bold md:text-6xl">
          <span className="text-white">&lt;</span>
          contact
          <span className="text-white">/&gt;</span>
        </h2>

        <div className="mx-auto mb-16 max-w-xl">
          <div className="border border-green-500/30 bg-gray-900 p-4 font-mono">
            <TerminalText text="Initialize communication protocol..." />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Contact form */}
          <div className="border border-green-500/30 bg-gray-900 p-8">
            <h3 className="mb-6 text-2xl font-bold text-white">Send Message</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="mb-2 block font-mono text-sm">
                  NAME<span className="text-green-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-green-500/30 bg-black px-4 py-3 text-green-300 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                  required
                  disabled={status === 'submitting'}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="mb-2 block font-mono text-sm">
                  EMAIL<span className="text-green-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-green-500/30 bg-black px-4 py-3 text-green-300 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                  required
                  disabled={status === 'submitting'}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="mb-2 block font-mono text-sm">
                  SUBJECT<span className="text-green-400">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-green-500/30 bg-black px-4 py-3 text-green-300 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                  required
                  disabled={status === 'submitting'}
                >
                  <option value="">Select subject</option>
                  <option value="customer-support">Customer Support</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="press">Press & Media</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="mb-2 block font-mono text-sm">
                  MESSAGE<span className="text-green-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full border border-green-500/30 bg-black px-4 py-3 text-green-300 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                  required
                  disabled={status === 'submitting'}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-400 px-6 py-3 font-mono text-black transition-colors duration-300 hover:bg-green-300 disabled:cursor-not-allowed disabled:bg-gray-600"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <div className="flex items-center justify-center">
                    <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    SENDING...
                  </div>
                ) : (
                  'SEND_MESSAGE()'
                )}
              </button>

              {/* Status message */}
              <div className="mt-4 h-6 text-center font-mono">
                {status === 'success' && (
                  <p className="text-green-400">
                    Message sent successfully! We'll respond shortly.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-500">Error: Could not send message. Please try again.</p>
                )}
              </div>
            </form>
          </div>

          {/* Contact information */}
          <div className="border border-green-500/30 bg-gray-900 p-8">
            <h3 className="mb-6 text-2xl font-bold text-white">Connection Details</h3>

            <div className="space-y-8">
              <div>
                <div className="mb-2 font-mono text-sm text-gray-400">EMAIL</div>
                <a
                  href="mailto:contact@drkcln.com"
                  className="text-green-400 transition-colors duration-300 hover:text-green-300"
                >
                  contact@drkcln.com
                </a>
              </div>

              <div>
                <div className="mb-2 font-mono text-sm text-gray-400">PRESS INQUIRIES</div>
                <a
                  href="mailto:press@drkcln.com"
                  className="text-green-400 transition-colors duration-300 hover:text-green-300"
                >
                  press@drkcln.com
                </a>
              </div>

              <div>
                <div className="mb-2 font-mono text-sm text-gray-400">HEADQUARTERS</div>
                <address className="not-italic text-green-300">
                  <div>Unit 404, Digital Tower</div>
                  <div>Cyber District</div>
                  <div>Tokyo, JP 105-0021</div>
                </address>
              </div>

              <div>
                <div className="mb-2 font-mono text-sm text-gray-400">SOCIAL</div>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center border border-green-500/30 text-green-400 transition-colors duration-300 hover:bg-green-400 hover:text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm.003 2.5h.001c2.115 0 2.365.009 3.204.047a5.3 5.3 0 0 1 1.772.33 2.4 2.4 0 0 1 .91.593c.259.259.435.546.592.908.167.433.275.98.33 1.772.036.839.046 1.088.046 3.204 0 2.117-.01 2.366-.046 3.205a5.3 5.3 0 0 1-.33 1.772 2.55 2.55 0 0 1-.592.909c-.26.259-.547.435-.91.592a5.34 5.34 0 0 1-1.772.33c-.838.037-1.088.046-3.204.046-2.117 0-2.366-.009-3.205-.047a5.33 5.33 0 0 1-1.77-.33 2.55 2.55 0 0 1-.909-.591 2.4 2.4 0 0 1-.592-.909 5.32 5.32 0 0 1-.332-1.773C2.509 10.366 2.5 10.117 2.5 8s.01-2.366.047-3.205c.037-.792.145-1.339.332-1.773a2.4 2.4 0 0 1 .591-.908 2.4 2.4 0 0 1 .909-.592 5.33 5.33 0 0 1 1.772-.33c.838-.038 1.088-.047 3.205-.047z" />
                      <path d="M8 5.293a2.707 2.707 0 1 0 0 5.414 2.707 2.707 0 0 0 0-5.414zM8 9.93a1.223 1.223 0 1 1 0-2.446A1.223 1.223 0 0 1 8 9.93zm2.578-5.785a.63.63 0 0 0-.63.63.63.63 0 0 0 1.26 0 .63.63 0 0 0-.63-.63z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center border border-green-500/30 text-green-400 transition-colors duration-300 hover:bg-green-400 hover:text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 3.539a6.839 6.839 0 0 1-1.89.518 3.262 3.262 0 0 0 1.443-1.813 6.555 6.555 0 0 1-2.08.794A3.28 3.28 0 0 0 7.88 6.01 9.293 9.293 0 0 1 1.112 2.6 3.28 3.28 0 0 0 .66 5.983a3.28 3.28 0 0 0 1.46 2.723 3.28 3.28 0 0 1-1.484-.411v.041a3.29 3.29 0 0 0 2.63 3.226 3.29 3.29 0 0 1-1.483.056 3.29 3.29 0 0 0 3.067 2.28 6.588 6.588 0 0 1-4.078 1.404c-.264 0-.524-.015-.783-.045A9.312 9.312 0 0 0 5.03 16c6.038 0 9.341-5.003 9.341-9.341 0-.142-.003-.284-.009-.425A6.63 6.63 0 0 0 16 3.539z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center border border-green-500/30 text-green-400 transition-colors duration-300 hover:bg-green-400 hover:text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C6.27 0 4.6.08 3.6.4a3.9 3.9 0 0 0-1.8 1.8C1.48 3.2 1.4 4.85 1.4 8c0 3.14.07 4.8.4 5.8.39.82.97 1.4 1.8 1.8 1 .32 2.67.4 4.4.4 1.74 0 3.4-.08 4.4-.4a3.9 3.9 0 0 0 1.8-1.8c.33-1 .4-2.66.4-5.8 0-3.15-.07-4.8-.4-5.8a3.88 3.88 0 0 0-1.8-1.8C11.4.08 9.74 0 8 0ZM8 10.8c1.9 0 3.43-1.5 3.43-3.36 0-1.86-1.52-3.37-3.4-3.37S4.6 5.58 4.6 7.44c0 1.86 1.53 3.37 3.4 3.37Zm4.9-8.92c.46 0 .84.37.84.82 0 .46-.38.83-.84.83a.83.83 0 0 1-.83-.83c0-.45.37-.82.83-.82ZM8 9.16c-.96 0-1.74-.79-1.74-1.75 0-.97.78-1.75 1.74-1.75s1.74.78 1.74 1.75-.78 1.75-1.74 1.75Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ teaser */}
            <div className="mt-12 border border-green-500/30 bg-black p-6">
              <h4 className="mb-4 text-xl font-bold text-white">Frequently Asked Questions</h4>
              <p className="mb-4 text-green-300">
                Need information about sizing, shipping, or returns? Check our comprehensive FAQ
                section.
              </p>
              <a
                href="#"
                className="inline-block border border-green-400 px-6 py-2 font-mono text-green-400 transition-colors duration-300 hover:bg-green-400/10"
              >
                VIEW_FAQ()
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
