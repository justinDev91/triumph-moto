export class InvalidLicenseError extends Error {
    public override readonly name = "InvalidLicenseError";

    constructor(readonly licenseNumber: string) {
    super(`Invalid license number: ${licenseNumber}`);
    }
}