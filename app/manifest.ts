import { Metadata, MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Магазин дитячої книги Мишка",
        short_name: "Мишка",
        start_url: "/",
        description: "Магазин дитячої книги Мишка",
        background_color: "#f7f7f7",
        theme_color: "#f7f7f7",
        display: "standalone",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "64x64 512x512 144x144 192x192 256x256 384x384 512x512",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/logo.webp",
                sizes: "64x64 512x512 144x144 192x192 256x256 384x384 512x512",
                type: "image/png",
                purpose: "any",
            },
        ]
    }
}