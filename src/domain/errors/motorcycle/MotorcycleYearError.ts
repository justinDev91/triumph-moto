export class MotorcycleYearError extends Error {
    public override readonly name = "MotorcycleYearError. Year must be between 1900 and now";
}