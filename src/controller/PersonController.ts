import {Get, JsonController, Post, Body, Param, UseBefore, } from "routing-controllers";
import { PersonService } from '../service/PersonService';
import { Person } from '../entity/Person';
import { validate } from 'class-validator';
import { PersonMiddleware } from '../middleware/custom/PersonMiddleware';
import { Inject } from "typedi";


@JsonController('/person')
export class PersonController {

  @Inject()
  personService: PersonService;

  @Get('/')
  async getAllPerson(): Promise<Person[]> {
    return this.personService.getAllPerson();
  }

  @Get('/:id')
  async getPersonById(@Param('id') id: string): Promise<Person> {
    return this.personService.getPersonById(id);
  }

  @Post('/')
  @UseBefore(PersonMiddleware)
  async insertPerson(@Body({ validate: true }) person: Person): Promise<Person> {
    return this.personService.insertPerson(person);
  }
}