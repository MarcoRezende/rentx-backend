import { container } from 'tsyringe';

import { IDateProvider } from './date.provider.interface';
import { DayJsProvider } from './implementations/dayjs.provider';

container.registerSingleton<IDateProvider>('DayJsProvider', DayJsProvider);
