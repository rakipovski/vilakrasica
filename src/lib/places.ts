export type GuideCategory = "villa" | "shops" | "restaurants" | "beaches";

export type GuideItem = {
  name: string;
  detail: string;
  distance: string;
  url: string;
  /** Query used for geocoding this place. */
  query: string;
  category: GuideCategory;
};

export const VILLA: GuideItem = {
  name: "Villa Krasica",
  detail: "Krasica 203 b, 51224 Krasica, Croatia",
  distance: "",
  url: "https://maps.google.com/?q=Krasica+203b,+51224+Krasica,+Croatia",
  query: "Krasica 203b, 51224 Krasica, Croatia",
  category: "villa",
};

export const SHOPS: GuideItem[] = [
  {
    name: "Lidl Kukuljanovo",
    detail: "Kukuljanovo 348, 51227 Kukuljanovo · Mon–Sat 7–21, Sun 8–18",
    distance: "about 6 km",
    url: "https://maps.app.goo.gl/41BZJrzH6n54ddQW6",
    query: "Lidl, Kukuljanovo 348, 51227 Kukuljanovo, Croatia",
    category: "shops",
  },
  {
    name: "Interspar Kukuljanovo",
    detail: "Kukuljanovo 362, 51227 Kukuljanovo · Mon–Sat 7–21, Sun 8–20",
    distance: "about 6 km",
    url: "https://maps.app.goo.gl/zYfx9YGsp666593D7",
    query: "Interspar, Kukuljanovo 362, 51227 Kukuljanovo, Croatia",
    category: "shops",
  },
  {
    name: "Plodine Kukuljanovo",
    detail: "Kukuljanovo 348, 51227 Kukuljanovo · Mon–Sat 7–21, Sun 8–18",
    distance: "about 6 km",
    url: "https://maps.app.goo.gl/9iZZPfeuxUvz3Yyj8",
    query: "Plodine, Kukuljanovo, 51227 Kukuljanovo, Croatia",
    category: "shops",
  },
];

export const RESTAURANTS: GuideItem[] = [
  {
    name: "Konoba Brig",
    detail: "Brig 29, 51000 Rijeka",
    distance: "about 8 km",
    url: "https://maps.app.goo.gl/tpa8TueWTiZnEmVF8",
    query: "Konoba Brig, Brig 29, 51000 Rijeka, Croatia",
    category: "restaurants",
  },
  {
    name: "Pivnica Kont",
    detail: "Šetalište Andrije Kačića Miošića 1, 51000 Rijeka",
    distance: "about 17 km",
    url: "https://maps.google.com/?q=Pivnica+Kont%2C+%C5%A0etali%C5%A1te+Andrije+Ka%C4%8Di%C4%87a+Mio%C5%A1i%C4%87a+1%2C+51000+Rijeka%2C+Croatia",
    query: "Pivnica Kont, Šetalište Andrije Kačića Miošića 1, 51000 Rijeka, Croatia",
    category: "restaurants",
  },
  {
    name: "Restoran Aerosteak",
    detail: "Soboli 53, 51219 Soboli, Čavle",
    distance: "about 18 km",
    url: "https://maps.google.com/?q=Restoran+Aerosteak%2C+Soboli+53%2C+51219+Soboli%2C+%C4%8Cavle%2C+Croatia",
    query: "Restoran Aerosteak, Soboli 53, 51219 Soboli, Čavle, Croatia",
    category: "restaurants",
  },
  {
    name: "Restoran Anić",
    detail: "Rožići 1b, 51221 Kostrena",
    distance: "about 12 km",
    url: "https://maps.google.com/?q=Restoran+Ani%C4%87%2C+Ro%C5%BEi%C4%87i+1b%2C+51221+Kostrena%2C+Croatia",
    query: "Restoran Anić, Rožići 1b, 51221 Kostrena, Croatia",
    category: "restaurants",
  },
  {
    name: "Bistro pizzeria Paris",
    detail: "Kalorija, Rijeka",
    distance: "about 17 km",
    url: "https://maps.google.com/?q=Bistro+pizzeria+Paris%2C+Kalorija%2C+Rijeka%2C+Croatia",
    query: "Bistro pizzeria Paris, Kalorija, Rijeka, Croatia",
    category: "restaurants",
  },
  {
    name: "Bistro Mornar",
    detail: "Riva Boduli 5A, 51000 Rijeka",
    distance: "about 17 km",
    url: "https://maps.app.goo.gl/YoUyTxb1BHVDsYZZA",
    query: "Bistro Mornar, Riva Boduli 5A, 51000 Rijeka, Croatia",
    category: "restaurants",
  },
  {
    name: "El Rio",
    detail: "Jadranski trg 4b, Rijeka",
    distance: "about 14 km",
    url: "https://maps.app.goo.gl/gbN9dJMULV64g1Uw6",
    query: "El Rio, Jadranski trg 4b, Rijeka, Croatia",
    category: "restaurants",
  },
  {
    name: "Restoran Sidro",
    detail: "Črišnjeva 7, 51263 Šmrika",
    distance: "about 13 km",
    url: "https://maps.app.goo.gl/eWhNCm92UEKSgioe7",
    query: "Restoran Sidro, Črišnjeva 7, 51263 Šmrika, Croatia",
    category: "restaurants",
  },
  {
    name: "Barbacoa",
    detail: "Riva 1, 51000 Rijeka",
    distance: "about 17 km",
    url: "https://maps.app.goo.gl/nyYBQf7BUxSkfWYeA",
    query: "Barbacoa, Riva 1, 51000 Rijeka, Croatia",
    category: "restaurants",
  },
  {
    name: "Restoran Ružmarin",
    detail: "Ulica Ružmarina 1, 51410 Opatija",
    distance: "about 25 km",
    url: "https://maps.app.goo.gl/JU7nsULR6zwhJe3PA",
    query: "Restoran Ružmarin, Opatija, Croatia",
    category: "restaurants",
  },
  {
    name: "Restoran Roko",
    detail: "Ulica Roko 2, 51000 Rijeka",
    distance: "about 25 km",
    url: "https://maps.app.goo.gl/sWEZEAashmmmzNno9",
    query: "Restoran Roko, Rijeka, Croatia",
    category: "restaurants",
  },
];

export const BEACHES: GuideItem[] = [
  {
    name: "Kostrena beach",
    detail:
      "Pebble and concrete beach near Rijeka, good for families and water sports.",
    distance: "about 9 km",
    url: "https://maps.app.goo.gl/ioopvaa64TW5G2p36",
    query: "Kostrena beach, Kostrena, Croatia",
    category: "beaches",
  },
  {
    name: "Jadranovo beach",
    detail: "Pebbles and rock, a calm spot for family days and snorkelling.",
    distance: "about 17 km",
    url: "https://maps.app.goo.gl/HArFjRAcaydRRJS4A",
    query: "Jadranovo beach, Jadranovo, Croatia",
    category: "beaches",
  },
  {
    name: "Crikvenica beach",
    detail:
      "Wide pebble beach with plenty of facilities, one of Kvarner's favourites.",
    distance: "about 20 km",
    url: "https://maps.app.goo.gl/XhJre7NJxdqDajMN9",
    query: "Crikvenica beach, Crikvenica, Croatia",
    category: "beaches",
  },
  {
    name: "Njivice beach (Krk island)",
    detail:
      "Pebble beach made for families, with cafés and water sports nearby.",
    distance: "about 35 km",
    url: "https://maps.app.goo.gl/zKu8EZ4abKwhvGv9A",
    query: "Njivice beach, Njivice, Krk, Croatia",
    category: "beaches",
  },
  {
    name: "Kačjak beach (Krk island)",
    detail: "Quiet beach on the south side of Krk, untouched and restful.",
    distance: "about 18 km",
    url: "https://maps.app.goo.gl/M8KSLMoeUqMxFB2n8",
    query: "Kačjak beach, Dramalj, Croatia",
    category: "beaches",
  },
];

export const ALL_PLACES: GuideItem[] = [
  VILLA,
  ...SHOPS,
  ...RESTAURANTS,
  ...BEACHES,
];
