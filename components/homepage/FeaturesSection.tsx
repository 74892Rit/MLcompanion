"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  FileText,
  Database,
  Shield,
  Activity,
  Clock,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    // Debug: Check if refs are assigned correctly
    console.log("Title Ref:", titleRef.current);
    console.log("Description Ref:", descriptionRef.current);
    console.log("Cards Ref:", cardsRef.current);

    // Animate H2 title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Animate P description
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    // Animate FeatureCards one by one
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="-mx-6 mt-4 rounded-lg bg-white px-6 py-12 dark:bg-gray-900 sm:-mx-14 sm:px-14"
      id="features"
    >
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2
          ref={titleRef}
          className="mb-4 font-serif text-2xl font-bold text-gray-900 dark:text-white md:text-3xl"
        >
          Powerful Features
        </h2>
        <p
          ref={descriptionRef}
          className="text-lg text-gray-600 dark:text-gray-300"
        >
          Everything you need for ML education and assessment in one place.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: <Code className="size-6 text-blue-500 dark:text-blue-300" />,
            title: "Interactive Code Editor",
            description:
              "Write and execute Python code in the browser using Monaco Editor with syntax highlighting and autocompletion.",
          },
          {
            icon: (
              <FileText className="size-6 text-blue-500 dark:text-blue-300" />
            ),
            title: "Exam Management",
            description:
              "Create, manage, and evaluate ML coding exams with customizable questions, topics, and difficulty levels.",
          },
          {
            icon: (
              <Database className="size-6 text-blue-500 dark:text-blue-300" />
            ),
            title: "Dataset Management",
            description:
              "Upload, preview, and analyze datasets with automatic metadata extraction and visualization capabilities.",
          },
          {
            icon: (
              <Shield className="size-6 text-blue-500 dark:text-blue-300" />
            ),
            title: "Secure Environment",
            description:
              "Sandboxed code execution with Pyodide ensures security while allowing students to run real ML code.",
          },
          {
            icon: (
              <Activity className="size-6 text-blue-500 dark:text-blue-300" />
            ),
            title: "Real-time Execution",
            description:
              "Execute Python code instantly in the browser with immediate feedback and visualization of results.",
          },
          {
            icon: <Clock className="size-6 text-blue-500 dark:text-blue-300" />,
            title: "Auto-Save Progress",
            description:
              "Never lose your work with automatic progress saving for exams and coding sessions.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="opacity-0"
          >
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
