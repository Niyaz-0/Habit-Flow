import { Footer } from "../mainPageComponents/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-100 flex flex-col">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <h1 className="text-4xl font-bold text-red-600 mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-black">
          <section>
            <h2 className="text-2xl font-semibold text-red-500 mb-4">Data Collection</h2>
            <p>We collect minimal personal data necessary to provide our services, including:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Account information (email, username)</li>
              <li>Habit tracking data</li>
              <li>Usage analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-red-500 mb-4">Data Usage</h2>
            <p>Your data is used exclusively to:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Provide personalized habit tracking</li>
              <li>Improve service quality</li>
              <li>Communicate important updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-red-500 mb-4">Security</h2>
            <p>We implement industry-standard security measures including encryption and regular security audits.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}