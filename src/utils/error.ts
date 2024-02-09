import type { NextFunction } from "express";

export type TError = Error & {
  statusCode?: number;
  data?: Array<any> | Object;
}

export function throwError(message: string, statusCode?: number, data?: Array<any> | Object) {
  const error: TError = new Error(message);
  error.statusCode = statusCode;
  error.data = data;

  throw error;
}

export function catchError(error: TError, next: NextFunction) {
  if (!error.statusCode) {
    error.statusCode = 500;
  }

  next (error);
}