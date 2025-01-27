export class MotorcycleStatusError extends Error {
    public override readonly name = "MotorcycleStatusError. Status must be one of the following: 'Available', 'Sold', 'In Service', 'Reserved'";
}