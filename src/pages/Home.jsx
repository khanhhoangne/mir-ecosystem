import { useEffect, useState } from "react";
import { FiUpload, FiDownload, FiSend, FiUser, FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendDown, faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";


export default function Home() {
  const [markets, setMarkets] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const actions = [
    { label: "Deposit", icon: <FiUpload size={18} /> },
    { label: "Withdraw", icon: <FiDownload size={18} /> },
    { label: "Internal Transfer", icon: <FiSend size={18} /> },
    { label: "Membership Upgrade", icon: <FiUser size={18} /> },
  ];

  const coinPairs = ["BTCUSDT", "ETHUSDT", "DOGEUSDT", "BNBUSDT", "ADAUSDT", "SOLUSDT"];

  const coinLogos = {
    BTCUSDT: "https://assets.coincap.io/assets/icons/btc@2x.png",
    ETHUSDT: "https://assets.coincap.io/assets/icons/eth@2x.png",
    DOGEUSDT: "https://assets.coincap.io/assets/icons/doge@2x.png",
    BNBUSDT: "https://assets.coincap.io/assets/icons/bnb@2x.png",
    ADAUSDT: "https://assets.coincap.io/assets/icons/ada@2x.png",
    SOLUSDT: "https://assets.coincap.io/assets/icons/sol@2x.png",
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: price < 1 ? 6 : 2,
      maximumFractionDigits: 8,
    }).format(price);

  const fetchBinanceData = async () => {
    try {
      const res = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(coinPairs))}`
      );
      const data = await res.json();
      const formatted = data.map((m) => {
        const changePercent = parseFloat(m.priceChangePercent);
        return {
          pair: m.symbol.replace("USDT", "/USDT"),
          price: parseFloat(m.lastPrice),
          change: `${changePercent.toFixed(2)}%`,
          color: changePercent >= 0 ? "text-green-400" : "text-red-400",
          icon:
            changePercent >= 0 ? (
              <FiArrowUpRight className="text-green-400" />
            ) : (
              <FiArrowDownLeft className="text-red-400" />
            ),
        };
      });
      setMarkets(formatted);
      if (initialLoading) setInitialLoading(false); // tắt overlay lần đầu
    } catch (error) {
      console.error("Binance fetch error:", error);
      if (initialLoading) setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchBinanceData();
    const interval = setInterval(fetchBinanceData, 2000);
    return () => clearInterval(interval);
  }, []);

  // Shimmer placeholder cho card
  const ShimmerCard = () => (
    <div className="p-4 bg-[#121a3a] rounded-xl shadow flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-600"></div>
        <div className="space-y-1">
          <div className="w-20 h-4 bg-gray-600 rounded"></div>
          <div className="w-16 h-6 bg-gray-500 rounded"></div>
        </div>
      </div>
      <div className="w-12 h-6 bg-gray-600 rounded"></div>
    </div>
  );

  return (
    <div className="space-y-8 relative pb-28 lg:pb-0">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#101738]">
        <img
          src="https://wallpapercave.com/wp/wp11484809.jpg"
          className="w-full h-56 object-cover"
          alt="banner"
        />
        {/* Overlay bóng mờ ở rìa */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/40 via-transparent to-black/40 pointer-events-none"></div>
      </div>


      {/* Action buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        {actions.map((item, i) => (
          <Link
            key={i}
            to={
              item.label === "Deposit" ? "/deposit" :
                item.label === "Withdraw" ? "/withdraw" :
                  item.label === "Internal Transfer" ? "/transfer" :
                    item.label === "Membership" ? "/account" :
                      "/"
            }
            className="p-4 bg-[#121a3a] rounded-xl text-xs lg:text-sm font-semibold text-gray-200 
                 hover:bg-purple-600 transition cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>


      {/* Quick Market Boxes */}
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-200">TOP Market</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialLoading
          ? Array(3).fill(0).map((_, i) => <ShimmerCard key={i} />)
          : markets.slice(0, 3).map((m, index) => (
            <div
              key={index}
              className="p-4 bg-[#121a3a] rounded-xl shadow hover:bg-[#182045] transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-linear-to-br from-purple-600 to-pink-500 text-white font-bold">
                  {m.pair.startsWith("BTC")
                    ? "₿"
                    : m.pair.startsWith("ETH")
                      ? "⟠"
                      : m.pair.startsWith("DOGE")
                        ? "Ð"
                        : "💰"}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{m.pair}</p>
                  <p className="text-lg mt-1 font-bold">
                    {formatPrice(m.price)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold">
                <strong className={m.color}>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    {parseFloat(m.change) >= 0 ? (
                      <FontAwesomeIcon icon={faArrowTrendUp} className="text-green-400 w-5 h-5" />
                    ) : (
                      <FontAwesomeIcon icon={faArrowTrendDown} className="text-red-400 w-5 h-5" />
                    )}
                    <strong className={parseFloat(m.change) >= 0 ? "text-green-400" : "text-red-400"}>
                      {m.change}
                    </strong>
                  </div>
                </strong>
              </div>
            </div>
          ))}
      </div>

      {/* USDT Market Section */}
      <div className="mt-10">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-200">USDT Market</h2>
        <div className="bg-[#121a3a] rounded-2xl p-4 shadow-lg divide-y divide-white/10">
          {initialLoading
            ? Array(6).fill(0).map((_, i) => <ShimmerCard key={i} />)
            : markets.map((m, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 hover:bg-[#182045] transition rounded-lg px-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={coinLogos[m.pair.replace("/", "")]}
                    alt={m.pair}
                    className="w-8 h-8"
                  />
                  <div>
                    <p className="font-normal text-gray-100">{m.pair}</p>
                    <p className="text-xs text-gray-400">Latest Price</p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-1 justify-end">
                  {m.icon}
                  <p className={`font-bold ${m.color}`}>{formatPrice(m.price)}</p>
                  <strong className={`text-xs ${m.color}`}>{m.change}</strong>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
