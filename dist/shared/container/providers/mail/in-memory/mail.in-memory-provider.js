"use strict";

exports.__esModule = true;
exports.MailInMemoryProvider = void 0;

class MailInMemoryProvider {
  constructor() {
    this.messages = [];
  }

  async sendMail(to, subject, variables, path) {
    this.messages.push({
      to,
      subject,
      variables,
      path
    });
  }

}

exports.MailInMemoryProvider = MailInMemoryProvider;