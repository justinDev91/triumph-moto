import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceRepositoryInterface } from '@application/repositories/MaintenanceRepositoryInterface';
import { MaintenanceEntity } from '@domain/entities/maintenance/MaintenanceEntity';
import { MaintenanceNotFoundError } from '@domain/errors/maintenance/MaintenanceNotFoundError';
import { Maintenance } from '@infrastructure/maintenances/maintenance.entity';
import { toDomainMaintenance } from '@infrastructure/helpers/maintenance/to-domain-maintenance';
import { toOrmMaintenance } from '@infrastructure/helpers/maintenance/to-orm-maintenance';

@Injectable()
export class MaintenanceRepositoryImpleme implements MaintenanceRepositoryInterface {
  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
  ) {}

  public async save(maintenance: MaintenanceEntity): Promise<void> {
    const maintenanceOrm = toOrmMaintenance(maintenance);
    await this.maintenanceRepository.save(maintenanceOrm);
  }

  public async findById(id: string): Promise<MaintenanceEntity | MaintenanceNotFoundError> {
    const maintenanceOrm = await this.maintenanceRepository.findOne({
      where: { id },
      relations: ['motorcycle', 'concession'],
    });

    if (!maintenanceOrm) {
      return new MaintenanceNotFoundError();
    }

    return toDomainMaintenance(maintenanceOrm);
  }

  public async deleteById(id: string): Promise<void> {
    await this.maintenanceRepository.delete(id);
  }

  public async findAll(): Promise<MaintenanceEntity[] | MaintenanceNotFoundError> {
    const maintenancesOrm = await this.maintenanceRepository.find({
      relations: ['motorcycle', 'concession'],
    });

    if (maintenancesOrm.length === 0) {
      return new MaintenanceNotFoundError();
    }

    return maintenancesOrm.map((maintenanceOrm) => toDomainMaintenance(maintenanceOrm));
  }

  public async findByMotorcycleId(motorcycleId: string): Promise<MaintenanceEntity[] | MaintenanceNotFoundError> {
    const maintenancesOrm = await this.maintenanceRepository.find({
      where: { motorcycle: { id: motorcycleId } },
      relations: ['motorcycle', 'concession'],
    });

    if (maintenancesOrm.length === 0) {
      return new MaintenanceNotFoundError();
    }

    return maintenancesOrm.map((maintenanceOrm) => toDomainMaintenance(maintenanceOrm));
  }

  public async findByConcessionId(concessionId: string): Promise<MaintenanceEntity[] | MaintenanceNotFoundError> {
    const maintenancesOrm = await this.maintenanceRepository.find({
      where: { concession: { id: concessionId } },
      relations: ['motorcycle', 'concession'],
    });

    if (maintenancesOrm.length === 0) {
      return new MaintenanceNotFoundError();
    }

    return maintenancesOrm.map((maintenanceOrm) => toDomainMaintenance(maintenanceOrm));
  }

  public async findOverdue(): Promise<MaintenanceEntity[]> {
    const maintenancesOrm = await this.maintenanceRepository.find({
      relations: ['motorcycle', 'concession'],
    });
  
    const overdueMaintenances = maintenancesOrm
      .map((maintenanceOrm) => toDomainMaintenance(maintenanceOrm))
      .filter((maintenanceEntity) => maintenanceEntity.isMaintenanceOverdue()); 
  
    return overdueMaintenances;
  }

  public async update(maintenance: MaintenanceEntity): Promise<void> {
    const maintenanceOrm = toOrmMaintenance(maintenance);
    await this.maintenanceRepository.save(maintenanceOrm);
  }
}
