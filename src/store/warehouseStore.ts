import { Tire } from "@/store/tireStore";
import { StateCreator, create } from "zustand";

interface Warehouse {
  id: number;
  name: string;
  tires: Tire[];
}

export interface WarehouseState {
  warehouses: Warehouse[];
  addWarehouse(data: Warehouse): void;
  updateWarehouse(data: Warehouse): void;
  removeWarehouse(id: Warehouse["id"]): void;
  addTireToWarehouse(warehouseId: Warehouse["id"], tire: Tire): void;
  removeTireFromWarehouse(
    warehouseId: Warehouse["id"],
    tireId: Tire["id"]
  ): void;
}

export const createWarehouseSlice: StateCreator<WarehouseState> = () => ({
  warehouses: [],
  addWarehouse: (data: Warehouse) => {},
  updateWarehouse: (data: Warehouse) => {},
  removeWarehouse: (id: Warehouse["id"]) => {},
  addTireToWarehouse: (warehouseId: Warehouse["id"], tire: Tire) => {},
  removeTireFromWarehouse: (
    warehouseId: Warehouse["id"],
    tireId: Tire["id"]
  ) => {},
});

const useWarehouseStore = create<WarehouseState>()(createWarehouseSlice);
