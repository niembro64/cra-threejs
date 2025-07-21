import React, { useState, useRef, useEffect } from 'react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      // Reset form
      setEmail('');
      setStatus('success');

      // Reset status after a delay
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  // Matrix code rain component
  const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Setup canvas
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const fontSize = 12;
      const columns = Math.floor(canvas.width / fontSize);

      // Array to track the y position of each column
      const drops: number[] = Array(columns).fill(1);

      // Characters to display
      const chars = 'SUBSCRIBE01';

      let frameId: number;

      // Animation function
      const draw = () => {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0'; // Matrix green
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          // Random character
          const char = chars[Math.floor(Math.random() * chars.length)];

          // x = i * fontSize, y = value of drops[i] * fontSize
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);

          // Randomly reset some drops to the top
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          // Move drops down
          drops[i]++;
        }

        frameId = requestAnimationFrame(draw);
      };

      // Start animation
      frameId = requestAnimationFrame(draw);

      // Handle window resize
      const handleResize = () => {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ opacity: 0.3 }} />;
  };

  return (
    <section
      ref={sectionRef}
      className="translate-y-10 bg-gray-900 px-6 py-24 opacity-0 transition-all duration-1000"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden border border-green-500/30 bg-black p-8 md:p-12">
          {/* Matrix code rain background */}
          <div className="absolute inset-0 opacity-20">
            <MatrixRain />
          </div>

          <div className="relative z-10">
            <h2 className="mb-6 text-center text-3xl font-bold text-green-400 md:text-5xl">
              <span className="text-white">&lt;</span>
              subscribe
              <span className="text-white">/&gt;</span>
            </h2>

            <div className="mx-auto mb-8 max-w-2xl text-center">
              <p className="text-green-300">
                Join our network to receive exclusive updates, early access to drops, and special
                offers. Unsubscribe at any time.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              <div className="relative">
                <input
                  type="email"
                  placeholder="enter_your_email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-green-500/30 bg-gray-800 px-4 py-3 font-mono text-green-300 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                  required
                  disabled={status === 'submitting'}
                />

                <button
                  type="submit"
                  className="absolute bottom-0 right-0 top-0 bg-green-400 px-6 font-mono text-black transition-colors duration-300 hover:bg-green-300 disabled:cursor-not-allowed disabled:bg-gray-500"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
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
                  ) : (
                    'SUBSCRIBE'
                  )}
                </button>
              </div>

              {/* Status message */}
              <div className="mt-2 h-6 text-center font-mono">
                {status === 'success' && (
                  <p className="text-green-400">Subscription successful! Welcome to the network.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-500">
                    Error: Could not complete subscription. Please try again.
                  </p>
                )}
              </div>

              <div className="mt-6 text-center text-xs text-gray-400">
                By subscribing, you agree to our{' '}
                <a href="#" className="text-green-400 hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="#" className="text-green-400 hover:underline">
                  Terms of Service
                </a>
                .
              </div>
            </form>

            {/* Digital decorations */}
            <div className="absolute bottom-4 right-4 font-mono text-xs text-green-500/20">
              01010011 01010101 01000010
            </div>

            <div className="absolute left-4 top-4 font-mono text-xs text-green-500/20">
              [SUBSCRIBE]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
