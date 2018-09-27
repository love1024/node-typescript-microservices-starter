import { PersonRepository } from '../repository/PersonRepository';
import { validate } from 'class-validator';
import { Person } from '../entity/Person';
import { Name } from '../entity/Name';
import { plainToClass } from 'class-transformer';
import { Service, Inject } from 'typedi';


@Service()
export class PersonService {

  @Inject()
  PersonRepository: PersonRepository;
  
  async getAllPerson(): Promise<Person[]> {
    return this.PersonRepository.getAllPerson();
  }

  async getPersonById(id: string): Promise<Person> {
    return this.PersonRepository.getPersonById(id);
  }

  async insertPerson(person: Person): Promise<Person> {
    return this.PersonRepository.insertPerson(person);
  }
}