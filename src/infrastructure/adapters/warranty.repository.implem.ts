import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarrantyRepositoryInterface } from '@application/repositories/WarrantyRepositoryInterface';
import { Warranty } from '@infrastructure/warranties/warranty.entity';
import { WarrantyEntity } from '@domain/entities/warranty/WarrantyEntity';
import { WarrantyNotFoundError } from '@domain/errors/warranty/WarrantyNotFoundError';
import { toOrmWarranty } from '@infrastructure/helpers/warranty/to-orm-warranty';
import { toDomainWarranty } from '@infrastructure/helpers/warranty/to-domain-warranty';
import { Motorcycle } from '@infrastructure/motorcycles/motorcycle.entity';
import { toOrmMotorcycle } from '@infrastructure/helpers/motorcycle/to-orm-motorcycle';

@Injectable()
export class WarrantyRepositoryImplem implements WarrantyRepositoryInterface {
  constructor(

    @InjectRepository(Warranty)
    private readonly warrantyRepository: Repository<Warranty>,

    // @InjectRepository(Motorcycle)
    // private readonly motorcycleRepository: Repository<Motorcycle>, 
  ) {}
  save(warranty: WarrantyEntity): Promise<WarrantyEntity | Error> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<WarrantyEntity[] | Error> {
    const allWarranties = await this.warrantyRepository.find();
    
    return allWarranties.map(toDomainWarranty)  as WarrantyEntity[];
  }

  // async save(warranty: WarrantyEntity): Promise<WarrantyEntity | Error> {
  //   const savedMotorcycle = await this.motorcycleRepository.save(toOrmMotorcycle(warranty.motorcycle));
  
  //   const warrantyOrm = toOrmWarranty(warranty);
    
  //   warrantyOrm.motorcycle = savedMotorcycle; 
  
  //   const savedWarranty = await this.warrantyRepository.save(warrantyOrm);
  
  //   console.log("savedWarranty", savedWarranty);
  
  //   return toDomainWarranty(savedWarranty);
  // }
  

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

  async update(warranty: WarrantyEntity): Promise<void> {
    const warrantyOrm = toOrmWarranty(warranty);
    await this.warrantyRepository.update(warrantyOrm.id, warrantyOrm);
  }

  async remove(id: string): Promise<void> {
    await this.warrantyRepository.delete(id);
  }
}
