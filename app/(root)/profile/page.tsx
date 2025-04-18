"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Book,
  Award,
  Star,
  GitBranch,
  Share2,
  Edit,
  ChevronRight,
  BarChart2,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

// Fetch function for SWR
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  });

// Helper function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Use SWR for data fetching with automatic revalidation
  const {
    data: apiResponse,
    error,
    isLoading,
  } = useSWR("/api/users/profile", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 30000, // Refresh every 30 seconds
  });

  // Extract the actual user data from the nested response
  const data = apiResponse?.data || null;

  // Process and prepare user data
  const userData = data
    ? {
        name: data.name,
        username: data.username || data.name.split(" ")[0].toLowerCase(), // Fallback if username is empty
        role: data.role,
        location: data.location,
        email: data.email,
        joinDate: formatDate(data.createdAt),
        bio: data.bio || "No bio available",
        skills:
          data.skills && data.skills.length > 0
            ? (data.skills as { name: string; level: number }[])
            : [
                { name: "PyTorch", level: 95 },
                { name: "TensorFlow", level: 90 },
                { name: "Python", level: 98 },
                { name: "Computer Vision", level: 85 },
                { name: "NLP", level: 92 },
              ],
        projects:
          data.projects && data.projects.length > 0
            ? (data.projects as {
                id: number;
                name: string;
                description: string;
                stars: number;
                forks: number;
              }[])
            : [
                {
                  id: 1,
                  name: "SpeechSynth",
                  description:
                    "A neural text-to-speech model with emotion control",
                  stars: 342,
                  forks: 86,
                },
                {
                  id: 2,
                  name: "ImageSegmenter",
                  description:
                    "Real-time semantic segmentation for autonomous vehicles",
                  stars: 215,
                  forks: 47,
                },
                {
                  id: 3,
                  name: "SentimentAnalyzer",
                  description:
                    "Multilingual sentiment analysis model for social media",
                  stars: 178,
                  forks: 32,
                },
              ],
        stats: data.stats || {
          models: 24,
          deployments: 18,
          collaborations: 36,
        },
        achievements:
          data.achievements && data.achievements.length > 0
            ? (data.achievements as string[])
            : [
                "Best Paper Award at ML Conference 2023",
                "Kaggle Competition Top 1%",
                "Open Source Contributor of the Month",
              ],
        activity:
          data.activity && data.activity.length > 0
            ? data.activity
            : [
                {
                  type: "model",
                  event: "Deployed CV-Detection-v4 model",
                  time: "2 days ago",
                },
                {
                  type: "project",
                  event: "Created new project ImageSegmenter",
                  time: "1 week ago",
                },
                {
                  type: "collaboration",
                  event: "Joined TextGen research team",
                  time: "2 weeks ago",
                },
                {
                  type: "model",
                  event: "Updated NLP-Transformer-v2",
                  time: "3 weeks ago",
                },
              ],
        profileImage: data.profileImage || "/profile.jpg",
      }
    : null;

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-indigo-600" />
          <span className="ml-2">Loading profile data...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex h-64 items-center justify-center text-red-500">
          <p>Failed to load profile data. Please try again later.</p>
        </div>
      );
    }

    if (!userData) {
      return (
        <div className="flex h-64 items-center justify-center">
          <p>No profile data available</p>
        </div>
      );
    }

    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Bio Section */}
            <div className="col-span-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:col-span-2">
              <h3 className="mb-4 text-xl font-semibold">Bio</h3>
              <p className="text-gray-600 dark:text-gray-300">{userData.bio}</p>
            </div>

            {/* Skills Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-semibold">Skills</h3>
              <div className="space-y-4">
                {userData.skills.map(
                  (skill: { name: string; level: number }, index) => (
                    <div key={index}>
                      <div className="mb-1 flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full rounded-full bg-indigo-600"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-semibold">Achievements</h3>
              <ul className="space-y-3">
                {userData.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Award className="mt-1 size-5 shrink-0 text-yellow-500" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Section */}
            <div className="col-span-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:col-span-2">
              <h3 className="mb-4 text-xl font-semibold">Overview</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {userData.stats.models}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    ML Models
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {userData.stats.deployments}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    Deployments
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                  <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {userData.stats.collaborations}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    Collaborations
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="space-y-6">
            {userData.projects.map(
              (project: {
                id: number;
                name: string;
                description: string;
                stars: number;
                forks: number;
              }) => (
                <div
                  key={project.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        {project.description}
                      </p>
                    </div>
                    <button className="rounded-md border border-gray-200 bg-white px-3 py-1 text-sm font-medium dark:border-gray-700 dark:bg-gray-800">
                      Open
                    </button>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="size-4" />
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <GitBranch className="size-4" />
                      <span>{project.forks}</span>
                    </div>
                  </div>
                </div>
              )
            )}

            <div className="flex justify-center pt-4">
              <button className="flex items-center gap-1 rounded-md bg-indigo-50 px-4 py-2 text-indigo-600 hover:bg-indigo-100 dark:bg-gray-700 dark:text-indigo-400 dark:hover:bg-gray-600">
                <span>View all projects</span>
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        );
      case "activity":
        return (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold">Recent Activity</h3>
            <div className="space-y-4">
              {userData.activity.map(
                (
                  item: { type: string; event: string; time: string },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="flex gap-4 border-b border-gray-100 pb-4 dark:border-gray-700"
                  >
                    <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900">
                      <BarChart2 className="size-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium">{item.event}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        );
      default:
        return <div>Tab content not found</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center py-8">
        <div className="text-center">
          <Loader2 className="mx-auto size-12 animate-spin text-indigo-600" />
          <p className="mt-4 text-lg text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Profile Header */}
      <div className="mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="h-32 w-full bg-indigo-100 dark:bg-gray-800 md:h-48"></div>
        <div className="relative bg-white p-6 dark:bg-gray-900">
          <div className="absolute -top-20 left-6 rounded-xl border-4 border-white bg-white p-1 shadow-lg dark:border-gray-800 dark:bg-gray-800">
            <Image
              src={userData?.profileImage || "/profile.jpg"}
              alt="Profile Picture"
              width={100}
              height={100}
              className="size-24 rounded-lg object-cover md:size-32"
            />
          </div>

          <div className="ml-32 flex flex-col justify-between md:ml-40 md:flex-row">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">
                {userData?.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                @{userData?.username}
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <Briefcase className="size-4 text-gray-500" />
                  <span>{userData?.role}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="size-4 text-gray-500" />
                  <span>{userData?.location}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="size-4 text-gray-500" />
                  <span>Joined {userData?.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3 md:mt-0">
              <Link
                href="/profileedit"
                className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                <Edit className="size-4" />
                <span>Edit Profile</span>
              </Link>
              <button className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                <Share2 className="size-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  {userData?.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <User className="size-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  @{userData?.username}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="size-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  {userData?.location}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="size-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  Joined {userData?.joinDate}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Book className="size-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  {userData?.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === "overview"
                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === "projects"
                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === "activity"
                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Activity
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
