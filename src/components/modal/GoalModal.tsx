"use client";
import { useModal } from "@/store";
import React from "react";
import { useShallow } from "zustand/shallow";
import Dialog from "./Dialog";

const GoalModal = () => {
  const [isOpen, setClose] = useModal(
    useShallow((state) => [state.isOpen, state.setClose])
  );
  return (
    <Dialog isOpen={isOpen} setOpenChange={setClose}>
      GoalModal
    </Dialog>
  );
};

export default GoalModal;
