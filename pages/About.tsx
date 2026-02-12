import React from "react";

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative pt-32 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/1600/900?grayscale"
            className="w-full h-full object-cover opacity-20"
            alt="About"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-background-light dark:to-background-dark"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6 border border-primary/30">
            Since 2024
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-tight">
            Fashion,{" "}
            <span className="font-semibold text-primary">Refined.</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-200 font-light leading-relaxed">
            We bridge the gap between contemporary design and timeless fashion.
            Elevating your daily style with premium craftsmanship.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6">
                The Philosophy of Touch
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                In a world dominated by glass screens and cold aluminum, we
                believe your most-used object should feel warm, organic, and
                inviting.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Every curve of our cases is designed to mimic the natural
                ergonomics of your hand. Sourcing only the highest grade
                leathers and polymers.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                <span className="text-xs text-slate-400 tracking-widest uppercase">
                  Designed in Milan
                </span>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-2 gap-4">
              <img
                src="https://picsum.photos/400/600?random=21"
                className="h-80 w-full object-cover rounded-2xl shadow-lg"
                alt="Craft"
              />
              <img
                src="https://picsum.photos/400/600?random=22"
                className="h-80 w-full object-cover rounded-2xl shadow-lg mt-12"
                alt="Aesthetic"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-24 bg-background-light dark:bg-background-dark"
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Concierge Service</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We've simplified the buying process. Order directly through
              WhatsApp or contact our support team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600 transition-transform group-hover:scale-110">
                  <span className="material-icons text-3xl">chat</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Instant Order & Chat
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Skip the checkout forms. Chat with a specialist to find the
                  perfect match and place an order instantly.
                </p>
              </div>
              <button className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 dark:shadow-none hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                <span className="material-icons">whatsapp</span> Start Chat on
                WhatsApp
              </button>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <span className="material-icons text-3xl">mail</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Email Support</h3>
                <div className="space-y-4 mb-8">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                  <textarea
                    placeholder="How can we help?"
                    rows={3}
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  ></textarea>
                </div>
              </div>
              <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
