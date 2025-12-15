import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
       user: "7b8fc8001@smtp-brevo.com",
        pass: "dt7y8NXEzZsI1wGB"
      },
    });
  }

  async sendMail(options: nodemailer.SendMailOptions) {
    // Mengirim email dengan opsi yang diberikan
    return await this.transporter.sendMail(options);
  }
}
