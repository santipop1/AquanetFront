// app/page.tsx

'use client';

import Header from '@/components/Header/Header';
import Inicio from './inicio/Inicio';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Inicio />
      </main>
    </>
  );
}
