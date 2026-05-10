import { useState, useEffect, useRef } from 'react';
import {
  MapPin, Phone, Navigation, Footprints, Plane,
  ArrowUp, ArrowDown, Mountain, Compass,
  Sun, Cloud, CloudSun, CloudRain, CloudFog, CloudLightning,
  Sparkles
} from 'lucide-react';

const ITINERARY = [
  {
    date: '05/15 · 五',
    city: 'Madrid',
    region: 'Comunidad de Madrid',
    lat: 40.4168, lon: -3.7038,
    accommodation: 'Madrid Chamartín, Affiliated by Meliá',
    phone: '+34 917 333 400',
    address: 'C. de Mauricio Ravel, 10, Chamartin, Madrid, 28046',
    mapUrl: 'https://maps.app.goo.gl/Z1sgTppUtcRN4FdK8',
    walkingDist: '0 km',
    ascent: 0, descent: 0, elevation: 667,
    desc: '抵達馬德里，旅程在梅塞塔高原靜靜展開。',
    attractions: ['太陽門廣場', '普拉多博物館', '馬德里王宮']
  },
  {
    date: '05/16 · 六',
    city: 'Lugo',
    region: 'Galicia',
    lat: 43.0125, lon: -7.5558,
    accommodation: 'Dorma Puerta de San Pedro',
    phone: '+34 982 222 381',
    address: 'Rúa Río Neira, 29, Lugo 27002',
    mapUrl: 'https://maps.app.goo.gl/qE6yenG3f17v4bEQ7',
    walkingDist: '市區漫遊',
    ascent: 50, descent: 50, elevation: 465,
    desc: '盧戈古城牆 — 世界上保存最完整的古羅馬城牆，環抱整座舊城。',
    attractions: ['羅馬城牆 (UNESCO)', '盧戈大教堂', '聖母門']
  },
  {
    date: '05/17 · 日',
    city: 'Sarria',
    region: 'Galicia',
    lat: 42.7769, lon: -7.4150,
    accommodation: 'Hotel Alfonso IX',
    phone: '+34 982 530 005',
    address: 'Rúa del Peregrino 29, 27600 Sarria, Lugo',
    mapUrl: 'https://maps.app.goo.gl/HRFS8D5cmfWkfokW7',
    walkingDist: '行前準備',
    ascent: 0, descent: 0, elevation: 450,
    desc: 'Sarria — 法國之路最後 100 公里的起點，朝聖證書旅程從此開始。',
    attractions: ['聖薩爾瓦多教堂', '福塔萊薩堡壘']
  },
  {
    date: '05/18 · 一',
    city: 'Portomarín',
    region: 'Galicia',
    lat: 42.8083, lon: -7.6167,
    accommodation: 'Pousada De Portomarin',
    phone: '+34 982 545 200',
    address: 'Av. de Sarria, s/n, 27170 Portomarín, Lugo',
    mapUrl: 'https://maps.app.goo.gl/RfGNaVBbL1gAe13r7',
    walkingDist: '22.2 km',
    ascent: 380, descent: 420, elevation: 350,
    desc: '穿越橡樹林與小溪，跨越米尼奧河的長橋進入新城。',
    attractions: ['聖尼古拉斯教堂', '米尼奧河大橋']
  },
  {
    date: '05/19 · 二',
    city: 'Palas de Rei',
    region: 'Galicia',
    lat: 42.8731, lon: -7.8692,
    accommodation: 'Hotel Alda Palas de Rei',
    phone: '+34 982 380 750',
    address: 'Calle Doctor Pardo Ouro, 4, 27200 Palas de Rei',
    mapUrl: 'https://maps.app.goo.gl/GKM8zwqEVr5Yu8Z79',
    walkingDist: '24.8 km',
    ascent: 490, descent: 310, elevation: 565,
    desc: '加利西亞最具田園感的一段，緩坡、石徑與牧野相間。',
    attractions: ['Vilar de Donas 修道院', '聖蒂索教堂']
  },
  {
    date: '05/20 · 三',
    city: 'Melide',
    region: 'Galicia',
    lat: 42.9152, lon: -8.0161,
    accommodation: 'Hotel & Spa Carlos desde 1996',
    phone: '+34 981 507 633',
    address: 'Av. Lugo, 119, 15800 Melide, A Coruña',
    mapUrl: 'https://maps.app.goo.gl/1M6LpzekBbMc1maYA',
    walkingDist: '14.5 km',
    ascent: 210, descent: 320, elevation: 450,
    desc: '進入 Melide — 朝聖者必嘗加利西亞章魚 (Pulpo a la Gallega)。',
    attractions: ['Melide 羅馬式十字架', 'Pulpo a la Gallega']
  },
  {
    date: '05/21 · 四',
    city: 'Arzúa',
    region: 'Galicia',
    lat: 42.9261, lon: -8.1639,
    accommodation: 'Casa Teodora Arzua',
    phone: '+34 981 500 083',
    address: 'Rúa Lugo, 38, 15810 Arzúa, A Coruña',
    mapUrl: 'https://maps.app.goo.gl/y1yM7WSPGjbCHiyEA',
    walkingDist: '14.1 km',
    ascent: 220, descent: 280, elevation: 390,
    desc: '起司之鄉 Arzúa，路段平緩，森林氣味與奶香交織。',
    attractions: ['聖地亞哥大教堂 (Arzúa)', '起司博物館']
  },
  {
    date: '05/22 · 五',
    city: 'Lavacolla',
    region: 'Santiago',
    lat: 42.8943, lon: -8.4143,
    accommodation: 'Ruta Jacobea',
    phone: '+34 981 888 211',
    address: 'Lugar Lavacolla 41, 15820 Santiago de Compostela',
    mapUrl: 'https://maps.app.goo.gl/Mt1QciKTTXKGc5Xw8',
    walkingDist: '29.2 km',
    ascent: 550, descent: 610, elevation: 320,
    desc: '最長的一日 — 古朝聖者於此沐浴淨身，準備進入聖地。',
    attractions: ['Lavacolla 溪流', '聖馬科斯小堂']
  },
  {
    date: '05/23 — 24',
    city: 'Santiago',
    region: 'de Compostela',
    lat: 42.8782, lon: -8.5448,
    accommodation: 'Hotel Compostela',
    phone: '+34 981 585 700',
    address: 'Rúa do Hórreo, 1, 15701 Santiago de Compostela',
    mapUrl: 'https://maps.app.goo.gl/6tyogdk4KeQV8bE69',
    walkingDist: '10.3 km',
    ascent: 150, descent: 210, elevation: 260,
    desc: '抵達終點。歡慶廣場、朝聖者彌撒、Compostela 證書 — Buen Camino。',
    attractions: ['聖地亞哥大教堂', 'Praza do Obradoiro', '老城區巷弄']
  }
];

const ScallopMark = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none"
       stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
       strokeLinejoin="round" aria-hidden="true">
    <path d="M3 18 C3 10, 7 4, 12 4 C17 4, 21 10, 21 18 L19.5 20 L18 18 L16.5 20 L15 18 L13.5 20 L12 18 L10.5 20 L9 18 L7.5 20 L6 18 L4.5 20 Z" />
    <path d="M12 4 L12 18" />
    <path d="M8 5 L9.5 18" />
    <path d="M16 5 L14.5 18" />
    <path d="M5 8 L7 18" />
    <path d="M19 8 L17 18" />
  </svg>
);

const weatherInfo = (code) => {
  if (code === 0)        return { Icon: Sun,           label: '晴朗',     tint: 'text-saffron-bright' };
  if (code <= 2)         return { Icon: CloudSun,      label: '晴時多雲', tint: 'text-saffron' };
  if (code === 3)        return { Icon: Cloud,         label: '陰天',     tint: 'text-mute' };
  if (code <= 48)        return { Icon: CloudFog,      label: '霧',       tint: 'text-mute' };
  if (code <= 57)        return { Icon: CloudRain,     label: '毛毛雨',   tint: 'text-sky' };
  if (code <= 67)        return { Icon: CloudRain,     label: '陣雨',     tint: 'text-sky' };
  if (code <= 77)        return { Icon: Cloud,         label: '降雪',     tint: 'text-sky' };
  if (code <= 82)        return { Icon: CloudRain,     label: '雨天',     tint: 'text-sky' };
  if (code >= 95)        return { Icon: CloudLightning,label: '雷雨',     tint: 'text-clay' };
  return { Icon: Cloud, label: '多雲', tint: 'text-mute' };
};

const parseDistance = (str) => {
  const m = String(str).match(/(\d+\.?\d*)\s*km/i);
  if (m) return { kind: 'walk', value: m[1] };
  if (/^0\s*km/i.test(str)) return { kind: 'rest', value: '抵達休整' };
  return { kind: 'rest', value: str };
};

const App = () => {
  const [day, setDay] = useState(0);
  const [weather, setWeather] = useState({});
  const stripRef = useRef(null);

  useEffect(() => {
    const c = ITINERARY[day];
    if (weather[day]) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
        const data = await res.json();
        if (cancelled) return;
        setWeather(prev => ({
          ...prev,
          [day]: {
            temp: Math.round(data.current_weather.temperature),
            code: data.current_weather.weathercode,
            max: Math.round(data.daily.temperature_2m_max[0]),
            min: Math.round(data.daily.temperature_2m_min[0]),
          }
        }));
      } catch (e) {
        console.error('Weather fetch failed', e);
      }
    })();
    return () => { cancelled = true; };
  }, [day, weather]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const target = strip.querySelector(`[data-day="${day}"]`);
    if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [day]);

  const current = ITINERARY[day];
  const dist = parseDistance(current.walkingDist);
  const wx = weather[day];

  return (
    <div className="paper-glow min-h-dvh text-ink font-sans antialiased overflow-x-hidden">
      {/* Top chrome */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl bg-paper/75 border-b border-line/60"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="px-5 h-12 flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-ink">
            <ScallopMark className="w-5 h-5 text-saffron" />
            <span className="font-display italic font-medium text-[15px] leading-none">Camino</span>
            <span className="hidden sm:inline text-mute text-[10px] uppercase tracking-[0.24em] ml-1">de Santiago</span>
          </div>
          <div className="text-[10px] tabular-nums text-mute uppercase tracking-[0.24em]">
            DAY <span className="text-ink font-medium">{String(day + 1).padStart(2, '0')}</span>
            <span className="opacity-50"> / {String(ITINERARY.length).padStart(2, '0')}</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto pb-16" style={{ paddingBottom: 'max(4rem, env(safe-area-inset-bottom))' }}>
        {/* Day strip */}
        <nav
          ref={stripRef}
          className="no-scrollbar overflow-x-auto snap-x snap-mandatory pt-4 pb-1"
          aria-label="Itinerary days"
        >
          <div className="flex gap-2 px-5 w-max">
            {ITINERARY.map((d, i) => {
              const active = i === day;
              return (
                <button
                  key={i}
                  data-day={i}
                  onClick={() => setDay(i)}
                  className={`snap-start shrink-0 rounded-2xl px-4 py-2.5 text-left transition-all duration-300
                    ${active
                      ? 'bg-ink text-paper shadow-[0_8px_24px_-8px_rgba(26,26,26,0.25)]'
                      : 'bg-white text-ink border border-line hover:border-ink/40'}`}
                >
                  <div className={`text-[9px] uppercase tracking-[0.24em] ${active ? 'text-paper/55' : 'text-mute'}`}>
                    Day {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-display text-[14px] mt-0.5 whitespace-nowrap leading-tight">
                    {d.city}
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Hero — keyed to day for re-animation */}
        <section key={`hero-${day}`} className="px-5 pt-6 pb-7">
          <p className="text-[10px] tracking-[0.4em] uppercase text-saffron font-medium rise" style={{ animationDelay: '0ms' }}>
            {current.date}
          </p>
          <h1
            className="font-display font-medium text-[clamp(52px,15vw,92px)] leading-[0.92] tracking-[-0.03em] mt-3 rise"
            style={{ animationDelay: '70ms' }}
          >
            {current.city}
          </h1>
          <p className="text-mute text-[11px] uppercase tracking-[0.32em] mt-3 rise" style={{ animationDelay: '140ms' }}>
            {current.region}
          </p>
          <p
            className="font-display italic text-[clamp(17px,4.6vw,21px)] text-ink-soft leading-snug mt-5 max-w-md rise"
            style={{ animationDelay: '200ms' }}
          >
            {current.desc}
          </p>
        </section>

        {/* Hero distance */}
        <section key={`dist-${day}`} className="px-5">
          <div
            className="rounded-[28px] bg-white border border-line p-6 rise"
            style={{ animationDelay: '260ms' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-saffron">
                <Footprints className="w-4 h-4" strokeWidth={2.2} />
                <span className="text-[10px] uppercase tracking-[0.28em] font-medium">今日步行</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-mute tabular-nums">
                {current.date.split(' · ')[0]}
              </span>
            </div>
            {dist.kind === 'walk' ? (
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display font-medium text-[clamp(64px,21vw,116px)] leading-none tabular-nums tracking-[-0.045em]">
                  {dist.value}
                </span>
                <span className="font-sans text-mute text-[13px]">kilometres</span>
              </div>
            ) : (
              <div className="font-display italic text-[clamp(36px,11vw,56px)] leading-tight text-ink">
                {dist.value}
              </div>
            )}
          </div>
        </section>

        {/* Two-up: ascent/descent + elevation */}
        <section
          key={`alts-${day}`}
          className="px-5 mt-2 grid grid-cols-2 gap-2 rise"
          style={{ animationDelay: '320ms' }}
        >
          <div className="rounded-[24px] bg-white border border-line p-5">
            <div className="flex items-center gap-2 text-moss mb-3">
              <Mountain className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span className="text-[9px] uppercase tracking-[0.28em] font-medium">起伏</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-1.5">
                <ArrowUp className="w-3 h-3 text-clay" strokeWidth={2.5} />
                <span className="font-display text-[22px] tabular-nums leading-none">{current.ascent}</span>
                <span className="text-mute text-[11px]">m</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <ArrowDown className="w-3 h-3 text-moss" strokeWidth={2.5} />
                <span className="font-display text-[22px] tabular-nums leading-none">{current.descent}</span>
                <span className="text-mute text-[11px]">m</span>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] bg-white border border-line p-5">
            <div className="flex items-center gap-2 text-sky mb-3">
              <Compass className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span className="text-[9px] uppercase tracking-[0.28em] font-medium">海拔</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[36px] tabular-nums leading-none tracking-tight">
                {current.elevation}
              </span>
              <span className="text-mute text-[12px]">m</span>
            </div>
            <p className="text-[10px] text-mute mt-2 tracking-wide">當地海拔</p>
          </div>
        </section>

        {/* Weather */}
        <section
          key={`wx-${day}`}
          className="px-5 mt-2 rise"
          style={{ animationDelay: '380ms' }}
        >
          <div className="rounded-[24px] border border-line p-5 relative overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, var(--color-sky-soft) 0%, var(--color-paper-2) 50%, var(--color-saffron-soft) 100%)'
               }}>
            <div className="flex items-center gap-2 mb-4">
              <CloudSun className="w-3.5 h-3.5 text-sky" strokeWidth={2.2} />
              <span className="text-[10px] uppercase tracking-[0.28em] text-ink-soft font-medium">即時天氣</span>
            </div>
            {!wx ? (
              <div className="flex items-center gap-3 shimmer">
                <div className="h-14 w-24 bg-white/60 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-white/60 rounded" />
                  <div className="h-3 w-16 bg-white/60 rounded" />
                </div>
              </div>
            ) : (() => {
              const info = weatherInfo(wx.code);
              return (
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-start">
                      <span className="font-display font-medium text-[64px] leading-[0.85] tabular-nums">
                        {wx.temp}
                      </span>
                      <span className="font-display text-[22px] mt-1 ml-0.5">°</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-3 text-ink-soft">
                      <info.Icon className={`w-4 h-4 ${info.tint}`} strokeWidth={2} />
                      <span className="text-[13px]">{info.label}</span>
                    </div>
                  </div>
                  <div className="text-right tabular-nums space-y-1">
                    <div className="text-[12px] text-clay">高 {wx.max}°</div>
                    <div className="text-[12px] text-sky">低 {wx.min}°</div>
                    <div className="text-[9px] text-mute uppercase tracking-[0.2em] pt-1 opacity-70">Open-Meteo</div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Lodging */}
        <section
          key={`lodg-${day}`}
          className="px-5 mt-7 rise"
          style={{ animationDelay: '440ms' }}
        >
          <p className="text-[10px] uppercase tracking-[0.32em] text-mute mb-3 px-1">Lodging</p>
          <div className="rounded-[28px] bg-white border border-line p-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-saffron font-medium mb-2">今晚住宿</p>
            <h2 className="font-display font-medium text-[24px] leading-[1.18] tracking-tight">
              {current.accommodation}
            </h2>

            <div className="mt-5 space-y-3.5">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-mute mt-0.5 shrink-0" strokeWidth={1.8} />
                <p className="text-[13px] text-ink-soft leading-relaxed flex-1">{current.address}</p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-mute shrink-0" strokeWidth={1.8} />
                <a
                  href={`tel:${current.phone.replace(/\s/g, '')}`}
                  className="text-[13px] text-ink-soft tabular-nums"
                >
                  {current.phone}
                </a>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-[1fr_auto] gap-2">
              <a
                href={current.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-paper rounded-2xl py-3.5 px-5 flex items-center justify-center gap-2 text-[14px] font-medium active:scale-[0.98] transition-transform"
              >
                <Navigation className="w-4 h-4" strokeWidth={2} />
                Open in Maps
              </a>
              <a
                href={`tel:${current.phone.replace(/\s/g, '')}`}
                className="bg-paper-2 text-ink rounded-2xl py-3.5 px-4 flex items-center justify-center active:scale-[0.98] transition-transform border border-line/60"
                aria-label="撥打電話"
              >
                <Phone className="w-4 h-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section
          key={`hl-${day}`}
          className="px-5 mt-9 rise"
          style={{ animationDelay: '500ms' }}
        >
          <p className="text-[10px] uppercase tracking-[0.32em] text-mute mb-3 px-1">Highlights</p>
          <h2 className="font-display font-medium text-[28px] leading-tight tracking-tight mb-5">
            <span className="italic text-saffron">今日</span>亮點
          </h2>
          <ul className="flex flex-wrap gap-2">
            {current.attractions.map((a, i) => (
              <li
                key={i}
                className="bg-white border border-line rounded-full pl-3 pr-4 py-2 flex items-center gap-2 text-[13px] text-ink-soft"
              >
                <span className="w-1 h-1 rounded-full bg-saffron" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pilgrim notes */}
        <section className="px-5 mt-10">
          <div
            className="rounded-[24px] border border-line p-6"
            style={{ background: 'linear-gradient(135deg, var(--color-saffron-soft), var(--color-paper-2))' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-saffron" strokeWidth={2.2} />
              <span className="text-[10px] uppercase tracking-[0.28em] font-medium text-ink-soft">Buen Camino</span>
            </div>
            <p className="font-display italic text-[19px] leading-snug text-ink mb-5">
              跟隨黃色箭頭，<br/>走自己的步調。
            </p>
            <ul className="space-y-2.5 text-[13px] text-ink-soft leading-relaxed">
              <li className="flex gap-2.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-saffron shrink-0" />
                <span>Galicia 早晚潮濕，洋蔥式穿搭，防風外套常備。</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-saffron shrink-0" />
                <span>路標：黃色箭頭 / 扇貝圖騰皆指向 Santiago。</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-saffron shrink-0" />
                <span>Compostela 證書領取點：Rúa das Carretas, 33。</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Flight summary */}
        <section className="px-5 mt-6">
          <div className="rounded-[24px] bg-ink text-paper p-6">
            <div className="flex items-center gap-2 mb-5">
              <Plane className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span className="text-[10px] uppercase tracking-[0.28em] font-medium opacity-70">Flights</span>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] opacity-50 mb-2">Departure</p>
                <p className="font-display text-[15px] leading-tight tabular-nums">05/15 · TK125</p>
                <div className="text-[12px] opacity-75 tabular-nums mt-2 space-y-0.5">
                  <p>TPE&nbsp;&nbsp;09:35</p>
                  <p className="opacity-50">↓</p>
                  <p>MAD&nbsp;22:35</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] opacity-50 mb-2">Return</p>
                <p className="font-display text-[15px] leading-tight tabular-nums">05/25 · TK1860</p>
                <div className="text-[12px] opacity-75 tabular-nums mt-2 space-y-0.5">
                  <p>MAD&nbsp;18:25</p>
                  <p className="opacity-50">↓</p>
                  <p>TPE&nbsp;17:55<sup className="text-[8px]">+1</sup></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-5 mt-12">
          <div className="hairline mb-6" />
          <div className="flex items-center justify-between text-mute">
            <ScallopMark className="w-4 h-4 text-saffron" />
            <p className="font-display italic text-[12px] text-ink-soft">Buen Camino · 2026</p>
            <span className="text-[10px] tabular-nums tracking-widest uppercase">v2</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
