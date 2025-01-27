export class MaintenanceIntervalMileageError extends Error {
    public override readonly name = "MaintenanceIntervalMileageError.  Must be at least 5 characters long and cannot exceed 300 characters.";
}