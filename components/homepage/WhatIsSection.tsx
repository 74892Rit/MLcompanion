"use client";

import React from "react";

const WhatIsSection: React.FC = () => {
  return (
    <section className="mt-8 py-12">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          What is ML-Companion?
        </h2>
        <p className="text-left text-lg text-gray-600 dark:text-gray-300">
          ML-Companion is a cutting-edge compiler framework designed
          specifically for machine learning models. It analyzes your
          model&apos;s computational graph and generates highly optimized code
          for your target hardware.
        </p>
      </div>
    </section>
  );
};

export default WhatIsSection;
