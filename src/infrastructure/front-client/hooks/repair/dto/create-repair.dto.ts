import { CommonRepairActionEnum } from "@/app/shared/models/repair.model";

export interface CreateRepairDto {
    motorcycleId: string;
    userId: string;
    breakdownId: string;
    description: string;
    cost: number;
    actions: CommonRepairActionEnum[];
}
