"use strict";

var _tsyringe = require("tsyringe");

var _ethereal = require("./implementations/ethereal.provider");

var _ses = require("./implementations/ses.provider");

const mailProvider = {
  ses: _tsyringe.container.resolve(_ses.SESProvider),
  ethereal: _tsyringe.container.resolve(_ethereal.EtherealProvider)
};
const mail = process.env.disk ?? 'ethereal';

_tsyringe.container.registerInstance('EtherealProvider', mailProvider[mail]);