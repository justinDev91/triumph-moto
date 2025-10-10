import { LocationRepositoryInterface } from "@application/repositories/LocationRepositoryInterface";
import { UnexpectedError } from "@domain/errors/user/UnexpectedError";

export class CalculateLocationCostUsecase {
    constructor(private readonly locationRepository: LocationRepositoryInterface) {}
  
    public async execute(locationId: string): Promise<number | Error> {
      try {
        const location = await this.locationRepository.findById(locationId);
        if (location instanceof Error) return location;

        const calculateResult = location.calculateCost();
        if (calculateResult instanceof Error) return calculateResult;
        
        return location.cost;
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }