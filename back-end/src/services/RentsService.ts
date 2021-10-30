import RentsModel from '../models/RentsModel';

class RentsService {
  public async create({ climateHour, climateRain, dateId }): Promise<> {
    return CarsModel.create({ climateHour, climateRain, dateId });
  }

  public async getAll() {
    return CarsModel.getAll();
  }

  public async getById(id) {
    const car = await CarsModel.getById(id);
    if (!car) {
      return {
        err: {
          code: 'invalid_data',
          message: 'Car not found',
        },
      };
    }
    return car;
  }

  public async remove({ climateHour, climateRain, dateId }): Promise<> {
    return CarsModel.create({ climateHour, climateRain, dateId });
  }

  public async update({ climateHour, climateRain, dateId }): Promise<> {
    return CarsModel.create({ climateHour, climateRain, dateId });
  }

  constructor() {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
  }
}

export default new RentsService();
