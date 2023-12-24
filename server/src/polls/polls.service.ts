import { Injectable } from '@nestjs/common';
import { CreatePollFields, JoinPollFields, RejoinPollFields } from './types';
import { createPollId, createUserId } from 'src/utils/pollUtils';

@Injectable() // marks the class as a provider
export class PollsService {
  async createPoll(fields: CreatePollFields) {
    const pollId = createUserId();
    const userId = createUserId();

    return {
        ...fields,
        userId,
        pollId
    }
  }

  async joinPoll(fields: JoinPollFields) {
    const userId = createUserId();

    return {
        ...fields,
        userId
    }
  }

  async rejoinPoll(fields: RejoinPollFields) {
    return fields
  }
}
