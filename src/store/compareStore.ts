import { create } from "zustand";

type College = {
  id: number;
  name: string;
  location: string;
  fees: string;
  rating: number;
  placements: string;
};

type CompareStore = {
  comparedColleges: College[];

  addCollege: (college: College) => void;

  removeCollege: (id: number) => void;
};

export const useCompareStore = create<CompareStore>((set) => ({
  comparedColleges: [],

  addCollege: (college) =>
    set((state) => {
      const alreadyExists = state.comparedColleges.find(
        (item) => item.id === college.id,
      );

      if (alreadyExists || state.comparedColleges.length >= 3) {
        return state;
      }

      return {
        comparedColleges: [...state.comparedColleges, college],
      };
    }),

  removeCollege: (id) =>
    set((state) => ({
      comparedColleges: state.comparedColleges.filter(
        (college) => college.id !== id,
      ),
    })),
}));
