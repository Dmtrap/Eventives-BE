import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async upsertUserProfile(updateUserProfileDto: UpdateProfileDto) {
    const {
      userId,
      firstName,
      lastName,
      phoneNumber,
      address,
      avatar,
      title,
      affiliateLink,
      createdBy,
    } = updateUserProfileDto;

    // Cek apakah UserProfile sudah ada
    const existingProfile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      return this.prisma.userProfile.update({
        where: { userId },
        data: {
          firstName,
          lastName,
          phoneNumber,
          address,
          avatar,
          title,
          affiliateLink,
          updatedBy: createdBy,
        },
      });
    } else {
      return this.prisma.userProfile.create({
        data: {
          firstName,
          lastName,
          phoneNumber,
          address,
          avatar,
          title,
          affiliateLink,
          userId,
          createdBy,
        },
      });
    }
  }
}
