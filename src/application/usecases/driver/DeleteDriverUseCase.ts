import { DriverRepositoryInterface } from "@application/repositories/DriverRepositoryInterface";

export class DeleteDriverUseCase {
  constructor(
    private readonly driverRepository: DriverRepositoryInterface, 
  ) {}

  async execute(id: string): Promise<void> {
    return this.driverRepository.delete(id); 
  }
}
