import { Controller, Get } from "@nestjs/common";

// @Controller('/app')
// export class AppController {
//   @Get('/home')
//   getRootRoute() {
//     return 'hi there'
//   }
// }

@Controller()
export class AppController {
  @Get()
  getRootRoute() {
    return 'hi there'
  }
}