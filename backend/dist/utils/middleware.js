"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
// const logger = require('./logger')
const requestLogger = (request, response, next) => {
    logger_1.default.info('Method:', request.method);
    logger_1.default.info('Path:  ', request.path);
    logger_1.default.info('Body:  ', request.body);
    logger_1.default.info('---');
    next();
};
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
//check error type
const errorHandler = (error, request, response, next) => {
    logger_1.default.error(error.message);
    next(error);
};
const middleware = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
exports.default = middleware;
// module.exports = {
//   requestLogger,
//   unknownEndpoint,
//   errorHandler
// }
