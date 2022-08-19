/* eslint-disable */

declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare function tr(
  id:
    | {
        id: string;
        values?: any;
      }
    | string
): string;
