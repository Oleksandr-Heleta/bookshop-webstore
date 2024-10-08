'use client';
import { Instagram, PhoneCall, Send } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Contacts = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-x-4">
      <a
        aria-label="Зателефонуйте"
        href="tel:+380936482295"
        target="_blank"
        className="flex items-center rounded-full bg-amber-950 px-4 py-2  hover:opacity-75 transition"
      >
        <PhoneCall size={20} color="white" />
      </a>
      <Link
        aria-label="Слідкуйте в Instagram"
        href="https://www.instagram.com/mouse_kidsbooks"
        target="_blank"
        className="flex items-center rounded-full bg-amber-950 px-4 py-2  hover:opacity-75  transition"
      >
        <Instagram size={20} color="white" />
      </Link>
      <Link
        aria-label="Напишіть в Telegram"
        href="https://t.me/mouse_kidsbooks"
        target="_blank"
        className="flex items-center rounded-full bg-amber-950 px-4 py-2  hover:opacity-75 transition"
      >
        <Send size={20} color="white" />
      </Link>
    </div>
  );
};

export default Contacts;
