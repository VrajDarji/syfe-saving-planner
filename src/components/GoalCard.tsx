"use client";
import { GoalProps } from "@/store";
import React from "react";
import { Plus } from "lucide-react";

interface GoalCardProps {
  goal: GoalProps;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const progressPercentage = (goal.saved / goal.target) * 100;
  const remainingAmount = goal.target - goal.saved;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Trip to Japan</h3>
        <span className="text-sm text-gray-900 bg-gray-100 px-3 py-1 rounded-xl">
          {Math.round(progressPercentage)}%
        </span>
      </div>

      {/* Goal Amount */}
      <div className="mb-6">
        <div className="text-2xl font-bold text-blue-600 mb-1">
          ${goal.target.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">
          ₹{(goal.target * 85.52).toLocaleString()}
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-900">
            ${goal.saved} saved
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-gray-800 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{goal.contributions.length} contributions</span>
          <span>${remainingAmount.toLocaleString()} remaining</span>
        </div>
      </div>

      {/* Add Contribution Button */}
      <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border-2  border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors duration-200 shadow-2xs">
        <Plus className="w-4 h-4" />
        <span className="font-medium">Add Contribution</span>
      </button>
    </div>
  );
};

export default GoalCard;
