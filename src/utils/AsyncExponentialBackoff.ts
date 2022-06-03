import { sleep } from '@app/utils/Utils';

export async function asyncExponentialBackoff(
  endpoint: string,
  retries: number, 
  timeout: number, 
  reqFunction: Function, 
  request: any,
  depth = 1): Promise<any> {
  try {
    if (depth > retries) throw new Error(`Exceeded Max Retries: ${retries}`)
    else return await reqFunction(endpoint, request)
  } catch (err) {
    if (depth > retries) throw err
    else {
      const newTimeout = 2 * depth * timeout

      console.log(`Moving to attempt: ${depth}`)
      console.log(`Waiting for: ${newTimeout}`)

      await sleep(newTimeout)
      return await asyncExponentialBackoff(endpoint, retries, timeout, reqFunction, request, depth + 1)
    }
  }
}