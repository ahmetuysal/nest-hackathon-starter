import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { default as config } from '../config';
import { confirmMail } from './templates';

@Injectable()
export class MailSenderService {
  async sendVerifyMailMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      auth: {
        user: config.mail.service.user,
        pass: config.mail.service.pass,
      },
      host: config.mail.service.host,
      port: config.mail.service.port,
      secure: config.mail.service.secure,
    });

    let socials = '';

    config.project.socials.forEach(social => {
      socials += `<a href="${social[1]}" style="box-sizing:border-box;color:${
        config.project.color
      };font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">${
        social[0]
      }</a>`;
    });

    const buttonLink = `${config.project.mailVerificationUrl}?token=${token}`;

    const mail = confirmMail
      .replace('--PersonName--', name)
      .replace('--ProjectName--', config.project.name)
      .replace('--ProjectAddress--', config.project.address)
      .replace('--ProjectLogo--', config.project.logoUrl)
      .replace('--ProjectSlogan--', config.project.slogan)
      .replace('--ProjectColor--', config.project.color)
      .replace('--ProjectLink--', config.project.url)
      .replace('--Socials--', socials)
      .replace('--ButtonLink--', buttonLink)
      .replace('--TermsOfServiceLink--', config.project.termsOfServiceUrl);

    const mailOptions = {
      from: `"${config.mail.senderCredentials.name}" <${
        config.mail.senderCredentials.email
      }>`,
      to: email, // list of receivers (separated by ,)
      subject: `Welcome to ${config.project.name} ${name}! Confirm Your Email`,
      html: mail,
    };

    const sended = await new Promise<boolean>(async (resolve, reject) => {
      return await transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          return reject(false);
        }
        resolve(true);
      });
    });

    return sended;
  }
}
