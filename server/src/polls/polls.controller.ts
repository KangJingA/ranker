import { Controller, Logger, Post, Body, Req, UseGuards } from '@nestjs/common';
import { CreatePollDto, JoinPollDto } from './dto';
import { PollsService } from './polls.service';
import { ControllerAuthGuard } from './controller-auth.guard';
import { RequestWithAuth } from './types';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  async create(@Body() createPollDto: CreatePollDto) {
    Logger.log('In create!');
    const createdPoll = await this.pollsService.createPoll(createPollDto);

    return {
      poll: createdPoll,
      // accessToken
    };
  }

  @Post('/join')
  async join(@Body() joinPollDto: JoinPollDto) {
    Logger.log('In join!');
    Logger.log(joinPollDto)
    const result = await this.pollsService.joinPoll(joinPollDto);

    return result;
  }

  // extract data from a token
  @UseGuards(ControllerAuthGuard)
  @Post('/rejoin')
  async rejoin(@Req() request: RequestWithAuth) {
    Logger.log('In rejoin!');
    const { userID, pollID, name } = request;

    const rejoinPollResponse = await this.pollsService.rejoinPoll({
      userID,
      pollID,
      name,
    });

    return {
      poll: rejoinPollResponse,
    };
  }
}
