import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceRepositoryInterface } from '@application/repositories/MaintenanceRepositoryInterface';
import { MaintenanceEntity } from '@domain/entities/maintenance/MaintenanceEntity';
import { MaintenanceNotFoundError } from '@domain/errors/maintenance/MaintenanceNotFoundError';
import { Maintenance } from '@api/maintenances/maintenance.entity';
import { toDomainMaintenance } from '@helpers/maintenance/to-domain-maintenance';
import { toOrmMaintenance } from '@helpers/maintenance/to-orm-maintenance';
import { toOrmMaintenanceCreate } from '@helpers/maintenance/to-orm-maintenance-create';
import { MotorcycleNotFoundError } from '@domain/errors/motorcycle/MotorcycleNotFoundError';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';

@Injectable()
export class MaintenanceRepositoryImpleme implements MaintenanceRepositoryInterface {
  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>,
  ) {}

  async scheduleNextMaintenance(maintenance: MaintenanceEntity): Promise<void | Error> {
    const [maintenanceOrm, motorcycle] = await Promise.all([
      this.maintenanceRepository.findOne({ where: { id: maintenance.id }, relations: ["motorcycle"] }),
      this.motorcycleRepository.findOne({ where: { id: maintenance.motorcycle.id } })
    ]);
  
    if (!maintenanceOrm) return new MaintenanceNotFoundError();
    if (!motorcycle) return new MotorcycleNotFoundError();
  
    return this.maintenanceRepository.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.update(this.motorcycleRepository.target, motorcycle.id, {
        nextServiceMileage: maintenance.motorcycle.nextServiceMileage,
        lastServiceDate: maintenance.motorcycle._lastServiceDate
      });
  
      const updatedMotorcycle = await transactionalEntityManager.findOne(this.motorcycleRepository.target, {
        where: { id: motorcycle.id }
      });
  
      if (!updatedMotorcycle) throw new MotorcycleNotFoundError();
  
      await transactionalEntityManager.update(this.maintenanceRepository.target, maintenanceOrm.id, {
        motorcycle: updatedMotorcycle
      });
    });
  }
  
  public async save(maintenance: MaintenanceEntity): Promise<void> {
    const maintenanceOrm = toOrmMaintenanceCreate(maintenance);
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
