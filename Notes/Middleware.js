In NestJS, middleware functions are used to handle incoming requests before they reach the controller. Middleware can perform various tasks such as logging, authentication, or modifying the request object.

Creating Middleware....

Basic Middleware Example: Middleware in NestJS is a function that has access to the request (req), response (res), and the next() function. The next() function is used to pass control to the next middleware or route handler.

there are two types of Middleware...

1) Global Middleware
2) Module Based Middleware


Global Middleware:
You can apply middleware globally by using app.use() in the main application file

Exmaple=>

import { NestFactory } from '@nestjs/core';
import { AppModule } from './Root.module';
// import { UserModule } from './user/user.module';
import { NextFunction } from 'express';

function gloabalMiddleWare(
  res?: Response,
  req?: Request,
  next?: NextFunction,
): void {
  console.log('this is the global middleware number');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(gloabalMiddleWare);
  await app.listen(3000);
}
bootstrap();

Note : whenever we route somthing this global middleware will be execute.


=======================================================
Module Based Middleware..
this middleware Applied to specific routes.

example..
Note :in this code we are creating a middleware for specific module..

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class BookMiddleware implements NestMiddleware {
  use(req?: Request, res?: Response, next?: NextFunction) {
    const protocol = req.protocol;
    const host = req.get('host');
    const url = req.originalUrl;
    const method = req.method;
    const date = new Date().toDateString();
    console.log('Requesto...');
    console.log(`${protocol}//:${host}/${url}/${method} ${date}`);
    next();
  }
}

Note: in the Exmaple below we are applying middleware, To apply middleware, you must register it inside the module.
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BooksController } from './book.controller';
import { BookMiddleware } from './logger.Middleware';

@Module({
  controllers: [BooksController],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BookMiddleware).forRoutes('books');
  }
}

Middleware Parameters:
req: The HTTP request object.
res: The HTTP response object.
next: A callback function to pass control to the next middleware function or route handler.

Example Workflow:
Client Request: The client sends an HTTP request.
Middleware Execution: Middleware functions are executed in the order they are registered.
Route Handling: Once middleware functions have completed, the request is passed to the appropriate route handler.

Common Use Cases for Middleware:
Logging: Track requests and their details (as shown in the example).
Authentication: Validate tokens or session data.
Error Handling: Intercept errors and provide custom responses.
Request Modifications: Add headers or modify request objects.