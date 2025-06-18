"use client";
import { GoalProps, useGoalStore, useModal } from "@/store";
import React, { useState } from "react";
import { useShallow } from "zustand/shallow";
import Dialog from "./Dialog";
import { DollarSign, IndianRupee } from "lucide-react";

const GoalModal = () => {
  const [isOpen, setClose] = useModal(
    useShallow((state) => [state.isOpen, state.setClose])
  );
  const [setGoal] = useGoalStore(useShallow((state) => [state.setGoals]));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [goalData, setGoalData] = useState<{
    name: string;
    currency: "usd" | "inr";
    target: number | null;
  }>({ name: "", currency: "inr", target: null });

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    // New Goal data
    const data: GoalProps = {
      id: `${goalData.name}-${goalData.currency}-${
        goalData.target
      }-${new Date().toISOString()}`,
      title: goalData.name,
      target: goalData.target || 0,
      contributions: [],
      saved: 0,
      currency: goalData.currency,
    };
    setGoal(data);
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

  return (
    <Dialog isOpen={isOpen} setOpenChange={setClose}>
      <div className="w-full max-w-md border-0">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Goal</h1>
          <p className="text-sm text-gray-500">
            Set a financial target to keep track of your progress.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Target Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="e.g., Emergency Fund, Vacation, New Car"
                required
                value={goalData.name}
                onChange={(e) =>
                  setGoalData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="value"
                  className="block text-sm font-medium text-gray-700"
                >
                  Target Amount
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
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {goalData.currency === "usd" ? (
                      <DollarSign className="h-4 w-4" />
                    ) : (
                      <IndianRupee className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <div className="flex rounded-md border border-gray-300 overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setGoalData((prev) => ({ ...prev, currency: "inr" }))
                    }
                    className={`flex-1 px-3 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                      goalData.currency === "inr"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <IndianRupee className="h-4 w-4" />
                    INR
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setGoalData((prev) => ({ ...prev, currency: "usd" }))
                    }
                    className={`flex-1 px-3 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-1 border-l border-gray-300 cursor-pointer ${
                      goalData.currency === "usd"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <DollarSign className="h-4 w-4" />
                    USD
                  </button>
                </div>
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
                disabled={!goalData.name || !goalData.target}
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

export default GoalModal;
