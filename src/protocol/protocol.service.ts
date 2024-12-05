import { Injectable, Logger } from '@nestjs/common';
import { Protocol } from './protocol.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';
import { CreateProtocolDto } from './Dto/create-Protocol.dto';

@Injectable()
export class ProtocolService {
  private readonly logger = new Logger(ProtocolService.name);

  constructor(
    @InjectModel(Protocol.name) private readonly protocolModel: Model<Protocol>,
  ) {}

  async create(
    createProtocolDto: CreateProtocolDto,
  ): Promise<ServiceResponse<Protocol>> {
    try {
      // TODO: Implement, when a protocol from the same week already exists, update it instead of creating a new one
      const createdProtocol = await this.protocolModel.create({
        exerciseDays: createProtocolDto.protocolExerciseDay,
      });

      return {
        success: true,
        code: 201,
        message: 'Protocol created successfully',
        data: createdProtocol,
      };
    } catch (error) {
      this.logger.error('Error creating protocol', error);
      return {
        success: false,
        code: 500,
        message: 'Error creating protocol',
      };
    }
  }
}
