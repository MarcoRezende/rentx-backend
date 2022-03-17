"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _cars = require("../../../cars/repositories/in-memory/cars.in-memory-repository");

var _rentals = require("../../repositories/in-memory/rentals.in-memory-repository");

var _dayjs2 = require("../../../../shared/container/providers/date/implementations/dayjs.provider");

var _appError = require("../../../../shared/errors/app-error");

var _createRental = require("./create-rental.use-case");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsInMemoryRepository;
let carsInMemoryRepository;
let dateProvider;
let dayAdd24Hours;
describe('Create rent', () => {
  dayAdd24Hours = (0, _dayjs.default)().add(1, 'day').toDate();
  beforeEach(() => {
    dateProvider = new _dayjs2.DayJsProvider();
    rentalsInMemoryRepository = new _rentals.RentalsInMemoryRepository();
    carsInMemoryRepository = new _cars.CarsInMemoryRepository();
    createRentalUseCase = new _createRental.CreateRentalUseCase(rentalsInMemoryRepository, dateProvider, carsInMemoryRepository);
  });
  it('should be able to create a rent', async () => {
    const car = await carsInMemoryRepository.create({
      brand: 'brand',
      description: 'description',
      dailyRate: 10,
      fineAmount: 5,
      licensePlate: '123',
      name: 'Ferrari',
      categoryId: '1234'
    });
    const rental = await createRentalUseCase.execute({
      userId: 'userId',
      carId: car.id,
      expectedReturnDate: dayAdd24Hours
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });
  it('should not allow a user to rent a unavailable car', async () => {
    await rentalsInMemoryRepository.create({
      carId: '123',
      expectedReturnDate: dayAdd24Hours,
      userId: 'userId'
    });
    await expect(createRentalUseCase.execute({
      userId: 'userId2',
      carId: '123',
      expectedReturnDate: dayAdd24Hours
    })).rejects.toEqual(new _appError.AppError('Car is unavailable'));
  });
  it('should not be able to rent a car when the user has open rent', async () => {
    await rentalsInMemoryRepository.create({
      carId: '123',
      expectedReturnDate: dayAdd24Hours,
      userId: 'userId'
    });
    await expect(createRentalUseCase.execute({
      userId: 'userId',
      carId: 'carId2',
      expectedReturnDate: dayAdd24Hours
    })).rejects.toEqual(new _appError.AppError("There's an open rental for the requesting user"));
  });
  it("should not be able to rent a car when return date isn't within required minimum hours", async () => {
    await expect(createRentalUseCase.execute({
      userId: 'userId',
      carId: 'carId',
      expectedReturnDate: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _appError.AppError('Invalid return date'));
  });
});