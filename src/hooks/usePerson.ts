import { create } from "zustand";
import { persist } from "zustand/middleware";
type State = {
  firstName: string;
  lastName: string;
};

type Action = {
  updateFirstName: (firstName: State["firstName"]) => void;
  updateLastName: (lastName: State["lastName"]) => void;
};

export const usePersonStore = create<State & Action>()(
  persist(
    (set) => ({
      firstName: "Messi",
      lastName: "Ronaldo",
      updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
      updateLastName: (lastName) => set(() => ({ lastName: lastName })),
    }),
    {
      name: "person-name-storage",
    }
  )
);
