import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// configures jwt service
export const jwtModule = JwtModule.registerAsync({
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(configService.get<string>('POLL_DURATION')),
        },
      }),
    imports: [ConfigModule],
    inject: [ConfigService],
  });