import { Logger } from '@nestjs/common';
import { OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { PollsService } from '../polls.service';
import { Namespace, Socket } from 'socket.io'
// gateway for websockets
@WebSocketGateway({
  namespace: 'polls',
})
export class PollsGateway implements OnGatewayInit {
  private readonly logger = new Logger(PollsGateway.name);
  constructor(private readonly pollsService: PollsService) { }

  @WebSocketServer() io: Namespace; // gives you access to the namespace of the WebSocketGateway

  // Gateway initialized (provided in module and instantiated)
  afterInit(): void {
    this.logger.log(`Websocket Gateway initialized.`);
  }

  async handleDisconnect(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`Disconnected socket id: ${client.id}`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    // TODO - remove client from poll and send `participants_updated` event to remaining clients
  }

  handleConnection(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }
}
