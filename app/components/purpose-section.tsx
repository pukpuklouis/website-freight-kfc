import "./purpose-section.css";
import type { FC } from "react";

export const PurposeSection: FC = () => {
  return (
    <section className="py-32 pb-8 px-4 md:px-8 lg:px-16 bg-white PurposeSection_section1">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Our{" "}
          <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Purpose
          </span>
        </h1>
        <div className="space-y-8 text-lg text-gray-700">
          <p className="text-center max-w-3xl mx-auto">
            At KFC Freight Services, we are dedicated to revolutionizing the
            freight industry through innovation, reliability, and exceptional
            service. Our purpose is to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent font-semibold">
              connect businesses globally
            </span>{" "}
            while ensuring seamless logistics solutions.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  Innovation First
                </span>
              </h3>
              <p>
                Leveraging cutting-edge technology and smart solutions to
                optimize freight operations and enhance visibility.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  Customer Success
                </span>
              </h3>
              <p>
                Prioritizing our clients' needs and ensuring their success
                through reliable and efficient freight solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
