import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Release {
  id: number;
  name: string;
  colorway: string;
  releaseDate: string;
  price: number;
  image: string;
  status: 'upcoming' | 'dropped' | 'sold_out';
  category: 'retro' | 'og' | 'collab' | 'limited';
}

const releases: Release[] = [
  {
    id: 1,
    name: 'Air Jordan 1 Retro High OG',
    colorway: 'Chicago Reimagined',
    releaseDate: '2025-02-15',
    price: 180,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop',
    status: 'upcoming',
    category: 'retro'
  },
  {
    id: 2,
    name: 'Air Jordan 4 Retro',
    colorway: 'Bred Reimagined',
    releaseDate: '2025-02-08',
    price: 215,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop',
    status: 'upcoming',
    category: 'og'
  },
  {
    id: 3,
    name: 'Air Jordan 11 Retro',
    colorway: 'Columbia',
    releaseDate: '2025-01-25',
    price: 225,
    image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop',
    status: 'dropped',
    category: 'retro'
  },
  {
    id: 4,
    name: 'Travis Scott x Air Jordan 1 Low',
    colorway: 'Mocha Reverse',
    releaseDate: '2025-03-01',
    price: 150,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
    status: 'upcoming',
    category: 'collab'
  },
  {
    id: 5,
    name: 'Air Jordan 3 Retro',
    colorway: 'White Cement Reimagined',
    releaseDate: '2025-02-22',
    price: 200,
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600&h=600&fit=crop',
    status: 'upcoming',
    category: 'og'
  },
  {
    id: 6,
    name: 'Air Jordan 6 Retro',
    colorway: 'Infrared',
    releaseDate: '2025-01-18',
    price: 200,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
    status: 'sold_out',
    category: 'og'
  },
  {
    id: 7,
    name: 'Off-White x Air Jordan 2 Low',
    colorway: 'Black Varsity Royal',
    releaseDate: '2025-03-15',
    price: 250,
    image: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=600&h=600&fit=crop',
    status: 'upcoming',
    category: 'limited'
  },
  {
    id: 8,
    name: 'Air Jordan 5 Retro',
    colorway: 'Fire Red',
    releaseDate: '2025-02-01',
    price: 210,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=600&fit=crop',
    status: 'upcoming',
    category: 'retro'
  }
];

const categories = ['all', 'retro', 'og', 'collab', 'limited'] as const;

function App() {
  const [filter, setFilter] = useState<string>('all');
  const [notified, setNotified] = useState<Set<number>>(new Set());

  const filteredReleases = releases.filter(
    r => filter === 'all' || r.category === filter
  );

  const getCountdown = (dateStr: string) => {
    const release = new Date(dateStr);
    const now = new Date();
    const diff = release.getTime() - now.getTime();

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return { days, hours };
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const toggleNotify = (id: number) => {
    setNotified(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-3"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#CE1126] rounded-full flex items-center justify-center">
              <span className="font-oswald font-bold text-sm md:text-lg">J</span>
            </div>
            <span className="font-oswald text-xl md:text-2xl font-bold tracking-tight">JUMPMAN DROPS</span>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#releases" className="font-barlow text-sm uppercase tracking-widest hover:text-[#CE1126] transition-colors">Releases</a>
            <a href="#calendar" className="font-barlow text-sm uppercase tracking-widest hover:text-[#CE1126] transition-colors">Calendar</a>
            <button className="bg-white text-black px-6 py-2 font-oswald font-bold uppercase tracking-wide hover:bg-[#CE1126] hover:text-white transition-all">
              Notify Me
            </button>
          </motion.nav>

          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <h1 className="font-oswald text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase">
              <span className="block">Never Miss</span>
              <span className="block text-[#CE1126]">A Drop</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-barlow text-lg md:text-xl text-white/60 mt-6 md:mt-8 max-w-lg"
            >
              Track every Air Jordan release. Get notified before the heat sells out.
            </motion.p>
          </motion.div>

          {/* Featured countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-r from-[#CE1126]/20 to-transparent border-l-4 border-[#CE1126]"
          >
            <p className="font-barlow text-xs uppercase tracking-widest text-white/50 mb-2">Next Drop</p>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-oswald text-xl md:text-2xl font-bold">{releases[0].name}</h3>
                <p className="font-barlow text-white/60">{releases[0].colorway}</p>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                {getCountdown(releases[0].releaseDate) && (
                  <>
                    <div className="text-center">
                      <span className="font-oswald text-3xl md:text-4xl font-bold text-[#CE1126]">
                        {getCountdown(releases[0].releaseDate)?.days}
                      </span>
                      <p className="font-barlow text-[10px] md:text-xs uppercase tracking-wider text-white/50">Days</p>
                    </div>
                    <div className="text-center">
                      <span className="font-oswald text-3xl md:text-4xl font-bold text-[#CE1126]">
                        {getCountdown(releases[0].releaseDate)?.hours}
                      </span>
                      <p className="font-barlow text-[10px] md:text-xs uppercase tracking-wider text-white/50">Hours</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 md:px-8 mb-8 md:mb-12" id="releases">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 md:px-6 py-2 md:py-3 font-oswald uppercase text-sm tracking-wide transition-all ${
                  filter === cat
                    ? 'bg-[#CE1126] text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Releases Grid */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredReleases.map((release, index) => (
                <ReleaseCard
                  key={release.id}
                  release={release}
                  index={index}
                  isNotified={notified.has(release.id)}
                  onNotify={() => toggleNotify(release.id)}
                  formatDate={formatDate}
                  getCountdown={getCountdown}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 md:py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#CE1126] rounded-full flex items-center justify-center">
              <span className="font-oswald font-bold text-xs">J</span>
            </div>
            <span className="font-oswald text-sm font-bold tracking-tight">JUMPMAN DROPS</span>
          </div>
          <p className="font-barlow text-xs text-white/30">
            Requested by @justin · Built by @clonkbot
          </p>
        </div>
      </footer>
    </div>
  );
}

interface ReleaseCardProps {
  release: Release;
  index: number;
  isNotified: boolean;
  onNotify: () => void;
  formatDate: (date: string) => string;
  getCountdown: (date: string) => { days: number; hours: number } | null;
}

function ReleaseCard({ release, index, isNotified, onNotify, formatDate, getCountdown }: ReleaseCardProps) {
  const countdown = getCountdown(release.releaseDate);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative bg-white/[0.02] border border-white/10 overflow-hidden hover:border-[#CE1126]/50 transition-colors"
    >
      {/* Status badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`px-2 py-1 text-[10px] font-oswald uppercase tracking-wider ${
          release.status === 'upcoming'
            ? 'bg-[#CE1126] text-white'
            : release.status === 'dropped'
            ? 'bg-white/20 text-white'
            : 'bg-white/10 text-white/50'
        }`}>
          {release.status === 'sold_out' ? 'Sold Out' : release.status}
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
        <img
          src={release.image}
          alt={release.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Countdown overlay */}
        {countdown && release.status === 'upcoming' && (
          <div className="absolute bottom-3 right-3 flex gap-2">
            <div className="bg-black/80 backdrop-blur-sm px-2 py-1 text-center">
              <span className="font-oswald text-lg font-bold text-[#CE1126]">{countdown.days}</span>
              <span className="font-barlow text-[8px] uppercase tracking-wider text-white/50 block">D</span>
            </div>
            <div className="bg-black/80 backdrop-blur-sm px-2 py-1 text-center">
              <span className="font-oswald text-lg font-bold text-[#CE1126]">{countdown.hours}</span>
              <span className="font-barlow text-[8px] uppercase tracking-wider text-white/50 block">H</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="font-barlow text-[10px] uppercase tracking-widest text-[#CE1126] mb-1">
          {formatDate(release.releaseDate)}
        </p>
        <h3 className="font-oswald text-lg font-bold leading-tight mb-1 group-hover:text-[#CE1126] transition-colors">
          {release.name}
        </h3>
        <p className="font-barlow text-sm text-white/50 mb-4">{release.colorway}</p>

        <div className="flex items-center justify-between">
          <span className="font-oswald text-xl font-bold">${release.price}</span>
          <button
            onClick={onNotify}
            disabled={release.status === 'sold_out'}
            className={`p-3 transition-all ${
              release.status === 'sold_out'
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : isNotified
                ? 'bg-[#CE1126] text-white'
                : 'bg-white/10 text-white hover:bg-[#CE1126]'
            }`}
          >
            <svg className="w-5 h-5" fill={isNotified ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover line effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#CE1126] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}

export default App;
