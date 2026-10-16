export type PriceTier = {
  group: string;
  vehicle: string;
  route: string;
  amount: number;
};

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  overnight: string;
};

export type TourPackage = {
  slug: string;
  title: string;
  destination: string;
  duration: string;
  tag: string;
  summary: string;
  image: string;
  prices: PriceTier[];
  priceNote: string;
  days: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  notes: string[];
  pdf?: string;
};

const mountain =
  "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1800&q=80";
const valley =
  "https://images.unsplash.com/photo-1504598318550-17eba1008a68?auto=format&fit=crop&w=1800&q=80";

export const packages: TourPackage[] = [
  {
    slug: "delhi-shimla-manali",
    title: "Delhi – Shimla – Manali",
    destination: "Shimla and Manali, Himachal Pradesh",
    duration: "6 Days / 5 Nights",
    tag: "Ex Delhi",
    summary:
      "A private Delhi-to-Delhi road trip through Shimla and Manali, with hotels, MAP meals and sightseeing in one starting package.",
    image: mountain,
    prices: [
      {
        group: "2 people",
        vehicle: "Sedan",
        route: "Delhi to Delhi",
        amount: 23500,
      },
      {
        group: "4 people",
        vehicle: "Sedan",
        route: "Delhi to Delhi",
        amount: 30000,
      },
      {
        group: "6 people",
        vehicle: "Ertiga",
        route: "Delhi to Delhi",
        amount: 43000,
      },
    ],
    priceNote:
      "Starting package prices for the group size shown. The final tariff may vary by travel date, hotel category, vehicle availability and selected inclusions.",
    pdf: "/itineraries/delhi-shimla-manali-6d5n.pdf",
    days: [
      {
        day: 1,
        title: "Delhi – Shimla",
        description:
          "Pickup from Delhi Airport, a railway station, or your preferred Delhi location. Drive to Shimla through the Himalayan foothills. Check in at the hotel and relax. The evening is free for a walk around Mall Road, subject to time and local conditions.",
        overnight: "Shimla",
      },
      {
        day: 2,
        title: "Shimla local sightseeing",
        description:
          "After breakfast, proceed for Shimla sightseeing. Visit Kufri, Himalayan Nature Park (entry tickets extra, if applicable), and other popular local viewpoints. Return to Shimla. The evening is free for Mall Road and the Ridge.",
        overnight: "Shimla",
      },
      {
        day: 3,
        title: "Shimla – Manali",
        description:
          "After breakfast, check out and drive to Manali. The route offers mountain valleys and river views. En route, visit Manikaran Sahib and the Manikaran valley as time permits. Continue to Manali and check in.",
        overnight: "Manali",
      },
      {
        day: 4,
        title: "Manali local sightseeing",
        description:
          "After breakfast, enjoy local Manali sightseeing including Hadimba Temple, Manu Temple, Vashisht Bath and Temple, Van Vihar and Mall Road. Return to the hotel and spend the evening at leisure.",
        overnight: "Manali",
      },
      {
        day: 5,
        title: "Solang Valley",
        description:
          "After breakfast, take a day excursion to Solang Valley, known for mountain views and seasonal snow activities. Optional adventure activities are at your own cost. Return to Manali.",
        overnight: "Manali",
      },
      {
        day: 6,
        title: "Manali – Delhi",
        description:
          "After breakfast, check out and drive back to Delhi through the hills and plains. Drop at Delhi Airport, a railway station, or your preferred Delhi location.",
        overnight: "Tour ends in Delhi",
      },
    ],
    inclusions: [
      "Private vehicle for the full Delhi–Shimla–Manali–Delhi journey and sightseeing, according to group size.",
      "Pickup and drop from Delhi Airport or a railway station.",
      "5 nights hotel accommodation on a double-sharing basis.",
      "MAP meal plan: 5 breakfasts and 5 dinners per person.",
      "Vehicle, driver and standard road-trip expenses as per the package.",
      "Taxes, tolls, parking and other items confirmed at the time of booking.",
    ],
    exclusions: [
      "Airfare and train fare.",
      "Sissu, Atal Tunnel and other optional route excursions unless they are specifically included.",
      "Monument, museum, activity and adventure entry fees.",
      "Personal expenses, shopping, laundry, room service, snacks and beverages.",
      "Optional tours such as skiing, paragliding and river rafting.",
      "Room heater charges where applicable.",
      "Any meal other than those listed above.",
      "Anything not specifically mentioned under inclusions.",
    ],
    notes: [
      "Travel times are approximate and depend on traffic, weather, road conditions and local restrictions.",
      "Hotel names and categories are finalized according to availability and the selected package.",
      "Snow and adventure activities are seasonal and depend on weather, local rules and operator availability.",
      "Confirm the final quotation before booking. These figures are starting prices for the stated group size and vehicle.",
    ],
  },
  {
    slug: "chandigarh-shimla-manali",
    title: "Chandigarh – Shimla – Manali",
    destination: "Shimla and Manali, Himachal Pradesh",
    duration: "6 Days / 5 Nights",
    tag: "Ex Chandigarh",
    summary:
      "The same Shimla and Manali holiday, starting from Chandigarh. Share your dates and group size for a confirmed vehicle, hotel and price.",
    image: valley,
    prices: [],
    priceNote:
      "Quoted on request. The final plan depends on travel dates, hotel category, vehicle and the sightseeing you want included.",
    days: [],
    inclusions: [
      "Private vehicle from Chandigarh for the hill journey and local sightseeing.",
      "Hotel stays and meals confirmed in the quotation.",
      "Pickup and drop points in Chandigarh agreed before travel.",
    ],
    exclusions: [
      "Airfare and train fare.",
      "Monument, activity and adventure entry fees.",
      "Personal expenses, snacks and meals that are not in the confirmed plan.",
      "Optional excursions unless they are written into the quotation.",
    ],
    notes: [
      "This departure does not use the fixed Delhi price card. Ask for a fresh quote before you book.",
      "The Delhi–Shimla–Manali day plan is a useful reference for the kind of sightseeing usually covered.",
    ],
  },
];

export const packageOptions = packages.map((item) => ({
  slug: item.slug,
  title: item.title,
}));

export function getPackage(slug: string) {
  return packages.find((item) => item.slug === slug);
}
