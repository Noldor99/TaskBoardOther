import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

import { plainToInstance } from 'class-transformer'

import { validate, ValidationError } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToInstance(metadata.metatype, value)
    let errors: ValidationError[] = []
    if (obj) errors = await validate(obj)
    if (errors.length) {
      const messages = errors.map((err: ValidationError) => {
        return err.property + ' - ' + Object.values(err.constraints).join(', ')
      })
      throw new BadRequestException(messages.join(', '));
    }

    return value
  }
}
