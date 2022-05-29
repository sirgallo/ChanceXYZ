export type Volts<T> = {
  [ K in keyof T ]: string
}