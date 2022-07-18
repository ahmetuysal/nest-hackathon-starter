import { Injectable, Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

import config from '../config';
import {
  changeMail,
  changePasswordInfo,
  confirmMail,
  resetPassword,
} from './templates';

@Injectable()
export class MailSenderService {
  private transporter: Mail;

  private socials: string;

  private logger = new Logger('MailSenderService');

  constructor() {
    this.transporter = createTransport({
      auth: {
        user: config.mail.service.user,
        pass: config.mail.service.pass,
      },
      host: config.mail.service.host,
      port: config.mail.service.port,
      secure: config.mail.service.secure,
    });
    this.socials = config.project.socials
      .map(
        (social) =>
          `<a href="${social[1]}" style="box-sizing:border-box;color:${config.project.color};font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">${social[0]}</a>`,
      )
      .join('');
  }

  async sendVerifyEmailMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const buttonLink = `${config.project.mailVerificationUrl}?token=${token}`;

    const mail = confirmMail
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), config.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), config.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), config.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), config.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), config.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), config.project.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink)
      .replace(
        new RegExp('--TermsOfServiceLink--', 'g'),
        config.project.termsOfServiceUrl,
      );

    const mailOptions = {
      from: `"${config.mail.senderCredentials.name}" <${config.mail.senderCredentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Welcome to ${config.project.name} ${name}! Confirm Your Email`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.',
          );
          resolve(false);
        }
        resolve(true);
      }),
    );
  }

  async sendChangeEmailMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const buttonLink = `${config.project.mailChangeUrl}?token=${token}`;

    const mail = changeMail
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), config.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), config.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), config.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), config.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), config.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), config.project.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${config.mail.senderCredentials.name}" <${config.mail.senderCredentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Change Your ${config.project.name} Account's Email`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.',
          );
          resolve(false);
        }
        resolve(true);
      }),
    );
  }

  async sendResetPasswordMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const buttonLink = `${config.project.resetPasswordUrl}?token=${token}`;

    const mail = resetPassword
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), config.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), config.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), config.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), config.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), config.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), config.project.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${config.mail.senderCredentials.name}" <${config.mail.senderCredentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Reset Your ${config.project.name} Account's Password`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.',
          );
          resolve(false);
        }
        resolve(true);
      }),
    );
  }

  async sendPasswordChangeInfoMail(
    name: string,
    email: string,
  ): Promise<boolean> {
    const buttonLink = config.project.url;
    const mail = changePasswordInfo
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), config.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), config.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), config.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), config.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), config.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), config.project.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${config.mail.senderCredentials.name}" <${config.mail.senderCredentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Your ${config.project.name} Account's Password is Changed`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.',
          );
          resolve(false);
        }
        resolve(true);
      }),
    );
  }
}
