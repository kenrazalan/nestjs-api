import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    url: process.env.MONGO_URL,
    synchronize: true,
    useUnifiedTopology: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
  }),
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
