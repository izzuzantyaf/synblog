import { StateCreator, create } from "zustand";

export interface Student {
  name: string;
  address: string;
  type_class: number;
}

export interface StudentState {
  students: Student[];
  addStudent: (data: Student) => void;
}

export const createStudentSlice: StateCreator<StudentState> = (
  set,
  get,
  state
) => ({
  students: [],
  addStudent: (data: Student) =>
    set(state => ({
      students: [data, ...state.students],
    })),
});

export const useStudentStore = create<StudentState>()(createStudentSlice);
