"use client";

import { User, BookOpen, Settings } from "lucide-react";
import RoleCard from "./RoleCard";

const UserRolesSection = () => {
  return (
    <section id="roles" className="bg-gray-50 py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Designed for Everyone
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-white">
            ML Companion serves different roles with specialized features for
            each user type.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <RoleCard
            icon={<User size={24} />}
            title="Students"
            description="Take ML coding exams, write and execute code in real-time, and work with datasets to enhance your learning experience."
            link="/student-features"
          />
          <RoleCard
            icon={<BookOpen size={24} />}
            title="Teachers"
            description="Create and manage exams, evaluate student submissions, track progress, and provide targeted feedback."
            link="/teacher-features"
          />
          <RoleCard
            icon={<Settings size={24} />}
            title="Administrators"
            description="Manage platform users, oversee dataset repositories, configure system settings, and monitor platform usage."
            link="/admin-features"
          />
        </div>
      </div>
    </section>
  );
};

export default UserRolesSection;
