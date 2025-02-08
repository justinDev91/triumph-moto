import { Breakdown } from "./breakdown.model";

export enum CommonRepairActionEnum {
  OilChange = 'Oil Change',
    BrakeReplacement = 'Brake Replacement',
    TireReplacement = 'Tire Replacement',
    ChainAdjustment = 'Chain Adjustment',
    ClutchAdjustment = 'Clutch Adjustment',
    BatteryReplacement = 'Battery Replacement',
    SparkPlugReplacement = 'Spark Plug Replacement',
    FuelSystemCleaning = 'Fuel System Cleaning',
    ForkSealsReplacement = 'Fork Seals Replacement',
    TransmissionFluidChange = 'Transmission Fluid Change',
    SuspensionAdjustment = 'Suspension Adjustment',
    ElectricalSystemDiagnostics = 'Electrical System Diagnostics',
    CoolantChange = 'Coolant Change',
    HeadlightReplacement = 'Headlight Replacement',
    ExhaustRepair = 'Exhaust Repair',
    BodyworkRepair = 'Bodywork Repair',
    EngineRepair = 'Engine Repair',
    ClutchRepair = 'Clutch Repair',
}

export interface Repair {
  id: string;
  breakdown: Breakdown;
  repairDate: { value: Date };
  actions: CommonRepairActionEnum[];
  cost: { value: number };
}
