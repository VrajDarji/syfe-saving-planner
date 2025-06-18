import Goals from "@/components/Goals";
import OverviewDashboard from "@/components/OverviewDashboard";
import { Target } from "lucide-react";

export default function Home() {
  return (
    <div className="relative w-full h-full flex flex-col gap-y-8">
      <div className="w-full flex flex-col gap-y-1.5 items-center justify-center">
        <h1 className="text-2xl md:text-4xl font-bold flex gap-x-1 items-center tracking-normal">
          <Target className="text-blue-700" />
          Syfe Saving Planner
        </h1>
        <p className="text-sm text-gray-400 font-medium">
          Track your financial goals and build your future
        </p>
      </div>
      <OverviewDashboard />
      <Goals />
    </div>
  );
}
