import { create } from "zustand";

export interface Student {
  name: string;
  address: string;
  type_class: number;
}

interface StudentState {
  students: Student[];
  add: (data: Student) => void;
}

export const useStudentStore = create<StudentState>()((set, get, state) => ({
  students: [],
  add: (data: Student) =>
    set(state => ({
      students: [data, ...state.students],
    })),
}));
