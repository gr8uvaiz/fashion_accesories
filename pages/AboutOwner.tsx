import React from "react";
import { Link } from "react-router-dom";

const AboutOwner: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-6 border border-primary/30">
            Meet The Owner
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Parvez - Fashion Accessories
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Passionate entrepreneur dedicated to bringing premium fashion
            accessories to Jaipur
          </p>
        </div>
      </section>

      {/* Owner Profile Section */}
      <section className="py-20 bg-white dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl transform rotate-3"></div>
                <img
                  src="/assets/owner.png"
                  alt="Parvez - Owner"
                  className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-3xl font-bold">5+</p>
                  <p className="text-sm">Years Experience</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                About Parvez
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Welcome to Fashion Accessories! I'm Parvez, the founder and
                  owner of this premium mobile accessories store in Jaipur. With
                  over 5 years of experience in the fashion accessories
                  industry, I've dedicated myself to providing the highest
                  quality iPhone cases and accessories to our valued customers.
                </p>
                <p>
                  My journey began with a simple vision: to make premium,
                  stylish, and protective mobile accessories accessible to
                  everyone in Jaipur. What started as a small venture has grown
                  into a trusted destination for fashion-conscious individuals
                  who refuse to compromise on quality.
                </p>
                <p>
                  I believe in building lasting relationships with customers
                  through exceptional service, genuine products, and honest
                  business practices. Every product in our store is carefully
                  selected to meet the highest standards of quality and style.
                </p>
                <p className="font-medium text-primary">
                  "Customer satisfaction isn't just our priority—it's our
                  promise."
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">5000+</p>
                  <p className="text-sm text-gray-500 mt-1">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-gray-500 mt-1">Products Sold</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">4.9★</p>
                  <p className="text-sm text-gray-500 mt-1">Customer Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50 dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Core Values
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <span className="material-icons text-primary text-3xl">
                  verified
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Authenticity
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We deal only in 100% genuine products. Every item is carefully
                sourced and verified for authenticity.
              </p>
            </div>

            <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <span className="material-icons text-primary text-3xl">
                  favorite
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Customer First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your satisfaction is our top priority. We go above and beyond to
                ensure you're happy with every purchase.
              </p>
            </div>

            <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <span className="material-icons text-primary text-3xl">
                  workspace_premium
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Quality Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Premium quality in every product. We never compromise on the
                standards that define our brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Get In Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Visit our store or reach out through any of these channels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone */}
            <a
              href="tel:+919876543210"
              className="group bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="material-icons text-primary text-2xl">
                  phone
                </span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Phone
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                +91 98765 43210
              </p>
            </a>

            {/* Email */}
            <a
              href="mailto:parvez05@fashionaccessories.com"
              className="group bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="material-icons text-primary text-2xl">
                  email
                </span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Email
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                parvez05@fashionaccessories.com
              </p>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/fashionaccessories05/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="material-icons text-primary text-2xl">
                  camera_alt
                </span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Instagram
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                @fashionaccessories05
              </p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <span className="material-icons text-green-600 text-2xl">
                  chat
                </span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                WhatsApp
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chat with us
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Store Location */}
      <section className="py-20 bg-slate-50 dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Visit Our Store
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-primary">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      Address
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Shop No 8, Plot No 73-A
                      <br />
                      Shanti Path, Katariya Chouraha
                      <br />
                      Near Mama Ki Hotel, Jawahar Nagar
                      <br />
                      Jaipur, Rajasthan 302004
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-primary">
                      schedule
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      Store Hours
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Monday - Saturday: 10:00 AM - 9:00 PM
                      <br />
                      Sunday: 11:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/place/26%C2%B053'46.4%22N+75%C2%B050'12.3%22E/@26.8962224,75.8341652,17z/data=!3m1!4b1!4m4!3m3!8m2!3d26.8962224!4d75.8367401?entry=ttu&g_ep=EgoyMDI2MDIwOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-lg"
                >
                  <span className="material-icons">directions</span>
                  Get Directions
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8962224!2d75.8341652!3d26.8962224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUzJzQ2LjQiTiA3NcKwNTAnMTIuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Upgrade Your Style?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Visit our store today and discover the perfect accessories for your
            iPhone
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse Products
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-lg gap-2"
            >
              <span className="material-icons">whatsapp</span>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutOwner;
