import { Footer } from "../mainPageComponents/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-100 flex flex-col">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <h1 className="text-4xl font-bold text-red-600 mb-8">Terms of Service</h1>

        <div className="space-y-6 text-black">
          <section>
            <h2 className="text-2xl font-semibold text-red-500 mb-4">Acceptance of Terms</h2>
            <p>By using Habit Flow, you agree to these terms and our privacy policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-red-500 mb-4">User Responsibilities</h2>
            <ul className="list-disc list-inside ml-4">
              <li>Maintain account security</li>
              <li>Provide accurate information</li>
              <li>Use service lawfully</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-red-500 mb-4">Service Modifications</h2>
            <p>We reserve the right to modify or discontinue service at any time.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}