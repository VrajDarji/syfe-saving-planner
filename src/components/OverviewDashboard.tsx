"use client";
import { useExchangeRate, useGoalStore } from "@/store";
import axios from "axios";
import {
  Calendar,
  PiggyBank,
  RefreshCcw,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

const OverviewDashboard = () => {
  // States
  const [goals] = useGoalStore(useShallow((state) => [state.goals]));
  const [overviewData, setOverviewData] = useState<{
    target: number | null;
    saved: number | null;
  }>({ target: null, saved: null });
  const [fetchingRate, setFetchingRate] = useState<boolean>(false);
  const [exchangeRate, setExchangeRate, lastUpdated, setLastUpdated] =
    useExchangeRate(
      useShallow((state) => [
        state.rate,
        state.setRate,
        state.lastUpdated,
        state.setLastUpdated,
      ])
    );

  // Fn to fetch rate
  const fetchLatestRate = async () => {
    try {
      setFetchingRate(true);
      const URL =
        "https://v6.exchangerate-api.com/v6/" +
        process.env.NEXT_PUBLIC_EXCHANGE_RATE_API +
        "/latest/USD";
      const { data } = await axios.get(URL);

      const { conversion_rates } = data;
      const INR = conversion_rates["INR"];

      setExchangeRate(INR);
      setFetchingRate(false);
      setLastUpdated(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date())
      );
    } catch (error) {
      setFetchingRate(false);
      console.log("Error fetching rates : ", error);
    }
  };

  useEffect(() => {
    let target = 0;
    let saved = 0;
    // Total target and saved calculation
    goals.map((goal) => {
      target +=
        goal.currency === "inr" ? goal.target : goal.target * exchangeRate;
      saved += goal.currency === "inr" ? goal.saved : goal.saved * exchangeRate;
    });

    setOverviewData({ target, saved });
  }, [goals, exchangeRate]);

  useEffect(() => {
    if (!exchangeRate) {
      fetchLatestRate();
    }
  }, []);

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5" />
            <h1 className="text-lg font-medium">Financial Overview</h1>
          </div>
          <button
            className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200 cursor-pointer"
            onClick={fetchLatestRate}
          >
            <RefreshCcw
              className={`w-4 h-4 ${fetchingRate ? "animate-spin" : ""}`}
            />
            <span className="text-sm font-medium">
              {fetchingRate ? "Fetching Rates" : "Refresh Rates"}
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white/80">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">Total Targets</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold">
                ₹{overviewData.target?.toLocaleString("en-IN")}
              </div>
              <div className="text-white/70 text-sm">
                ${((overviewData.target || 0) / exchangeRate).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white/80">
              <Wallet className="w-5 h-5" />
              <span className="text-sm font-medium">Total Saved</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold">
                ₹{overviewData.saved?.toLocaleString("en-IN")}
              </div>
              <div className="text-white/70 text-sm">
                ${((overviewData.saved || 0) / exchangeRate).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Overall Progress</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold">
                {overviewData.saved && overviewData.target ? (
                  <>
                    {((overviewData.saved / overviewData.target) * 100).toFixed(
                      2
                    )}
                    %
                  </>
                ) : (
                  "0%"
                )}
              </div>
              <div className="text-white/70 text-sm">
                Total goals completion
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-3 items-center text-sm text-white/70 border-t-[1px] border-white/70">
          <div>Exchange Rate: 1 USD = ₹ {exchangeRate}</div>
          <div>Last updated: {lastUpdated}</div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
