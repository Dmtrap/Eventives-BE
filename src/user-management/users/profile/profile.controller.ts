import { Controller, Post, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userProfileService: ProfileService) {}

  @Post()
  async createUserProfile(@Body() createUserProfileDto: CreateProfileDto) {
    return this.userProfileService.upsertUserProfile(createUserProfileDto);
  }
}
