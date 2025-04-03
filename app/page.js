"use client"
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Disable FontAwesome's auto CSS injection

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Digital Court System</h1>
      <div className="space-x-4">
        <Link href="/clerk">
          <span className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none">
            Clerk
          </span>
        </Link>
        <Link href="/judge">
          <span className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 focus:outline-none">
            Judge
          </span>
        </Link>
      </div>
    </div>
  );
}