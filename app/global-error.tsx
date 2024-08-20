'use client';

import Image from 'next/image';
import React from 'react';

import Button from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col justify-center items-center h-screen text-center text-amber-950">
          <Image src="/logo.webp" alt="logo" width={100} height={100} />
          <h2 className="text-amber-950 text-lg font-bold">
            Нажаль, щось пішло не так!
          </h2>
          <p>
            <Button onClick={() => reset()}>Оновіть</Button>
            <span> або прийдіть до нас пізніше</span>
          </p>
        </div>
      </body>
    </html>
  );
}
