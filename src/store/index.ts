import { StudentState, createStudentSlice } from "@/store/studentStore";
import { TireState, createTireSlice } from "@/store/tireStore";
import { WarehouseState, createWarehouseSlice } from "@/store/warehouseStore";
import { StoreApi, UseBoundStore, create } from "zustand";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store(s => s[k as keyof typeof s]);
  }

  return store;
};

export const useGlobalBaseStore = create<
  TireState & WarehouseState & StudentState
>()((...args) => ({
  ...createTireSlice(...args),
  ...createWarehouseSlice(...args),
  ...createStudentSlice(...args),
}));

export const useGlobalStore = createSelectors(useGlobalBaseStore);
