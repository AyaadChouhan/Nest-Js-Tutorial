Controllers.....

Controllers are responsible for handling incoming requests and returning responses to the clien.

 The routing mechanism controls which controller receives which requests. Frequently, each controller has more than one route, and different routes can perform different actions.

syntax..
import { Controller, Get } from '@nestjs/common'; //first we need to import before use the controller

@Controller() //we can also set endpoint in controller..
export class AlbumController { 
  @Get('/find')
  findAll(): string {
    return 'this action returns all photos';
  }
}

The @Get() HTTP request method decorator before the findAll() method tells Nest to create a handler for a specific endpoint for HTTP requests.

Decorators are special types of functions in TypeScript that allow you to add metadata or modify classes, methods, or parameters.
In NestJS, route decorators like @Get(), @Post(), @Delete(), etc., help define how the app should respond to specific HTTP requests (like GET, POST, DELETE) by mapping them to specific methods in a controller.
So, these route decorators essentially perform routing, which directs incoming requests to the correct controller method.

Note=> what is handlers = handlers are what we passed in decorators @Get('/find') 


difference between endpoints and handlers..

Endpoints are the specific URL paths that an application exposes to clients. They represent the entry points for making HTTP requests to a server.
An endpoint is defined by a combination of the HTTP method (GET, POST, PUT, DELETE, etc.) and the URL path.
For example, /users and /users/:id are endpoints.
Handlers:
Handlers are the methods or functions in your code that process requests made to those endpoints.
They contain the logic to handle the request, such as querying a database, processing data, and returning a response


//=======================================================
Request Object...

@Req(): This decorator is used to inject the Express Request object into a handler method. When you use @Req(), NestJS provides the native Express request object as an argument to your method.

import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('example')
export class ExampleController {
  @Get()
  handleRequest(@Req() request: Request): string {
    console.log('Request headers:', request.headers);
    console.log('Request query parameters:', request.query);
    console.log('Request body:', request.body);
    return 'Request details logged';
  }
}

Request from express is the type definition that describes the structure of the Express request object.
@Req() is a decorator used in NestJS to inject the Express Request object into your route handler method, allowing you to access request details directly.

//=======================================================
Status code...

As mentioned, the response status code is always 200 by default, except for POST requests which are 201. We can easily change this behavior by adding the @HttpCode(...) decorator at a handler level

syntax:
import { HttpCode, Get, Controller } from '@nestjs/common'

@Controller('users')
export class CreateHttpCode{
  @Get('/CheckCode')
 @HttpCode(101) // there it the status which we are changing here what we want..
 getCode(): string {
  return 'we got status code';
 }
}