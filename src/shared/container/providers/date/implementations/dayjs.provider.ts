import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../date.provider.interface';

dayjs.extend(utc);

export class DayJsProvider implements IDateProvider {
  now(): Date {
    return dayjs().toDate();
  }

  compareInHours(starDate: Date, endDate: Date): number {
    return dayjs(this.convertToUTC(endDate)).diff(
      this.convertToUTC(starDate),
      'hours'
    );
  }

  compareInDays(starDate: Date, endDate: Date): number {
    return dayjs(this.convertToUTC(endDate)).diff(
      this.convertToUTC(starDate),
      'days'
    );
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }

  isBefore(starDate: Date, endDate: Date): boolean {
    return dayjs(starDate).isBefore(endDate);
  }
}
