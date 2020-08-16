import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import config from '../config';
import {
  changeMail, changePasswordInfo, confirmMail, resetPassword,
} from './templates';

export class MailSenderService {
  static async sendVerifyEmailMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const transporter = MailSenderService.createTransporter();
    const socials = MailSenderService.createSocials();
    const buttonLink = `${config.project.mailVerificationUrl}?token=${token}`;

    const mail = confirmMail
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), config.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), config.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), config.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), config.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), config.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), config.project.url)
      .replace(new RegExp('--Socials--', 'g'), socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink)
      .replace(
        new RegExp('--TermsOfServiceLink--', 'g'),
        config.project.termsOfServiceUrl,
      );

    const mailOptions = {
      from: `"${config.mail.senderCredentials.name}" <${
        config.mail.senderCredentials.email
      }>`,
      to: email, // list of receivers (separated by ,)
      subject: `Welcome to ${config.project.name} ${name}! Confirm Your Email`,
      html: mail,
    };

    return new Promise<boolean>((resolve) => transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        Logger.warn('Mail sending failed, check your service credentials.');
        resolve(false);
      }
      resolve(true);
    }));
  }

  static async sendChangeEmailMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const transporter = MailSenderService.createTransporter();
    const socials = MailSenderService.createSocials();

    const buttonLink = `${config.project.mailChangeUrl}?token=${token}`;

    const mail = changeMail
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), config.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), config.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), config.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), config.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), config.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), config.project.url)
      .replace(new RegExp('--Socials--', 'g'), socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${config.mail.senderCredentials.name}" <${
        config.mail.senderCredentials.email
      }>`,
      to: email, // list of receivers (separated by ,)
      subject: `Change Your ${config.project.name} Account's Email`,
      html: mail,
    };

    return new Promise<boolean>((resolve) => transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        Logger.warn('Mail sending failed, check your service credentials.');
        resolve(false);
      }
      resolve(true);
    }));
  }

  static async sendResetPasswordMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const transporter = MailSenderService.createTransporter();
    const socials = MailSenderService.createSocials();

    const buttonLink = `${config.project.resetPasswordUrl}?token=${token}`;

    const mail = resetPassword
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), config.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), config.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), config.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), config.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), config.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), config.project.url)
      .replace(new RegExp('--Socials--', 'g'), socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${config.mail.senderCredentials.name}" <${
        config.mail.senderCredentials.email
      }>`,
      to: email, // list of receivers (separated by ,)
      subject: `Reset Your ${config.project.name} Account's Password`,
      html: mail,
    };

    return new Promise<boolean>((resolve) => transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        Logger.warn('Mail sending failed, check your service credentials.');
        resolve(false);
      }
      resolve(true);
    }));
  }

  static async sendPasswordChangeInfoMail(name: string, email: string):Promise<boolean> {
    const transporter = MailSenderService.createTransporter();
    const socials = MailSenderService.createSocials();
    const buttonLink = config.project.url;
    const mail = changePasswordInfo
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), config.project.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), config.project.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), config.project.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), config.project.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), config.project.color)
      .replace(new RegExp('--ProjectLink--', 'g'), config.project.url)
      .replace(new RegExp('--Socials--', 'g'), socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${config.mail.senderCredentials.name}" <${
        config.mail.senderCredentials.email
      }>`,
      to: email, // list of receivers (separated by ,)
      subject: `Your ${config.project.name} Account's Password is Changed`,
      html: mail,
    };

    return new Promise<boolean>((resolve) => transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        Logger.warn('Mail sending failed, check your service credentials.');
        resolve(false);
      }
      resolve(true);
    }));
  }

  private static createTransporter() {
    return nodemailer.createTransport({
      auth: {
        user: config.mail.service.user,
        pass: config.mail.service.pass,
      },
      host: config.mail.service.host,
      port: config.mail.service.port,
      secure: config.mail.service.secure,
    });
  }

  private static createSocials(): string {
    let socials = '';
    config.project.socials.forEach((social) => {
      socials += `<a href="${social[1]}" style="box-sizing:border-box;color:${
        config.project.color
      };font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">${
        social[0]
      }</a>`;
    });
    return socials;
  }
}
