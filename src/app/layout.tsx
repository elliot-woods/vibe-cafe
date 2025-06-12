import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vibe Cafe - AI-Powered Venue Vibe Checker',
  description: 'Upload photos of restaurants, bars, and cafes to get AI-powered vibe analysis',
  keywords: ['restaurant', 'bar', 'cafe', 'vibe', 'AI', 'analysis'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              ☕ Vibe Cafe
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              AI-powered venue vibe analysis
            </p>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-white border-t mt-16">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            Powered by OpenAI • Built with Next.js
          </div>
        </footer>
      </body>
    </html>
  );
} 