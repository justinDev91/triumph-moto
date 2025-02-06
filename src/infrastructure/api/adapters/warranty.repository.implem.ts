import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarrantyRepositoryInterface } from '@application/repositories/WarrantyRepositoryInterface';
import { Warranty } from '@api/warranties/warranty.entity';
import { WarrantyEntity } from '@domain/entities/warranty/WarrantyEntity';
import { WarrantyNotFoundError } from '@domain/errors/warranty/WarrantyNotFoundError';
import { toOrmWarranty } from '@helpers/warranty/to-orm-warranty';
import { toDomainWarranty } from '@helpers/warranty/to-domain-warranty';
import { Motorcycle } from '@api/motorcycles/motorcycle.entity';
import { toOrmMotorcycle } from '@helpers/motorcycle/to-orm-motorcycle';

@Injectable()
export class WarrantyRepositoryImplem implements WarrantyRepositoryInterface {
  constructor(

    @InjectRepository(Warranty)
    private readonly warrantyRepository: Repository<Warranty>,

    @InjectRepository(Motorcycle)
    private readonly motorcycleRepository: Repository<Motorcycle>, 
  ) {}

  async findAll(): Promise<WarrantyEntity[] | Error> {
    const allWarranties = await this.warrantyRepository.find(
      {relations: ['motorcycle']}
    );
    
    return allWarranties.map(toDomainWarranty)  as WarrantyEntity[];
  }

  async save(warranty: WarrantyEntity): Promise<WarrantyEntity | Error> {
    const savedMotorcycle = await this.motorcycleRepository.save(toOrmMotorcycle(warranty.motorcycle));
  
    const warrantyOrm = toOrmWarranty(warranty);
    
    warrantyOrm.motorcycle = savedMotorcycle; 
  
    const savedWarranty = await this.warrantyRepository.save(warrantyOrm);
    
    return toDomainWarranty(savedWarranty);
  }
  

  async findById(id: string): Promise<WarrantyEntity | Error> {
    const warrantyOrm = await this.warrantyRepository.findOne({
      where: { id },
      relations: ['motorcycle'],
    });

    if (!warrantyOrm) return new WarrantyNotFoundError();

    return toDomainWarranty(warrantyOrm);
  }

  async findByMotorcycleId(motorcycleId: string): Promise<WarrantyEntity | Error> {
    const warrantyOrm = await this.warrantyRepository.findOne({
      where: { motorcycle: { id: motorcycleId } },
      relations: ['motorcycle'],
    });

    if (!warrantyOrm) return new WarrantyNotFoundError();

    return toDomainWarranty(warrantyOrm);
  }

  async update(id: string, coverageDetails: string, isActive: boolean): Promise<void> {
    await this.warrantyRepository.update(id, {
      coverageDetails,
      isActive,
    });
  }

  async remove(id: string): Promise<void> {
    await this.warrantyRepository.delete(id);
  }
}
