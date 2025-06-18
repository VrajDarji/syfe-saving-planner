import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GoalProps = {
  id: string;
  title: string;
  target: number;
  currency: "inr" | "usd";
  contributions: { val: number; date: string }[];
  saved: number;
};

type useGoalStoreProps = {
  goals: GoalProps[];
  setGoals: (goal: GoalProps) => void;
  updateGoal: (goalId: string, data: Partial<GoalProps>) => void;
};

export const useGoalStore = create<useGoalStoreProps>()(
  persist<useGoalStoreProps>(
    (set) => ({
      goals: [],
      setGoals: (goal: GoalProps) =>
        set((state) => ({ goals: [...state.goals, goal] })),
      updateGoal: (id: string, data: Partial<GoalProps>) =>
        set((state) => ({
          goals: state.goals.map((goal) => {
            if (goal.id !== id) {
              return goal;
            }
            const updatedContributions =
              data.contributions ?? goal.contributions;

            const updatedSaved = updatedContributions.reduce(
              (acc, curr) => acc + curr.val,
              0
            );

            return {
              ...goal,
              ...data,
              contributions: updatedContributions,
              saved: updatedSaved,
            };
          }),
        })),
    }),
    { name: "goals-store" }
  )
);

type ModalContextType = {
  isOpen: boolean;
  modal: React.ReactNode | null;
  setOpen: (modal: React.ReactNode) => void;
  setClose: () => void;
};

export const useModal = create<ModalContextType>((set) => ({
  data: {},
  isOpen: false,
  modal: null,
  setOpen: async (modal: React.ReactNode) => {
    if (modal) {
      set({ isOpen: true, modal });
    }
  },
  setClose: () => set({ isOpen: false, modal: null }),
}));

type useTypeExchangeRate = {
  rate: number;
  lastUpdated: string;
  setRate: (rate: number) => void;
  setLastUpdated: (time: string) => void;
};

export const useExchangeRate = create<useTypeExchangeRate>()(
  persist(
    (set) => ({
      rate: 85.32,
      lastUpdated: "",
      setRate: (rate: number) => set({ rate }),
      setLastUpdated: (time: string) => set({ lastUpdated: time }),
    }),
    {
      name: "exchange-rate-store",
    }
  )
);
