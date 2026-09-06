import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

import { SHOPS, RESTAURANTS, BEACHES, type GuideItem } from "@/lib/places";

const VillaMap = lazy(() => import("@/components/VillaMap"));
const VillaWeather = lazy(() => import("@/components/VillaWeather"));

import heroAerial from "@/assets/hero-aerial.jpg.asset.json";
import galleryPool from "@/assets/gallery-pool.jpg.asset.json";
import saunaJacuzzi1 from "@/assets/sauna-jacuzzi-1.jpg.asset.json";
import saunaJacuzzi2 from "@/assets/sauna-jacuzzi-2.jpg.asset.json";
import galleryTerrace from "@/assets/gallery-terrace.jpg.asset.json";
import terraceSunset from "@/assets/terrace-sunset.jpg.asset.json";

const BOOKING_URL = "https://www.booking.com/Share-JzZeWOi";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Villa Krasica — Private Tennis Court, Sauna & Jacuzzi | Krasica, Croatia",
      },
      {
        name: "description",
        content:
          "A 5-star private villa in Krasica, Croatia. Three bedrooms, sea-view pool, private tennis court, sauna, jacuzzi, and outdoor fireplace. Reserve via Booking.com.",
      },
      {
        property: "og:title",
        content: "Villa Krasica — Private Tennis Court, Sauna & Jacuzzi",
      },
      {
        property: "og:description",
        content:
          "A 5-star private villa in Krasica, Croatia. Sea-view pool, tennis court, sauna, jacuzzi, and the whole horizon to yourself.",
      },
      { property: "og:image", content: heroAerial.url },
      { name: "twitter:image", content: heroAerial.url },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="font-body text-ink antialiased">
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden bg-ink">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroAerial.url}
            alt="Aerial view of Villa Krasica with private pool, tennis court and the Adriatic sea beyond"
            className="anim-kenburns h-full w-full object-cover"
            width={1280}
            height={900}
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/30" />

        <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
          <a
            href="/"
            className="font-display text-2xl tracking-wide text-cream md:text-3xl"
          >
            Villa Krasica
          </a>
          <a
            href="#guide"
            className="border-b border-cream/40 pb-1 font-body text-sm tracking-wide text-cream/90 transition-colors hover:border-cream"
          >
            Guest guide
          </a>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col items-start justify-end px-6 pb-16 pt-40 md:px-12 md:pb-24">
          <p className="mb-5 font-body text-xs uppercase tracking-[0.35em] text-cream/80 md:text-sm">
            Croatia · Adriatic coast · 5-star private villa
          </p>
          <h1 className="max-w-[24ch] font-display text-5xl leading-none text-cream md:text-7xl xl:text-8xl">
            Where the terrace opens onto the sea
          </h1>
          <p className="mt-6 max-w-[46ch] font-body text-base leading-relaxed text-cream/85 md:text-lg">
            A stone-and-olive villa on the hillside above Krasica — three
            bedrooms, a sea-view pool, and the whole horizon to yourself.
          </p>
          <a
            href="#reserve"
            className="anim-pulse-soft mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3 font-body text-sm font-medium text-terra ring-1 ring-cream/30"
          >
            Reserve your stay
            <svg
              className="size-4 shrink-0"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M3 10h13m0 0-4-4m4 4-4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-linen">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="max-w-[40ch] font-display text-4xl leading-tight text-ink text-balance md:text-5xl">
              The villa, in its own light
            </h2>
            <span className="shrink-0 font-body text-xs uppercase tracking-[0.3em] text-clay">
              Gallery
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            <div className="md:col-span-2 md:row-span-2">
              <img
                src={galleryPool.url}
                alt="Private sea-view swimming pool at Villa Krasica with sun loungers and the villa in the background"
                className="h-full w-full rounded-[min(1.5vw,14px)] object-cover"
                width={1280}
                height={900}
                loading="lazy"
              />
            </div>
            <div>
              <img
                src={saunaJacuzzi1.url}
                alt="Private jacuzzi and cedar sauna at Villa Krasica"
                className="aspect-square w-full rounded-[min(1.5vw,14px)] object-cover"
                width={1024}
                height={1024}
                loading="lazy"
              />
            </div>
            <div>
              <img
                src={saunaJacuzzi2.url}
                alt="Jacuzzi with bubbling water and sauna in the background at Villa Krasica"
                className="aspect-square w-full rounded-[min(1.5vw,14px)] object-cover"
                width={1024}
                height={1024}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <h2 className="mb-12 max-w-[44ch] font-display text-4xl leading-tight text-ink text-balance md:text-5xl">
            Everything a slow week asks for
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            <Amenity
              title="Sea-view pool"
              description="Private, open to the horizon."
              icon={<PoolIcon />}
            />
            <Amenity
              title="Tennis court"
              description="Your own, just off the garden."
              icon={<TennisIcon />}
            />
            <Amenity
              title="Sauna & jacuzzi"
              description="Warmth after the water."
              icon={<SaunaIcon />}
            />
            <Amenity
              title="Outdoor fireplace"
              description="For long, salt-air evenings."
              icon={<FireplaceIcon />}
            />
            <Amenity
              title="Free WiFi"
              description="Stay close, or drift."
              icon={<WifiIcon />}
            />
            <Amenity
              title="Near Rijeka"
              description="The city a short drive away."
              icon={<LocationIcon />}
            />
            <Amenity
              title="3 bedrooms"
              description="Sleeps the whole party."
              icon={<BedIcon />}
            />
            <Amenity
              title="3 bathrooms"
              description="Plenty of quiet mornings."
              icon={<BathIcon />}
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:px-12 md:py-32">
          <p className="mx-auto max-w-[30ch] font-display text-3xl leading-tight text-cream text-balance md:text-5xl">
            "We came for the sea and stayed for the silence. The pool at sunset
            is the whole reason."
          </p>
          <p className="mt-8 font-body text-sm uppercase tracking-[0.3em] text-clay">
            A guest · staying at Villa Krasica
          </p>
        </div>
      </section>

      {/* LOCATION */}
      <section className="bg-linen">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28">
          <div>
            <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-clay">
              Location
            </p>
            <h2 className="max-w-[26ch] font-display text-4xl leading-tight text-ink text-balance md:text-5xl">
              Set on the hillside, minutes from the water
            </h2>
            <p className="mt-6 max-w-[42ch] font-body text-base leading-relaxed text-ink/70">
              Krasica sits on the Kvarner coast, with Rijeka and its old town a
              short drive away and the Adriatic stretching out below. You have
              the hillside to yourself.
            </p>
          </div>
          <div>
            <img
              src={galleryTerrace.url}
              alt="Outdoor terrace and dining area at Villa Krasica with the pool nearby"
              className="aspect-[5/4] w-full rounded-[min(1.5vw,14px)] object-cover"
              width={1280}
              height={1024}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* GUEST GUIDE */}
      <section id="guide" className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-clay">
            Dear guests
          </p>
          <h2 className="max-w-[34ch] font-display text-4xl leading-tight text-ink text-balance md:text-5xl">
            Everything around the villa, in one place
          </h2>
          <p className="mt-6 max-w-[60ch] font-body text-base leading-relaxed text-ink/70">
            We are looking forward to your arrival at Villa Krasica. Your host
            will be me, Saša. I want you to feel at home, and I am available for
            any questions via WhatsApp. Below you will find shops, restaurants
            and beaches — each with a map link.
          </p>

          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            <GuideColumn title="Shops for food" items={SHOPS} />
            <GuideColumn title="Restaurants" items={RESTAURANTS} />
            <GuideColumn title="Beaches" items={BEACHES} />
          </div>

          <div className="mt-16">
            <h3 className="mb-6 font-body text-xs uppercase tracking-[0.3em] text-terra">
              On the map
            </h3>
            <ClientOnly
              fallback={
                <div className="h-[420px] w-full rounded-[min(1.5vw,14px)] border border-clay/30 bg-linen md:h-[520px]" />
              }
            >
              <Suspense
                fallback={
                  <div className="h-[420px] w-full rounded-[min(1.5vw,14px)] border border-clay/30 bg-linen md:h-[520px]" />
                }
              >
                <VillaMap />
              </Suspense>
            </ClientOnly>
          </div>

          <div className="mt-16 grid gap-6 rounded-[min(1.5vw,14px)] border border-clay/30 p-8 md:grid-cols-3 md:p-10">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-clay">
                Email
              </p>
              <a
                href="mailto:info@villa-krasica.com"
                className="mt-2 block font-body text-base text-ink transition-colors hover:text-terra"
              >
                info@villa-krasica.com
              </a>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-clay">
                Phone
              </p>
              <a
                href="tel:+385917307118"
                className="mt-2 block font-body text-base text-ink transition-colors hover:text-terra"
              >
                +385 91 7307 118
              </a>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-clay">
                Address
              </p>
              <p className="mt-2 font-body text-base text-ink">
                Krasica 203 b, 51224 Krasica, Croatia
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section
        id="reserve"
        className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={terraceSunset.url}
            alt="Terrace doors at Villa Krasica opening to a golden sunset over the Adriatic sea"
            className="anim-shimmer h-full w-full object-cover"
            width={1600}
            height={900}
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/40" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center md:px-12">
          <h2 className="mx-auto max-w-[26ch] font-display text-4xl leading-tight text-cream text-balance md:text-6xl">
            The terrace is open. The sea is waiting.
          </h2>
          <p className="mx-auto mt-6 max-w-[44ch] font-body text-base leading-relaxed text-cream/85 md:text-lg">
            Reserve Villa Krasica directly through Booking.com, where the
            listing, dates and rates live.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="anim-pulse-soft mt-9 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 font-body text-sm font-medium text-terra ring-1 ring-cream/30"
          >
            View on Booking.com
            <svg
              className="size-4 shrink-0"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M7 13 13 7M8 7h5v5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <p className="mt-6 font-body text-xs tracking-wide text-cream/50">
            Villa Krasica · Krasica, Croatia · 5-star private villa
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink py-10 text-cream/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-12">
          <span className="font-display text-2xl text-cream">
            Villa Krasica
          </span>
          <span className="font-body text-sm">
            203 Krasica, 51224 Krasica, Croatia
          </span>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm transition-colors hover:text-cream"
          >
            Booking.com
          </a>
        </div>
      </footer>
    </main>
  );
}

function Amenity({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid size-11 place-items-center rounded-full border border-clay/40 text-terra">
        {icon}
      </div>
      <div>
        <h3 className="font-body text-base font-medium text-ink">{title}</h3>
        <p className="mt-1 font-body text-sm leading-relaxed text-ink/60">
          {description}
        </p>
      </div>
    </div>
  );
}

function PoolIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path
        d="M2 15c2-2 4-2 6 0s4 2 6 0 4-2 4 0"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TennisIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <circle cx="10" cy="10" r="7" />
      <path d="M10 3v14M3 10h14" />
    </svg>
  );
}

function SaunaIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path
        d="M6 16c0-3 2-4 2-6M11 16c0-3 2-4 2-6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FireplaceIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path
        d="M6 3c2 3 4 3 4 6a4 4 0 0 1-8 0c0-1 .5-2 1-2.5C4 8 6 6 6 3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path d="M10 16v-5M4 10a8 8 0 0 1 12 0M1 7a12 12 0 0 1 18 0" strokeLinecap="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path d="M10 17s6-5 6-9a6 6 0 0 0-12 0c0 4 6 9 6 9Z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <rect x="4" y="6" width="12" height="10" rx="1" />
      <path d="M4 9h12M8 3v3M12 3v3" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path d="M4 11a6 6 0 0 1 12 0Z" />
      <path d="M6 14h8" strokeLinecap="round" />
    </svg>
  );
}

function GuideColumn({ title, items }: { title: string; items: GuideItem[] }) {
  return (
    <div>
      <h3 className="font-body text-xs uppercase tracking-[0.3em] text-terra">
        {title}
      </h3>
      <ul className="mt-6 space-y-6">
        {items.map((item) => (
          <li key={item.name}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <span className="font-body text-base font-medium text-ink transition-colors group-hover:text-terra">
                {item.name}
              </span>
              <span className="mt-1 block font-body text-sm leading-relaxed text-ink/60">
                {item.detail}
              </span>
              <span className="mt-1 block font-body text-xs uppercase tracking-[0.2em] text-clay">
                {item.distance} · Map
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
