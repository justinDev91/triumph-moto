import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";
import { DriverEntity } from "@domain/entities/driver/DriverEntity";

export class GetDriverByIdUseCase {
  constructor(
    private readonly driverRepository: DriverRepositoryInterface, 
  ) {}

  async execute(id: string): Promise<DriverEntity | Error> {
    return this.driverRepository.findOneById(id); 
  }
}
