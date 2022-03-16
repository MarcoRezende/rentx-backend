export interface CreateRentalDto {
  id?: string;
  userId: string;
  carId: string;
  expectedReturnDate: Date;
  total?: number;
  endDate?: Date;
}
