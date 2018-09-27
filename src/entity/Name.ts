import { Column } from "typeorm";
import { MinLength, MaxLength, IsString } from 'class-validator';


export class Name {

  @Column()
  @MinLength(4, { message: 'Minimum length should be 4' })
  @IsString({message:'Only String value is allowed'})
  firstName: string;

  @Column()
  @IsString({message:'Only String value is allowed'})
  lastName: string;
}