export declare const commands: (program: any) => void
export declare const checkStatus: (options: { silent?: boolean }) => Promise<any | null>
export declare const addKongApi: (
  name: string,
  hosts: string,
  upstream: string,
  uris: string,
  options: { 
    preservehost?: boolean
    stripuri?: boolean
    silent?: boolean 
  }
) => Promise<any | null>
export declare const listApis: (options: { silent?: boolean }) => Promise<any[] | null>
export declare const dropApi: (name: string, options: { silent?: boolean }) => Promise<boolean>
export declare const startKongServer: (options: { port: number, silent?: boolean }) => Promise<void>
export declare const stopKongServer: (options: { silent?: boolean }) => Promise<void>
