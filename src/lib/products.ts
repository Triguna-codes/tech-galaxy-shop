export type Category = "Audio" | "Smart Home" | "Wearables" | "Computing" | "Mobile" | "Gaming";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  featured?: boolean;
}

// Unsplash photo IDs for tech/gadget imagery
const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const audio = [
  "1606220588913-b3aacb4d2f46", "1590658268037-6bf12165a8df", "1572569511254-d8f925fe2cbb",
  "1610465299993-e6675c9f9efa", "1583394838336-acd977736f90", "1545127398-14699f92334b",
  "1484704849700-f032a568e944", "1505740420928-5e560c06d30e", "1558756520-22cfe5d382ca",
  "1546435770-a3e426bf472b",
];
const smartHome = [
  "1558002038-1055907df827", "1567016526105-22da7c13161a", "1585771724684-38269d6639fd",
  "1593305841991-05c297ba4575", "1558089687-f282ffcbc126", "1581092580497-e0d23cbdf1dc",
  "1545324418-cc1a3fa10c00", "1558618666-fcd25c85cd64", "1507646227500-4d389b0012be",
];
const wearables = [
  "1523275335684-37898b6baf30", "1579586337278-3befd40fd17a", "1551816230-ef5deaed4a26",
  "1617043786394-f977fa12eddf", "1546868871-7041f2a55e12", "1508685096489-7aacd43bd3b1",
  "1434056886845-dac89ffe9b56", "1542496658-e33a6d0d50f6",
];
const computing = [
  "1587825140708-dfaf72ae4b04", "1541140532154-b024d705b90a", "1593642632559-0c6d3fc62b89",
  "1496181133206-80ce9b88a853", "1517336714731-489689fd1ca8", "1527443224154-c4a3942d3acf",
  "1531297484001-80022131f5a1", "1484788984921-03950022c9ef", "1593640408182-31c70c8268f5",
];
const mobile = [
  "1511707171634-5f897ff02aa9", "1592750475338-74b7b21085ab", "1601784551446-20c9e07cdbdb",
  "1574944985070-8f3ebc6b79d2", "1556656793-08538906a9f8", "1580910051074-3eb694886505",
];
const gaming = [
  "1542751371-adc38448a05e", "1493711662062-fa541adb3fc8", "1552820728-8b83bb6b773f",
  "1606144042614-b2417e99c4e3", "1591488320449-011701bb6704", "1612287230202-1ff1d85d1bdf",
  "1580327344181-c1163234e5a0",
];

const seed: Array<[string, Category, number, string, string[]]> = [
  ["Aurora Pro Wireless Earbuds", "Audio", 249, "Transparent shell, spatial audio, 32h battery.", audio],
  ["Echo Bass Studio Headphones", "Audio", 379, "Studio-grade ANC over-ear cans with sapphire mic.", audio],
  ["Pulse Mini True Wireless", "Audio", 129, "Pocket-sized neon-blue earbuds with adaptive EQ.", audio],
  ["Halo Soundstage Speaker", "Audio", 299, "360° room-filling sound with floating bass cone.", audio],
  ["Nimbus Portable Boom", "Audio", 159, "Rugged outdoor speaker with 24h playtime.", audio],
  ["Strato Open-Ear Clip", "Audio", 179, "Bone-conduction open-ear earphones for runners.", audio],
  ["Quasar DAC Amplifier", "Audio", 499, "Reference-grade desktop DAC with OLED display.", audio],
  ["Nova Soundbar 7.1", "Audio", 699, "Cinematic Dolby Atmos with wireless sub.", audio],
  ["Vortex Gaming Headset", "Audio", 219, "7.1 surround with detachable boom mic.", audio],
  ["Lumen Lavalier Mic", "Audio", 99, "Studio-grade clip mic for creators.", audio],

  ["Orbit Smart Ambient Light", "Smart Home", 89, "16M color ambient lamp with music sync.", smartHome],
  ["Hearth Smart Thermostat", "Smart Home", 219, "Learning thermostat with mineral glass dial.", smartHome],
  ["Sentinel 4K Doorbell Cam", "Smart Home", 199, "Person AI detection with anti-theft alarm.", smartHome],
  ["Aurora Light Bars (Pair)", "Smart Home", 149, "Backlit RGB bars for desk and TV setups.", smartHome],
  ["Hive Smart Hub Pro", "Smart Home", 159, "Matter + Thread hub controls 200+ devices.", smartHome],
  ["Mist Aroma Diffuser", "Smart Home", 79, "Ultrasonic diffuser with circadian glow.", smartHome],
  ["Glacier Smart Fridge Cam", "Smart Home", 129, "Inside-fridge camera with grocery tracking.", smartHome],
  ["Bolt Smart Plug 4-Pack", "Smart Home", 49, "Energy monitoring outlets with schedules.", smartHome],
  ["Veil Smart Blinds Motor", "Smart Home", 189, "Retrofit blinds motor with solar charging.", smartHome],
  ["Vault Smart Lock V3", "Smart Home", 269, "Biometric door lock with auto-unlock.", smartHome],

  ["Chrono X Smartwatch", "Wearables", 449, "Titanium AMOLED watch with ECG + SpO2.", wearables],
  ["Pulse Fit Band 5", "Wearables", 99, "14-day battery fitness tracker.", wearables],
  ["Lumen AR Smart Glasses", "Wearables", 599, "Translucent AR HUD glasses for daily wear.", wearables],
  ["Aero Bone-Conduct Headband", "Wearables", 129, "Sleep-friendly audio headband.", wearables],
  ["Glide Smart Ring 2", "Wearables", 329, "Titanium ring with sleep & HRV tracking.", wearables],
  ["Pace Runner GPS Watch", "Wearables", 379, "Multiband GPS with topo maps.", wearables],
  ["Halo Posture Coach", "Wearables", 79, "Discreet posture-correcting wearable.", wearables],
  ["Echo Kids Smartwatch", "Wearables", 159, "GPS smartwatch with SOS and voice chat.", wearables],

  ["Nimbus 14 Ultrabook", "Computing", 1499, "Magnesium-alloy 14\" laptop with OLED panel.", computing],
  ["Forge Mechanical Keyboard 75", "Computing", 219, "Minimalist hot-swap mech with PBT keys.", computing],
  ["Vector Wireless Mouse", "Computing", 129, "Ultralight 60g esports mouse.", computing],
  ["Lattice Curved 34\" Monitor", "Computing", 899, "QD-OLED ultrawide with USB-C dock.", computing],
  ["Pixel 4K Webcam", "Computing", 199, "AI auto-frame webcam with bokeh.", computing],
  ["Helio Desk Mat XL", "Computing", 49, "Wireless-charging premium desk mat.", computing],
  ["Atlas USB-C Dock 12-in-1", "Computing", 169, "Aluminum dock with dual 4K out.", computing],
  ["Slate Tablet Pro 13", "Computing", 1199, "Pro tablet with stylus + magnetic keyboard.", computing],
  ["Cinder Mini PC", "Computing", 799, "Palm-sized workstation with NPU.", computing],

  ["Vega Foldable 5G Phone", "Mobile", 1799, "Inner 8\" OLED + ceramic hinge.", mobile],
  ["Lumen Pro Smartphone", "Mobile", 999, "Triple periscope camera with AI engine.", mobile],
  ["MagOrbit Power Bank", "Mobile", 79, "10K mAh magnetic wireless power bank.", mobile],
  ["Pulse Fast Charger 140W", "Mobile", 89, "GaN tri-port travel charger.", mobile],
  ["Drift Phone Stand", "Mobile", 39, "Aluminum floating phone stand.", mobile],
  ["Halo Selfie Ring", "Mobile", 59, "Bi-color magnetic selfie light.", mobile],

  ["Apex Pro Game Controller", "Gaming", 199, "Hall-effect sticks with magnetic triggers.", gaming],
  ["Lumen RGB Mouse Pad", "Gaming", 79, "RGB edge-lit hard mouse pad XL.", gaming],
  ["Forge Arcade Stick", "Gaming", 299, "Tournament-grade fightstick.", gaming],
  ["Eclipse VR Headset", "Gaming", 549, "Pancake-lens VR with eye tracking.", gaming],
  ["Pulse Racing Wheel", "Gaming", 449, "Direct-drive sim racing wheel.", gaming],
  ["Stream Deck Pro 32", "Gaming", 249, "Customizable LCD key controller.", gaming],
  ["Nova Streaming Mic", "Gaming", 169, "USB-C broadcast mic with mute halo.", gaming],
  ["Quasar Console Cooler", "Gaming", 89, "Active cooling dock for consoles.", gaming],

  ["Drone Skye Air 4K", "Mobile", 899, "Foldable 4K drone with obstacle AI.", mobile],
  ["E-Bike Lumen Commuter", "Smart Home", 1999, "Belt-drive e-bike with integrated lights.", smartHome],
  ["Robot Vacuum Glide R9", "Smart Home", 699, "LIDAR vacuum + self-emptying base.", smartHome],
  ["Espresso Atelier One", "Smart Home", 1299, "Touchscreen prosumer espresso machine.", smartHome],
  ["Air Purifier Halo Tower", "Smart Home", 449, "HEPA-13 tower with air quality dial.", smartHome],
  ["Smart Kettle Pulse", "Smart Home", 129, "Pour-over precision kettle.", smartHome],
];

let counter = 0;
const pickImg = (pool: string[]) => img(pool[counter++ % pool.length]);

export const products: Product[] = seed.map((s, i) => ({
  id: `p-${i + 1}`,
  name: s[0],
  category: s[1],
  price: s[2],
  description: s[3],
  image: pickImg(s[4]),
  featured: i < 6,
}));

export const categories: Category[] = ["Audio", "Smart Home", "Wearables", "Computing", "Mobile", "Gaming"];
