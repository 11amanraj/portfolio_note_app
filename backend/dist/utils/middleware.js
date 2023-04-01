"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
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
const tokenExtractor = (request, response, next) => {
    const authHeader = request.get('authorization');
    if (!authHeader) {
        request.token = null;
    }
    else if (authHeader.startsWith('Bearer ')) {
        request.token = authHeader.substring(7, authHeader.length);
    }
    else {
        request.token = null;
    }
    next();
};
const middleware = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
};
exports.default = middleware;
