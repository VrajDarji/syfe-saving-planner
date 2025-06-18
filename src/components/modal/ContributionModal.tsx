"use client";
import { GoalProps, useGoalStore, useModal } from "@/store";
import { DollarSign, IndianRupee } from "lucide-react";
import React, { useState } from "react";
import { useShallow } from "zustand/shallow";
import Dialog from "./Dialog";

interface ContributionModalProps {
  goal: GoalProps;
}

const ContributionModal: React.FC<ContributionModalProps> = ({ goal }) => {
  const [isOpen, setClose] = useModal(
    useShallow((state) => [state.isOpen, state.setClose])
  );

  const [updateGoal] = useGoalStore(useShallow((state) => [state.updateGoal]));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [goalData, setGoalData] = useState<{
    date: string;
    target: number | null;
  }>({ date: new Date().toISOString().split("T")[0], target: null });

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const prevCont = goal.contributions;
    //  Update contribution
    prevCont.push({ val: goalData.target || 0, date: goalData.date });
    const data: Partial<GoalProps> = {
      contributions: prevCont,
    };
    updateGoal(goal.id, data);
    setIsLoading(false);
    setClose();
    console.log({ goalData });
  };
  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal points
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setGoalData((prev) => ({
        ...prev,
        target: value === "" ? null : Number.parseFloat(value) || null,
      }));
    }
  };
  console.log({ d: goalData.date });

  return (
    <Dialog isOpen={isOpen} setOpenChange={setClose}>
      <div className="w-full max-w-md border-0">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Add Contribution
          </h1>
          <p className="text-sm text-gray-500">
            Enter the amount and date to update your savings progress.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="value"
                className="block text-sm font-medium text-gray-700"
              >
                Contribution Amount
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="value"
                  placeholder="0.00"
                  required
                  value={goalData.target || ""}
                  onChange={handleTargetChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900">
                  {goal.currency === "usd" ? (
                    <DollarSign className="h-4 w-4" />
                  ) : (
                    <IndianRupee className="h-4 w-4" />
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date Added
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  required
                  value={goalData.date || ""}
                  onChange={(e) =>
                    setGoalData((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full pr-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={setClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!goalData.date || !goalData.target}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Creating Goal.." : "Create Goal"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default ContributionModal;
