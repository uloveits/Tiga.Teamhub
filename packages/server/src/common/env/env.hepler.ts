/*
 * @Author: wangxian
 * @Date: 2022-09-01 08:31:48
 * @LastEditTime: 2022-09-01 09:25:55
 */
import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `${env}.env` : 'prod.env';
  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  console.log('getEnvPath', filePath, process.env.NODE_ENV);

  return filePath;
}
