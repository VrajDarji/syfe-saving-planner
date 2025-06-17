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
};

export const useGoalStore = create<useGoalStoreProps>()(
  persist<useGoalStoreProps>(
    (set) => ({
      goals: [],
      setGoals: (goal: GoalProps) =>
        set((state) => ({ goals: [...state.goals, goal] })),
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
