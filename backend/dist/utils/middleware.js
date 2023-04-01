"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("./logger"));
const user_1 = __importDefault(require("../models/user"));
// export type token = string
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
const userExtractor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = request.token;
        if (token === null || token === undefined)
            return response.status(401).json('authorization error');
        console.log(token);
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        if (!decodedToken.id) {
            return response.status(401).json('Token invalid');
        }
        request.user = yield user_1.default.findById(decodedToken.id);
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return response.status(401).json('invalid token');
        }
    }
    next();
});
const middleware = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
};
exports.default = middleware;
