import { getMongoRepository } from "typeorm";
import { Person } from '../entity/Person';
import { Service } from "typedi";


@Service()
export class PersonRepository {
  async getAllPerson(): Promise<Person[]> {
    return getMongoRepository(Person).find();
  }

  async getPersonById(id: string): Promise<Person> {
    return getMongoRepository(Person).findOne(id);
  }

  async insertPerson(person:Person): Promise<Person> {
    return getMongoRepository(Person).save(person);
  }
}