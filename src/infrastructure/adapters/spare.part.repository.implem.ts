import { Repository } from "typeorm";
import { SparePartRepositoryInterface } from "@application/repositories/SparePartRepositoryInterface";
import { SparePartEntity } from "@domain/entities/order/SparePartEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { SparePart } from "@infrastructure/spare-parts/spare-part.entity";
import { toDomainSparePart } from "@infrastructure/helpers/sparPart/to-domain-spare-part";
import { toOrmSpartPart } from "@infrastructure/helpers/sparPart/to-orm-spart-part";

export class SparePartRepositoryImplem implements SparePartRepositoryInterface {
  constructor(
    @InjectRepository(SparePart)
    private readonly sparePartRepository: Repository<SparePart>
  ) {}

  public async save(sparePartEntity: SparePartEntity): Promise<void> {
    const sparePart = toOrmSpartPart(sparePartEntity);
    await this.sparePartRepository.save(sparePart);
  }

  public async findById(id: string): Promise<SparePartEntity | Error> {
    const sparePart = await this.sparePartRepository.findOne({ where: { id } });
    if (!sparePart) {
      return new Error("Spare part not found");
    }
    return toDomainSparePart(sparePart);
  }

  public async findAll(): Promise<SparePartEntity[] | Error> {
    const spareParts = await this.sparePartRepository.find();
    if (!spareParts.length) {
      return new Error("No spare parts found");
    }
    return spareParts.map(toDomainSparePart) as SparePartEntity[];
  }
}
