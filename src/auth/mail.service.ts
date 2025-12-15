import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "#",
      port: 123, //Gunakan port yang sesuai
      auth: {
       user: "#",
        pass: "#"
      },
    });
  }

  async sendMail(options: nodemailer.SendMailOptions) {
    return await this.transporter.sendMail(options);
  }
}
