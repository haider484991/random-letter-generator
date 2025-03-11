import PictionaryGenerator from '@/components/PictionaryGenerator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pictionary Word Generator',
  description: 'Generate random words for your Pictionary game with different difficulty levels and categories.',
};

export default function PictionaryPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12">
      <div className="w-full">
        <PictionaryGenerator />
      </div>
    </main>
  );
} 