'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/LoginModal';

export default function GirisPage() {
  // const router = useRouter();

  // useEffect(() => {
  //   // Sayfa yüklendiğinde ana sayfaya yönlendir
  //   router.push('/');
  // }, [router]);

  return (
    <LoginModal
      isOpen={true}
      onClose={() => {}}
    />
  );
} 