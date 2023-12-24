import {
  Controller,
  Logger,
  Post,
  Body,
  createParamDecorator,
} from '@nestjs/common';
import { CreatePollDto, JoinPollDto } from '../dto';

@Controller('polls')
export class PollsController {
  // TODO - add constructor for access to providers!
  @Post()
  async create() {
    Logger.log('In create!');

    return CreatePollDto;
  }

  @Post('/join')
  async join() {
    Logger.log('In join!');
    return JoinPollDto;
  }

  @Post('/rejoin')
  async rejoin() {
    Logger.log('In rejoin!');

    return {
      message: 'rejoin endpoint',
    };
  }
}
