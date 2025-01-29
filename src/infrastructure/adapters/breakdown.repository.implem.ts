import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BreakdownRepositoryInterface } from "@application/repositories/BreakdownRepositoryInterface";
import { BreakdownEntity } from "@domain/entities/breakdown/BreakdownEntity";
import { Breakdown } from "@infrastructure/breakdowns/breakdown.entity";
import { Motorcycle } from "@infrastructure/motorcycles/motorcycle.entity";
import { Warranty } from "@infrastructure/warranties/warranty.entity";
import { Repair } from "@infrastructure/repairs/repair.entity";
import { toDomainMotorcycle } from "@infrastructure/helpers/motorcycle/to-domain-motorcycle";
import { toDomainWarranty } from "@infrastructure/helpers/warranty/to-domain-warranty";
import { BreakdownNotFoundError } from "@domain/errors/breakdown/BreakdownNotFoundError"; 
import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";
import { toDomainRepair } from '@infrastructure/helpers/repair/to-domain-repair';
import { RepairEntity } from '@domain/entities/repair/RepairEntity';
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";

@Injectable()
export class BreakdownRepositoryImplem implements BreakdownRepositoryInterface {
  constructor(
    @InjectRepository(Breakdown)
    private readonly breakdownRepository: Repository<Breakdown>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,

    @InjectRepository(Warranty)
    private readonly warrantyRepository: Repository<Warranty>,

    @InjectRepository(Repair)
    private readonly repairRepository: Repository<Repair>
  ) {}

  async save(breakdown: BreakdownEntity): Promise<void> {
    try {
      const breakdownToSave = this.breakdownRepository.create({
        id: breakdown.id,
        description: breakdown.description.value,
        reportedDate: breakdown.reportedDate.value,
        warranty: breakdown.warranty ? await this.warrantyRepository.findOne({ where: { id: breakdown.warranty.id } }) : null,
        motorcycle: await this.motorcycleRepository.findOne({ where: { id: breakdown.motorcycle.id } }),
      });

      await this.breakdownRepository.save(breakdownToSave);
    } catch (error) {
      throw new Error("Failed to save breakdown");
    }
  }

  async findOneById(id: string): Promise<BreakdownEntity | Error> {
    try {
      const breakdown = await this.breakdownRepository.findOne({
        where: { id },
        relations: ["motorcycle", "warranty", "repairs"],
      });

      if (!breakdown) {
        return new BreakdownNotFoundError(`Breakdown with ID ${id} not found`);
      }

      const motorcycle = toDomainMotorcycle(breakdown.motorcycle);
      const warranty = breakdown.warranty ? toDomainWarranty(breakdown.warranty) : null;

      const breakdownEntity = BreakdownEntity.create(
        breakdown.id,
        motorcycle as MotorcycleEntity,
        breakdown.description,
        breakdown.reportedDate,
        warranty as WarrantyEntity
      );

      if (breakdownEntity instanceof Error) {
        return breakdownEntity;
      }

      breakdown.repairs.forEach((repair) => {
        const repairEntity = toDomainRepair(repair, breakdownEntity);
        breakdownEntity.addRepair(repairEntity as RepairEntity);
      });

      return breakdownEntity;
    } catch (error) {
      throw new Error("Failed to find breakdown");
    }
  }

  async findByMotorcycleId(motorcycleId: string): Promise<BreakdownEntity[] | Error> {
    try {
      const breakdowns = await this.breakdownRepository.find({
        where: { motorcycle: { id: motorcycleId } },
        relations: ["motorcycle", "warranty", "repairs"],
      });

      if (breakdowns.length === 0) {
        return new Error(`No breakdowns found for motorcycle ID ${motorcycleId}`);
      }

      const breakdownEntities = breakdowns.map((breakdown) => {
        const motorcycle = toDomainMotorcycle(breakdown.motorcycle);
        const warranty = breakdown.warranty ? toDomainWarranty(breakdown.warranty) : null;

        const breakdownEntity = BreakdownEntity.create(
          breakdown.id,
          motorcycle as MotorcycleEntity,
          breakdown.description,
          breakdown.reportedDate,
          warranty as WarrantyEntity
        );

        if (breakdownEntity instanceof Error) {
          throw new Error("Failed to create breakdown entity");
        }

        breakdown.repairs.forEach((repair) => {
          const repairEntity = toDomainRepair(repair, breakdownEntity);
          breakdownEntity.addRepair(repairEntity as RepairEntity);
        });

        return breakdownEntity;
      });

      return breakdownEntities;
    } catch (error) {
      throw new Error("Failed to find breakdowns for motorcycle");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const breakdown = await this.breakdownRepository.findOne({ where: { id } });

      if (!breakdown) {
        throw new BreakdownNotFoundError(`Breakdown with ID ${id} not found`);
      }

      await this.breakdownRepository.remove(breakdown);
    } catch (error) {
      throw new Error("Failed to delete breakdown");
    }
  }

  async findAll(): Promise<BreakdownEntity[]> {
    try {
      const breakdowns = await this.breakdownRepository.find({
        relations: ["motorcycle", "warranty", "repairs"],
      });

      const breakdownEntities = breakdowns.map((breakdown) => {
        const motorcycle = toDomainMotorcycle(breakdown.motorcycle);
        const warranty = breakdown.warranty ? toDomainWarranty(breakdown.warranty) : null;

        const breakdownEntity = BreakdownEntity.create(
          breakdown.id,
          motorcycle as MotorcycleEntity ,
          breakdown.description,
          breakdown.reportedDate,
          warranty as WarrantyEntity
        );

        if (breakdownEntity instanceof Error) {
          throw new Error("Failed to create breakdown entity");
        }

        breakdown.repairs.forEach((repair) => {
          const repairEntity = toDomainRepair(repair, breakdownEntity);
          breakdownEntity.addRepair(repairEntity as RepairEntity);
        });

        return breakdownEntity;
      });

      return breakdownEntities;
    } catch (error) {
      throw new Error("Failed to find all breakdowns");
    }
  }
}
