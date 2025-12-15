import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';
import * as bcrypt from 'bcryptjs';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mail: MailService,
  ) {}

  async requestPasswordReset(email: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email not found');
    }


    const token = randomBytes(32).toString('hex');
    await this.prisma.token.create({
      data: {
        userId: user.id,
        token,
        createdAt: new Date(),
      },
    });

    const resetLink = `https://cms.eventives.id/event-auth/ChangePassword?token=${token}`;

    try { 
      await this.mail.sendMail({
        to: email,
        subject: 'Password Reset',
        html: `Click <a href="${resetLink}">here</a> to reset your password`,
      });
    } catch (error) {
      throw new NotFoundException('Failed to send password reset email');
    }

    return { message:'A password reset link has been sent to your email.'};
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenRecord = await this.prisma.token.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!tokenRecord) {
      throw new NotFoundException('Invalid or expired token');
    }
    const expiry = addHours(tokenRecord.createdAt, 2);
    if (new Date() > expiry) {
      throw new NotFoundException('Token expired');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.users.update({
      where: { id: tokenRecord.userId },
      data: { password: hashedPassword },
    });

    await this.prisma.token.delete({ where: { id: tokenRecord.id } });

    return { message: 'Password reset successfully' };
  }
}
