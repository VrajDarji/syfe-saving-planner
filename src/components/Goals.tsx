"use client";

import { useGoalStore, useModal } from "@/store";
import { Plus } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/shallow";
import GoalCard from "./GoalCard";
import GoalModal from "./modal/GoalModal";

const Goals = () => {
  const [goals] = useGoalStore(useShallow((state) => [state.goals]));
  const [setOpen] = useModal(useShallow((state) => [state.setOpen]));
  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">Your Goals</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700/90 rounded-lg transition-colors duration-200 cursor-pointer"
          onClick={() => setOpen(<GoalModal />)}
        >
          <Plus className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">Add Goal</span>
        </button>
      </div>
      {goals.length === 0 && (
        <div className="w-full flex items-center justify-center">
          <p className="text-gray-700 font-medium text-xl">
            Start adding goals to track them.
          </p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {goals.map((goal, index: number) => (
          <GoalCard goal={goal} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Goals;
