import { Repository } from "typeorm";
import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";
import { SparePartEntity } from "@domain/entities/order/SparePartEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { SparePart } from "@api/spare-parts/spare-part.entity";
import { toDomainSparePart } from "@helpers/sparPart/to-domain-spare-part";
import { toOrmSpartPart } from "@helpers/sparPart/to-orm-spart-part";
import { SparePartNotFoundError } from "@domain/errors/sparePart/SparePartNotFoundError";

export class SparePartRepositoryImplem implements SparePartRepositoryInterface {
  constructor(
    @InjectRepository(SparePart)
    private readonly sparePartRepository: Repository<SparePart>
  ) {}

  async use(
    id: string, 
    quantityInStock: number, 
    totalUsage: number, 
    reservedStock: number
  ): Promise<void> {

    await this.sparePartRepository.update(id, {
      reservedStock,
      quantityInStock,
      totalUsage
    });
  }

  async reserve(id: string, quantity: number): Promise<void> {
    await this.sparePartRepository.update(id, {
      reservedStock: quantity
    });
  }

  async restock(id: string, quantity: number): Promise<void> {
    await this.sparePartRepository.update(id, {
      quantityInStock: quantity
    });
  }

  public async save(sparePartEntity: SparePartEntity): Promise<void> {
    const sparePart = toOrmSpartPart(sparePartEntity);
    await this.sparePartRepository.save(sparePart);
  }

  public async findById(id: string): Promise<SparePartEntity | Error> {
    const sparePart = await this.sparePartRepository.findOne({ where: { id } });
    if (!sparePart) return new SparePartNotFoundError();
    return toDomainSparePart(sparePart);
  }

  public async findAll(): Promise<SparePartEntity[] | Error> {
    const spareParts = await this.sparePartRepository.find();
    if (!spareParts.length) return new SparePartNotFoundError();
    
    return spareParts.map(toDomainSparePart) as SparePartEntity[];
  }

  public async remove(id: string): Promise<void> {
  const sparePart = await this.sparePartRepository.findOne({ where: { id } });
  if (!sparePart) throw new SparePartNotFoundError();
  
  await this.sparePartRepository.delete(id);
  }
}
