import { createFileRoute, Link } from "@tanstack/react-router";

const INFO_ITEMS = [
  {
    title: "WiFi",
    content: "WiFi password for all networks is 1234512345.",
  },
  {
    title: "Garbage separation",
    content: "We separate garbage. Garbage bins are on the parking area.",
  },
  {
    title: "Jacuzzi cover",
    content: "Please put the cover on the jacuzzi when you are not using it.",
  },
  {
    title: "Neighbors",
    content:
      "Please keep music and noise low — we have neighbors, just like you do at home.",
  },
];

export const Route = createFileRoute("/information")({
  head: () => ({
    meta: [
      { title: "Information — Villa Krasica" },
      {
        name: "description",
        content:
          "Practical information for guests at Villa Krasica: WiFi password, garbage separation, jacuzzi cover and house rules.",
      },
      { property: "og:title", content: "Information — Villa Krasica" },
      {
        property: "og:description",
        content:
          "Practical information for guests at Villa Krasica: WiFi password, garbage separation, jacuzzi cover and house rules.",
      },
    ],
  }),
  component: InformationPage,
});

function InformationPage() {
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
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-clay">
            Villa Krasica
          </p>
          <h1 className="mb-10 max-w-[24ch] font-display text-4xl leading-tight text-ink text-balance md:mb-14 md:text-6xl">
            Information
          </h1>

          <div className="space-y-6">
            {INFO_ITEMS.map((item) => (
              <div
                key={item.title}
                className="rounded-[min(1.5vw,14px)] border border-clay/30 bg-cream p-6 md:p-8"
              >
                <h2 className="mb-3 font-display text-xl text-ink md:text-2xl">
                  {item.title}
                </h2>
                <p className="font-body text-base leading-relaxed text-ink/70">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
