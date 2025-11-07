import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCanonicalUrl } from '../../lib/seo/metadata';

export const metadata: Metadata = {
  title: 'Great Houses of Westeros (Redirecting)',
  description: 'This legacy path has moved. You will be redirected to the updated Great Houses experience.',
  alternates: {
    canonical: getCanonicalUrl('/houses')
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function HousesSimplePage() {
  redirect('/houses');
}
