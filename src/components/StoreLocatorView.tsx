import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Search,
  Navigation,
  CheckCircle2,
  Sliders,
  Sparkles,
  ShoppingBag,
  Wrench,
  Headphones,
  Calendar
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { SeoMeta } from './SeoMeta';

interface StoreLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  isOpenNow: boolean;
  features: string[];
  lat: number;
  lng: number;
  image: string;
}

const STORES_DATA: StoreLocation[] = [
  {
    id: 'store-sf',
    name: 'San Francisco Flagship Showroom & Acoustic Lab',
    city: 'San Francisco',
    country: 'United States',
    address: '100 Nova Tech Parkway, Suite 400',
    postalCode: 'CA 94105',
    phone: '+1 (415) 555-NOVA',
    email: 'sf.store@novatech.io',
    hours: 'Mon - Sat: 10:00 AM - 8:00 PM PST | Sun: 11:00 AM - 6:00 PM',
    isOpenNow: true,
    features: ['Demo Sound Booth', 'Repair & Service Bar', 'Custom Ear Tip Fitting', 'Curbside Pickup'],
    lat: 37.7749,
    lng: -122.4194,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'store-tokyo',
    name: 'Tokyo Shibuya Hardware & Audio Hub',
    city: 'Tokyo',
    country: 'Japan',
    address: '2-21-1 Shibuya, Shibuya-ku',
    postalCode: '150-8510',
    phone: '+81 (3) 5555-8492',
    email: 'tokyo.store@novatech.io',
    hours: 'Mon - Sun: 11:00 AM - 9:00 PM JST',
    isOpenNow: true,
    features: ['Demo Sound Booth', 'Repair & Service Bar', 'Japanese Craft Edition DACS'],
    lat: 35.658,
    lng: 139.7016,
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'store-london',
    name: 'London Soho Acoustic Experience Studio',
    city: 'London',
    country: 'United Kingdom',
    address: '42 Broadwick Street, Soho',
    postalCode: 'W1F 7AB',
    phone: '+44 20 7946 0912',
    email: 'london.store@novatech.io',
    hours: 'Mon - Sat: 10:00 AM - 7:00 PM GMT',
    isOpenNow: false,
    features: ['Demo Sound Booth', 'Vinyl & DAC Listening Room', 'Curbside Pickup'],
    lat: 51.5134,
    lng: -0.1363,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'store-berlin',
    name: 'Berlin Kreuzberg Tech & Sound Studio',
    city: 'Berlin',
    country: 'Germany',
    address: 'Oranienstraße 185',
    postalCode: '10999',
    phone: '+49 30 2312 9481',
    email: 'berlin.store@novatech.io',
    hours: 'Tue - Sat: 11:00 AM - 7:00 PM CET',
    isOpenNow: true,
    features: ['Repair & Service Bar', 'Modular Theme Lab', 'Custom Cable Soldering'],
    lat: 52.5003,
    lng: 13.419,
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600&auto=format&fit=crop&q=80'
  }
];

interface StoreLocatorViewProps {
  onNavigateHome?: () => void;
  onNavigateContact?: () => void;
}

export const StoreLocatorView: React.FC<StoreLocatorViewProps> = ({
  onNavigateHome,
  onNavigateContact
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<string>('All');
  const [activeStoreId, setActiveStoreId] = useState<string>(STORES_DATA[0].id);

  const featureOptions = ['All', 'Demo Sound Booth', 'Repair & Service Bar', 'Curbside Pickup'];

  const filteredStores = useMemo(() => {
    return STORES_DATA.filter((s) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.postalCode.toLowerCase().includes(q);

      const matchesFeature =
        selectedFeature === 'All' || s.features.includes(selectedFeature);

      return matchesSearch && matchesFeature;
    });
  }, [searchQuery, selectedFeature]);

  const activeStore = useMemo(() => {
    return STORES_DATA.find((s) => s.id === activeStoreId) || STORES_DATA[0];
  }, [activeStoreId]);

  // Schema.org LocalBusiness structured data
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    name: activeStore.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: activeStore.address,
      addressLocality: activeStore.city,
      postalCode: activeStore.postalCode,
      addressCountry: activeStore.country
    },
    telephone: activeStore.phone,
    email: activeStore.email
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SeoMeta
        title="Store Locator & Acoustic Showrooms - Nova Tech"
        description="Locate official Nova Tech flagship showrooms, sound booths, and hardware service centers in San Francisco, Tokyo, London, and Berlin."
        schemaData={localBusinessSchema}
      />

      <PageHeader
        breadcrumbs={[
          { label: 'Store', onClick: onNavigateHome },
          { label: 'Store Locator', active: true }
        ]}
        badge="Global Flagships & Sound Booths"
        title="Find a Nova Tech Showroom Near You"
        description="Experience our high-fidelity beryllium headphones, OLED decks, and custom DAC amplifiers in person. Book a sound booth audition or drop off for service."
      />

      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            aria-label="Search stores by city, zip code, or country"
            placeholder="Search by city, zip code, or country (e.g. San Francisco, Tokyo, 94105)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <span className="text-[11px] font-mono font-bold uppercase text-slate-400 shrink-0">Filter:</span>
          {featureOptions.map((feat) => (
            <button
              key={feat}
              onClick={() => setSelectedFeature(feat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFeature === feat
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {feat}
            </button>
          ))}
        </div>
      </div>

      {/* Layout Grid: Store Cards List + Interactive Map Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Store List */}
        <div className="lg:col-span-5 space-y-4 max-h-[700px] overflow-y-auto custom-scrollbar pr-1">
          {filteredStores.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border text-slate-500 text-xs">
              No Nova Tech showrooms match your search query. Try searching for "San Francisco" or "Tokyo".
            </div>
          ) : (
            filteredStores.map((store) => {
              const isSelected = store.id === activeStoreId;
              return (
                <div
                  key={store.id}
                  onClick={() => setActiveStoreId(store.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-500 shadow-md ring-1 ring-sky-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {store.name}
                    </h4>
                    {store.isOpenNow ? (
                      <span className="badge badge--success text-[10px] shrink-0 font-mono">Open Now</span>
                    ) : (
                      <span className="badge text-[10px] shrink-0 font-mono bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Closed</span>
                    )}
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span>{store.address}, {store.city} {store.postalCode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="font-mono">{store.phone}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {store.features.map((feat, idx) => (
                      <span key={idx} className="chip text-[10px] font-mono">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Interactive Map Visualizer */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-xl min-h-[500px] flex flex-col justify-between relative">
          {/* Map Header Overlay */}
          <div className="p-6 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-between gap-4 z-10">
            <div>
              <div className="text-xs font-mono text-sky-400 font-bold uppercase">{activeStore.city}, {activeStore.country}</div>
              <h3 className="text-lg font-bold text-white">{activeStore.name}</h3>
            </div>
            <button
              onClick={() => alert(`Opening Google Maps directions for ${activeStore.address}...`)}
              className="btn btn-primary text-xs font-bold py-2 px-4 gap-2 shrink-0"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </button>
          </div>

          {/* Interactive Graphic Canvas / Map Background */}
          <div className="relative flex-1 bg-slate-950 flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
            
            {/* Store Pins Grid Graphic */}
            <div className="relative z-10 text-center space-y-6 max-w-md">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center mx-auto text-sky-400 animate-bounce">
                <MapPin className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="badge badge--sky font-mono text-[10px] uppercase">GPS Coordinates</span>
                <div className="text-xs font-mono text-slate-300">
                  Lat: {activeStore.lat} | Lng: {activeStore.lng}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeStore.address}, {activeStore.city}, {activeStore.country}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-left space-y-2">
                <div className="text-slate-400 font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Showroom Hours</span>
                </div>
                <div className="text-slate-200">{activeStore.hours}</div>
              </div>
            </div>
          </div>

          {/* Store Image Footer */}
          <div className="h-36 overflow-hidden relative border-t border-slate-800">
            <img
              src={activeStore.image}
              alt={activeStore.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent flex items-end p-4">
              <div className="text-xs font-mono text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>In-Store Pickup Available (Ready in 2 Hours)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
