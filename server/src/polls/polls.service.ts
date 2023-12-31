import { Injectable, Logger } from '@nestjs/common';
import { CreatePollFields, JoinPollFields, RejoinPollFields } from './types';
import { createPollId, createUserId } from 'src/utils/pollUtils';
import { PollsRepository } from './polls.repository';

@Injectable() // marks the class as a provider
export class PollsService {
  private readonly logger = new Logger(PollsService.name);
  constructor(private readonly pollsRepository: PollsRepository) {}

  async createPoll(fields: CreatePollFields) {
    const pollID = createUserId();
    const userID = createUserId();

    const createdPoll = await this.pollsRepository.createPoll({...fields, pollID, userID})
    return {
      poll: createdPoll
    };
  }

  async joinPoll(poll: JoinPollFields) {
    const userID = createUserId();

    this.logger.debug(
      `Fetching poll with ID: ${poll.pollID} for user with ID: ${userID}`,
    );

    const joinedPoll = await this.pollsRepository.getPoll(poll.pollID);

    // TODO - create access Token

    return {
      poll: joinedPoll,
      // accessToken: signedString,
    };
  }

  async rejoinPoll(fields: RejoinPollFields) {
    this.logger.debug(
      `Rejoining poll with ID: ${fields.pollID} for user with ID: ${fields.userID} with name: ${fields.name}`,
    );

    const joinedPoll = await this.pollsRepository.addParticipant(fields);

    return joinedPoll;
  }
}
