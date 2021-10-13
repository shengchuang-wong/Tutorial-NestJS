import { rm } from "fs/promises"
import { join } from "path"
import { getConnection } from "typeorm"

global.beforeEach(async () => {
  try {
    // remove db file every time we run the test
    await rm(join(__dirname, '..', 'test.sqlite'))
  } catch (err) {

  }
})

global.afterEach(async () => {
  // after each test case, then close the db connecton
  const conn = await getConnection()
  await conn.close()
})