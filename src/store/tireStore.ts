import { StateCreator, create } from "zustand";

export interface Tire {
  id: number;
  name: string;
  type: string;
}

export interface TireState {
  tires: Tire[];
  add(data: Tire): void;
  update(data: Tire): void;
  remove(id: Tire["id"]): void;
}

export const createTireSlice: StateCreator<TireState> = (...args) => ({
  tires: [],
  add: (data: Tire) => {},
  update: (data: Tire) => {},
  remove: (id: Tire["id"]) => {},
});

const useTireStore = create<TireState>()(createTireSlice);
