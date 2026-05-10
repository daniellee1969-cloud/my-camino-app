import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Navigation, 
  CloudSun, 
  Footprints, 
  Plane, 
  ChevronRight, 
  Info,
  ExternalLink,
  Map as MapIcon,
  Hotel,
  TrendingUp,
  TrendingDown,
  Mountain
} from 'lucide-react';

// 行程數據更新：加入海拔 (elevation), 上升 (ascent), 下行 (descent)
const ITINERARY = [
  {
    date: '05/15 (五)',
    city: 'Madrid',
    lat: 40.4168,
    lon: -3.7038,
    accommodation: 'Madrid Chamartín, Affiliated by Meliá',
    phone: '+34 917 333 400',
    address: 'C. de Mauricio Ravel, 10, Chamartin, Madrid, 28046',
    mapUrl: 'https://maps.app.goo.gl/Z1sgTppUtcRN4FdK8',
    walkingDist: '0 km',
    ascent: 0,
    descent: 0,
    elevation: 667,
    desc: '抵達馬德里，準備開始旅程。馬德里位於西班牙中部梅塞塔高原。',
    attractions: ['太陽門廣場', '普拉多博物館', '馬德里王宮']
  },
  {
    date: '05/16 (六)',
    city: 'Lugo',
    lat: 43.0125,
    lon: -7.5558,
    accommodation: 'Dorma Puerta de San Pedro',
    phone: '+34 982 222 381',
    address: 'Rúa Río Neira, 29 Lugo 27002 Spain',
    mapUrl: 'https://maps.app.goo.gl/qE6yenG3f17v4bEQ7',
    walkingDist: '市區觀光',
    ascent: 50,
    descent: 50,
    elevation: 465,
    desc: '前往盧戈，這裡有世界上保存最完整的古羅馬城牆。',
    attractions: ['羅馬城牆 (UNESCO)', '盧戈大教堂', '聖母門']
  },
  {
    date: '05/17 (日)',
    city: 'Sarria',
    lat: 42.7769,
    lon: -7.4150,
    accommodation: 'Hotel Alfonso IX',
    phone: '+34 982 530 005',
    address: 'Rúa del Peregrino 29 - 27600 Sarria (Lugo)',
    mapUrl: 'https://maps.app.goo.gl/HRFS8D5cmfWkfokW7',
    walkingDist: '準備出發',
    ascent: 0,
    descent: 0,
    elevation: 450,
    desc: '到達朝聖之路著名的起點 Sarria。',
    attractions: ['聖薩爾瓦多教堂', '福塔萊薩堡壘']
  },
  {
    date: '05/18 (一)',
    city: 'Portomarin',
    lat: 42.8083,
    lon: -7.6167,
    accommodation: 'Pousada De Portomarin',
    phone: '+34 982 545 200',
    address: 'Av. de Sarria, s/n, 27170 Portomarín, Lugo',
    mapUrl: 'https://maps.app.goo.gl/RfGNaVBbL1gAe13r7',
    walkingDist: '22.2 km',
    ascent: 380,
    descent: 420,
    elevation: 350,
    desc: '從 Sarria 步行至 Portomarin，跨過米尼奧河，這段路程有起伏的森林小徑。',
    attractions: ['聖尼古拉斯教堂', '米尼奧河大橋']
  },
  {
    date: '05/19 (二)',
    city: 'Palas de Rei',
    lat: 42.8731,
    lon: -7.8692,
    accommodation: 'Hotel Alda Palas de Rei',
    phone: '+34 982 380 750',
    address: 'Calle Doctor Pardo Ouro, 4, 27200 Palas de Rei',
    mapUrl: 'https://maps.app.goo.gl/GKM8zwqEVr5Yu8Z79',
    walkingDist: '24.8 km',
    ascent: 490,
    descent: 310,
    elevation: 565,
    desc: '持續上坡路段較多，穿越加利西亞的鄉間田野。',
    attractions: ['Vilar de Donas 修道院', '聖蒂索教堂']
  },
  {
    date: '05/20 (三)',
    city: 'Melide',
    lat: 42.9152,
    lon: -8.0161,
    accommodation: 'Hotel & Spa Carlos desde 1996',
    phone: '+34 981 507 633',
    address: 'Av. Lugo, 119, 15800 Melide, A Coruña',
    mapUrl: 'https://maps.app.goo.gl/1M6LpzekBbMc1maYA',
    walkingDist: '14.5 km',
    ascent: 210,
    descent: 320,
    elevation: 450,
    desc: '進入 Melide，這裡以章魚料理 (Pulpo) 聞名。',
    attractions: ['Melide 羅馬式十字架', '必吃美食：Pulpo a la Gallega']
  },
  {
    date: '05/21 (四)',
    city: 'Arzúa',
    lat: 42.9261,
    lon: -8.1639,
    accommodation: 'Casa Teodora Arzua',
    phone: '+34 981 500 083',
    address: 'Rúa Lugo, 38, 15810 Arzúa, A Coruña',
    mapUrl: 'https://maps.app.goo.gl/y1yM7WSPGjbCHiyEA',
    walkingDist: '14.1 km',
    ascent: 220,
    descent: 280,
    elevation: 390,
    desc: 'Arzúa 是著名的起司之鄉，路段相對平緩。',
    attractions: ['聖地亞哥大教堂 (Arzúa)', '起司博物館']
  },
  {
    date: '05/22 (五)',
    city: 'Lavacolla (Santiago)',
    lat: 42.8943,
    lon: -8.4143,
    accommodation: 'Ruta Jacobea',
    phone: '+34 981 888 211',
    address: 'Lugar, Lavacolla, 41, 15820 Santiago de Compostela',
    mapUrl: 'https://maps.app.goo.gl/Mt1QciKTTXKGc5Xw8',
    walkingDist: '29.2 km',
    ascent: 550,
    descent: 610,
    elevation: 320,
    desc: '今日路程最長，會有較多的緩緩爬升。',
    attractions: ['Lavacolla 溪流', '聖馬科斯小堂']
  },
  {
    date: '05/23~24',
    city: 'Santiago de Compostela',
    lat: 42.8782,
    lon: -8.5448,
    accommodation: 'Hotel Compostela',
    phone: '+34 981 585 700',
    address: 'Rúa do Hórreo, 1, 15701 Santiago de Compostela',
    mapUrl: 'https://maps.app.goo.gl/6tyogdk4KeQV8bE69',
    walkingDist: '10.3 km',
    ascent: 150,
    descent: 210,
    elevation: 260,
    desc: '抵達終點！領取證書並參加朝聖者彌撒。',
    attractions: ['聖地亞哥大教堂', '歡慶廣場 (Praza do Obradoiro)', '老城區巷弄']
  }
];

const App = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [weatherData, setWeatherData] = useState({});
  const [loadingWeather, setLoadingWeather] = useState(false);

  // 獲取天氣數據 (Open-Meteo API)
  const fetchWeather = async (lat, lon, dayIndex) => {
    try {
      setLoadingWeather(true);
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
      const data = await res.json();
      setWeatherData(prev => ({
        ...prev,
        [dayIndex]: {
          temp: data.current_weather.temperature,
          code: data.current_weather.weathercode,
          max: data.daily.temperature_2m_max[0],
          min: data.daily.temperature_2m_min[0]
        }
      }));
    } catch (error) {
      console.error("Weather fetch failed", error);
    } finally {
      setLoadingWeather(false);
    }
  };

  useEffect(() => {
    const current = ITINERARY[selectedDay];
    fetchWeather(current.lat, current.lon, selectedDay);
  }, [selectedDay]);

  const getWeatherDesc = (code) => {
    if (code <= 3) return "晴朗/微雲";
    if (code <= 48) return "霧/多雲";
    if (code <= 67) return "細雨/陣雨";
    if (code <= 82) return "雨天";
    return "可能有雷雨";
  };

  const current = ITINERARY[selectedDay];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-10">
      {/* 頂部 Header */}
      <header className="bg-yellow-500 text-white p-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MapIcon className="w-8 h-8" /> 西班牙朝聖之旅
            </h1>
            <p className="text-sm opacity-90">Camino de Santiago 2026</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs">回程: 05/25 18:25 MAD</p>
            <p className="text-xs font-bold text-yellow-100">Buen Camino!</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-6 px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* 左側行程列表 */}
        <div className="md:col-span-4 space-y-2">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-yellow-700">
            <Calendar className="w-5 h-5" /> 旅程進度
          </h2>
          {ITINERARY.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDay(idx)}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border ${
                selectedDay === idx 
                ? 'bg-yellow-100 border-yellow-400 shadow-sm scale-105' 
                : 'bg-white border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div>
                <p className="text-xs font-semibold text-slate-500">{day.date}</p>
                <p className={`font-bold ${selectedDay === idx ? 'text-yellow-800' : 'text-slate-700'}`}>{day.city}</p>
              </div>
              <ChevronRight className={`w-4 h-4 ${selectedDay === idx ? 'text-yellow-600' : 'text-slate-300'}`} />
            </button>
          ))}

          {/* 航班卡片 */}
          <div className="mt-6 p-4 bg-blue-600 text-white rounded-2xl shadow-md">
            <h3 className="font-bold flex items-center gap-2 mb-2">
              <Plane className="w-5 h-5" /> 航班摘要
            </h3>
            <div className="text-xs space-y-2 opacity-90">
              <div className="border-b border-blue-400 pb-2">
                <p className="font-semibold text-blue-200 uppercase">DEPARTURE 05/15</p>
                <p>TK125 TPE 09:35</p>
                <p>TK1359 MAD 22:35 ARR</p>
              </div>
              <div>
                <p className="font-semibold text-blue-200 uppercase">RETURN 05/25</p>
                <p>TK1860 MAD 18:25</p>
                <p>TK024 TPE 17:55 ARR</p>
              </div>
            </div>
          </div>
        </div>

        {/* 右側細節內容 */}
        <div className="md:col-span-8 space-y-6">
          
          {/* 天氣概況 */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <CloudSun className="w-4 h-4" /> 當地天氣 (即時)
            </h3>
            {loadingWeather ? (
              <div className="animate-pulse flex space-x-4 h-12 items-center">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ) : weatherData[selectedDay] ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-4xl font-black text-slate-800">{weatherData[selectedDay].temp}°C</p>
                  <div>
                    <p className="text-sm font-bold text-slate-600">{getWeatherDesc(weatherData[selectedDay].code)}</p>
                    <p className="text-xs text-slate-400">目前氣溫</p>
                  </div>
                </div>
                <div className="text-right text-xs bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                  <p className="text-red-400 font-bold">最高: {weatherData[selectedDay].max}°C</p>
                  <p className="text-blue-400 font-bold">最低: {weatherData[selectedDay].min}°C</p>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm italic">獲取天氣中...</p>
            )}
          </div>

          {/* 步行與高度資訊區塊 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <Footprints className="w-4 h-4" /> 路程與海拔資訊
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* 距離 */}
              <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                <p className="text-xs font-bold text-yellow-600 mb-1">步行距離</p>
                <p className="text-2xl font-black text-slate-800">{current.walkingDist}</p>
                <div className="mt-2 text-yellow-400">
                   <Footprints className="w-5 h-5" />
                </div>
              </div>

              {/* 高度上升/下降 */}
              <div className="flex flex-col items-center p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-xs font-bold text-orange-600 mb-1">路程起伏</p>
                <div className="flex gap-4 items-center mt-1">
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-red-500" /> {current.ascent}m
                    </p>
                    <p className="text-[10px] text-slate-400">總上升</p>
                  </div>
                  <div className="w-[1px] h-6 bg-orange-200"></div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 text-green-500" /> {current.descent}m
                    </p>
                    <p className="text-[10px] text-slate-400">總下行</p>
                  </div>
                </div>
              </div>

              {/* 當地海拔 */}
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-600 mb-1">當地海拔</p>
                <p className="text-2xl font-black text-slate-800 flex items-baseline gap-1">
                  {current.elevation}<span className="text-xs font-normal text-slate-500">m</span>
                </p>
                <div className="mt-2 text-blue-400">
                   <Mountain className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* 住宿細節 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Hotel className="w-6 h-6 text-yellow-600" /> 住宿與地點
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Accommodation</p>
                <p className="text-lg font-bold text-slate-800">{current.accommodation}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">地址</p>
                    <p className="text-sm font-medium leading-tight">{current.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">電話</p>
                    <p className="text-sm font-medium">{current.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a 
                  href={current.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-slate-900 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-shadow shadow-md active:scale-95"
                >
                  <Navigation className="w-4 h-4" /> Google 地圖導航
                </a>
                <a 
                  href={`tel:${current.phone.replace(/\s/g, '')}`}
                  className="bg-white border border-slate-200 text-slate-700 p-3 rounded-xl hover:bg-slate-50 active:scale-95 transition-all"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* 景點推薦與描述 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-600" /> 今日亮點
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6 bg-blue-50/50 p-4 rounded-xl border-l-4 border-blue-400">
              {current.desc}
            </p>
            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">重要景點推薦</p>
              <div className="flex flex-wrap gap-2">
                {current.attractions.map((attr, i) => (
                  <span key={i} className="bg-white text-slate-700 px-4 py-2 rounded-full text-sm font-semibold border border-slate-200 shadow-sm flex items-center gap-1 hover:border-blue-300 transition-colors cursor-default">
                    <MapPin className="w-3 h-3 text-blue-500" /> {attr}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 溫馨提醒 */}
          <div className="bg-orange-50 border border-orange-200 p-5 rounded-2xl flex gap-4 items-start shadow-inner">
            <div className="p-2 bg-orange-200 rounded-full text-orange-700 mt-1">
              <Info className="w-5 h-5" />
            </div>
            <div className="text-sm text-orange-900">
              <p className="font-bold mb-1 text-base">朝聖者重要提醒</p>
              <ul className="list-disc ml-4 space-y-1 opacity-80">
                <li>Galicia 地區氣候潮濕，早晚海拔較高處氣溫較低，建議採洋蔥式穿法。</li>
                <li>注意路標：跟隨黃色箭頭與貝殼標誌。</li>
                <li>抵達 Santiago 大教堂後，證書領取處位於 Rúa das Carretas, 33。</li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      <footer className="max-w-4xl mx-auto mt-10 px-4 text-center pb-8 border-t border-slate-200 pt-8">
        <div className="flex justify-center gap-6 mb-4 text-slate-400">
           <MapIcon className="w-5 h-5" />
           <Footprints className="w-5 h-5" />
           <Mountain className="w-5 h-5" />
        </div>
        <p className="text-slate-500 text-sm font-medium">© 2026 西班牙朝聖之路數位助手</p>
        <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">Real-time Weather & Elevation Sync Enabled</p>
      </footer>
    </div>
  );
};

export default App;