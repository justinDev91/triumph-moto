export class MaintenanceIntervalTimeError extends Error {
    public override readonly name = "MaintenanceIntervalTimeError.  Must be positive cannot exceed 365 days.";
}