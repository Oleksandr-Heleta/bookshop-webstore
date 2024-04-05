"use client"
import { useState, useEffect } from "react";
import Button from "@/components/ui/button";
import { Instagram, PhoneCall, Send,  } from "lucide-react";

import { useRouter } from "next/navigation";
import Link from "next/link";

const Contacts = () => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
 setIsMounted(true);
}, []);

const router = useRouter();

if (!isMounted) return null;

    return (
        <div className="flex items-center gap-x-4">
            <a href="tel:+380931299735"  target="_blank" className="flex items-center rounded-full bg-black px-4 py-2  hover:opacity-75 transition">
                <PhoneCall
                size={20}
                color='white'
                />
            </a>
            <Link href="https://www.instagram.com/mouse_kidsbooks" target="_blank" className="flex items-center rounded-full bg-black px-4 py-2  hover:opacity-75  transition">
                <Instagram
                size={20}
                color='white'
                />
            </Link>
            <Link href="https://t.me/+380966856444" target="_blank" className="flex items-center rounded-full bg-black px-4 py-2  hover:opacity-75 transition">
                <Send
                size={20}
                color='white'
                />
            </Link>
        </div>
    );
};

export default Contacts;