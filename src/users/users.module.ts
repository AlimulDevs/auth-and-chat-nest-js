import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema, Users } from './users.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports :[
    MongooseModule.forFeature([{
        name : Users.name, schema : UsersSchema
    }]),
    JwtModule.register({
        global: true,
        secret: "secret",
        signOptions: { expiresIn: '60s' },
      }),
  ],
    controllers: [ UsersController],
    providers: [ UsersService],
    exports :[JwtModule]
})
export class UsersModule {
   
}
