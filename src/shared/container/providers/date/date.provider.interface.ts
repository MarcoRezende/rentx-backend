export interface IDateProvider {
  compareInHours(starDate: Date, endDate: Date): number;

  compareInDays(starDate: Date, endDate: Date): number;

  convertToUTC(date: Date): string;

  now(): Date;

  addDays(days: number): Date;

  addHours(hours: number): Date;

  isBefore(starDate: Date, endDate: Date): boolean;
}
