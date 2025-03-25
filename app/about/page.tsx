import { Footer } from "../mainPageComponents/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-100 flex flex-col">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-red-500 mb-4">About Habit Flow</h1>
          <p className="text-xl text-black">Transforming Lives Through Better Habits</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-red-500">Our Mission</h2>
            <p className="text-black leading-relaxed">
              At Habit Flow, we believe that small, consistent changes lead to big transformations.
              Our platform is designed to help you build lasting habits through intuitive tracking,
              insightful analytics, and personalized recommendations.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-red-500">Key Features</h2>
            <ul className="list-disc list-inside space-y-3 text-black">
              <li>Daily habit tracking with reminders</li>
              <li>Progress visualization tools</li>
              <li>Smart streak maintenance</li>
              <li>Community support system</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-500 mb-8">Start Your Journey Today</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="/sign-in"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Sign In
            </a>
            <a
              href="/sign-up"
              className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-3 rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}