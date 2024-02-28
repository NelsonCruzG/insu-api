import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().port().default(3000).messages({
    'number.base': 'PORT env. var must be number',
    'number.port': 'PORT env var must be a valid port',
  }),
  JWT_SECRET: Joi.string().required().messages({
    'string.required': 'JWT_SECRET env variable is required but not set',
  }),
  JWT_EXP_TIME: Joi.string().required().messages({
    'string.required': 'JWT_EXP_TIME env variable is required but not set',
  }),
  ORM_DB_HOST: Joi.string().required().messages({
    'string.required': 'ORM_DB_HOST env variable is required but not set',
  }),
  ORM_DB_PORT: Joi.number().required().messages({
    'number.required': 'ORM_DB_PORT env var is required but not set',
  }),
  ORM_DB_USER_NAME: Joi.string().required().messages({
    'string.required': 'ORM_DB_USER_NAME env variable is required but not set',
  }),
  ORM_DB_NAME: Joi.string().required().messages({
    'string.required': 'ORM_DB_NAME env variable is required but not set',
  }),
  ORM_DB_PASSWORD: Joi.string().required().messages({
    'string.required': 'ORM_DB_PASSWORD env variable is required but not set',
  }),
});
