import { forwardRef, Inject, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { constants } from '../../../app/constants/common.constant';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
  }

  @WebSocketServer() server: Server;

  async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
    const user = await this.identifyUser(client);
    if (!user) {
      client.disconnect();
      return;
    }
    const roomNames = constants.WEBSOCKET.ROOM_NAME;
    const { email } = user;

    // Join rooms of each user
    client.join('all-user')
  }

  async handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
    console.log(`Disconnect ${client.id}`);
  }

  private async identifyUser(client: Socket) {
    const email = client.handshake.headers?.email as string;
    if (!email) return null;

    return {
      email
    }
  }
}
