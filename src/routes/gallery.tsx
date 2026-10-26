import { createFileRoute, Link } from "@tanstack/react-router";

import heroAerial from "@/assets/hero-aerial.jpg.asset.json";
import galleryPool from "@/assets/gallery-pool.jpg.asset.json";
import saunaJacuzzi1 from "@/assets/sauna-jacuzzi-1.jpg.asset.json";
import saunaJacuzzi2 from "@/assets/sauna-jacuzzi-2.jpg.asset.json";
import galleryTerrace from "@/assets/gallery-terrace.jpg.asset.json";
import terraceSunset from "@/assets/terrace-sunset.jpg.asset.json";

const GALLERY_IMAGES = [
  {
    src: heroAerial.url,
    alt: "Aerial view of Villa Krasica with private pool, tennis court and the Adriatic sea beyond",
    caption: "Villa from above",
  },
  {
    src: galleryPool.url,
    alt: "Private sea-view swimming pool at Villa Krasica with sun loungers and the villa in the background",
    caption: "Sea-view pool",
  },
  {
    src: saunaJacuzzi1.url,
    alt: "Private jacuzzi and cedar sauna at Villa Krasica",
    caption: "Sauna & jacuzzi",
  },
  {
    src: saunaJacuzzi2.url,
    alt: "Jacuzzi with bubbling water and sauna in the background at Villa Krasica",
    caption: "Jacuzzi detail",
  },
  {
    src: galleryTerrace.url,
    alt: "Outdoor terrace and dining area at Villa Krasica with the pool nearby",
    caption: "Terrace & dining",
  },
  {
    src: terraceSunset.url,
    alt: "Terrace doors at Villa Krasica opening to a golden sunset over the Adriatic sea",
    caption: "Sunset terrace",
  },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Villa Krasica" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "description",
        content:
          "Browse photos of Villa Krasica: sea-view pool, private tennis court, sauna, jacuzzi, terrace and Adriatic sunsets.",
      },
      { property: "og:title", content: "Gallery — Villa Krasica" },
      {
        property: "og:description",
        content:
          "Browse photos of Villa Krasica: sea-view pool, private tennis court, sauna, jacuzzi, terrace and Adriatic sunsets.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main className="min-h-screen bg-linen font-body text-ink antialiased">
      <header className="flex items-center justify-between px-6 py-6 md:px-12">
        <Link
          to="/"
          className="font-display text-2xl tracking-wide text-ink md:text-3xl"
        >
          Villa Krasica
        </Link>
        <Link
          to="/"
          className="border-b border-ink/40 pb-1 font-body text-sm tracking-wide text-ink/90 transition-colors hover:border-ink"
        >
          Back home
        </Link>
      </header>

      <section className="px-6 pb-20 pt-10 md:px-12 md:pb-28 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-clay">
            Villa Krasica
          </p>
          <h1 className="mb-10 max-w-[24ch] font-display text-4xl leading-tight text-ink text-balance md:mb-14 md:text-6xl">
            Gallery
          </h1>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_IMAGES.map((image, index) => (
              <figure
                key={image.src}
                className="group overflow-hidden rounded-[min(1.5vw,14px)] bg-cream"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={1024}
                    height={768}
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
                <figcaption className="px-4 py-3 font-body text-sm text-ink/70">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
