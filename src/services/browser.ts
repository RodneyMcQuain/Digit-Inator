// To pass Next builds this is guard is needed where browser APIs are used, since Next builds run in a headless environment
export const isBrowser = (): boolean => typeof window !== 'undefined';