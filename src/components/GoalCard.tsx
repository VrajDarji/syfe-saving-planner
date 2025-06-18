"use client";
import { GoalProps, useExchangeRate, useModal } from "@/store";
import { CheckCircle, Plus } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/shallow";
import ContributionModal from "./modal/ContributionModal";
import { formatCurrency } from "@/utils/currencyFormatter";

interface GoalCardProps {
  goal: GoalProps;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const progressPercentage = Math.min((goal.saved / goal.target) * 100, 100);
  const remainingAmount = goal.target - goal.saved;

  // States
  const [setOpen] = useModal(useShallow((state) => [state.setOpen]));
  const [exchangeRate] = useExchangeRate(useShallow((state) => [state.rate]));

  if (!exchangeRate) {
    return <>Loading....</>;
  }

  const convertedCurrr =
    goal.currency === "usd"
      ? goal.target * exchangeRate
      : goal.target / exchangeRate;

  const isGoalReached = goal.saved >= goal.target;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
        <span
          className={`text-sm text-gray-900 ${
            isGoalReached ? "bg-emerald-200" : "bg-gray-100"
          } px-3 py-1 rounded-xl`}
        >
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <div className="mb-6">
        <div className="text-2xl font-bold text-blue-600 mb-1">
          {formatCurrency(goal.target, goal.currency)}
        </div>
        <div className="text-sm text-gray-500">
          {formatCurrency(
            convertedCurrr,
            goal.currency === "inr" ? "usd" : "inr"
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(goal.saved, goal.currency)} saved
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-gray-800 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{goal.contributions.length} contributions</span>
          <span>
            {!isGoalReached ? (
              <>{formatCurrency(remainingAmount, goal.currency)} remaining</>
            ) : (
              "Completed"
            )}
          </span>
        </div>
      </div>
      <button
        className="w-full flex items-center justify-center gap-2 py-2 px-4 border-2  border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors duration-200 shadow-2xs cursor-pointer disabled:cursor-not-allowed"
        onClick={() => setOpen(<ContributionModal goal={goal} />)}
        disabled={isGoalReached}
      >
        {!isGoalReached ? (
          <Plus className="w-4 h-4" />
        ) : (
          <CheckCircle className="w-4 h-4" />
        )}
        <span className="font-medium">
          {!isGoalReached ? "Add Contribution" : "Target Completed"}
        </span>
      </button>
    </div>
  );
};

export default GoalCard;
