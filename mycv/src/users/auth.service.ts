import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private uesrsService: UsersService) {}

  async signup(email: string, password: string) {
    // see if email is in use
    const users = await this.uesrsService.find(email)
    if (users.length) {
      throw new BadRequestException('email in use')
    }

    // hash the user password
    // Generate a salt
    const salt = randomBytes(8).toString('hex')
    
    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer

    // Join the hashed result and the result
    const result = salt + '.' + hash.toString('hex')

    // create a new user and save it
    const user = await this.uesrsService.create(email, result)

    // return the user
    return user
  }
  
  async signin(email: string, password: string) {
    // [user] mean get the 1st element from the results
    const [user] = await this.uesrsService.find(email)

    if (!user) {
      throw new NotFoundException('user not found')
    }

    const [salt, storedHash] = user.password.split('.')

    const hash = (await scrypt(password, salt, 32)) as Buffer

    if (storedHash === hash.toString('hex')) {
      return user
    } else {
      throw new BadRequestException('invalid credentials')
    }
  }
}