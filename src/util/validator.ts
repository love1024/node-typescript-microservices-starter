import { validate } from "class-validator";
import { forEach, pick} from 'lodash';

async function validateEntity<T>(entity:T): Promise<any>{
  let validationResults =  await validate(entity);
  let constraints:any =[]
  if(validationResults &&  validationResults.length > 0 ){
    forEach(validationResults, (item)=>{
      constraints.push(pick(item, 'constraints', 'property'));
      forEach(item.children, (child) => {
        constraints.push(pick(child, 'constraints', 'property'));
      })
    });
  }
  return constraints;
}

export {validateEntity}