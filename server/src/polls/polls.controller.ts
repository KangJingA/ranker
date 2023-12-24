import {
  Controller,
  Logger,
  Post,
  Body,
  createParamDecorator,
} from '@nestjs/common';
import { CreatePollDto, JoinPollDto } from './dto';
import { PollsService } from './polls.service';
@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  async create(@Body() createPollDto: CreatePollDto) {
    Logger.log('In create!');
    const result = await this.pollsService.createPoll(createPollDto);

    return createPollDto;
  }

  @Post('/join')
  async join(@Body() joinPollDto: JoinPollDto) {
    Logger.log('In join!');

    const result = await this.pollsService.joinPoll(joinPollDto);
    
    return result;
  }

  // extract data from a token
  @Post('/rejoin')
  async rejoin() {
    Logger.log('In rejoin!');

    const result = await this.pollsService.rejoinPoll({
      name: 'From token',
      pollID: 'Also from token',
      userID: 'Guess where this comes from?',
    });

    return result;
  }
}
