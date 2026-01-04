/**
 * Error handling utilities for production
 * Categorizes errors into network or generic errors with user-friendly messages
 */

export type ErrorType = 'network' | 'generic'

export interface UserError {
  type: ErrorType
  message: string
}

/**
 * Determines if an error is network-related
 */
function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) {
    // Network failures in fetch often throw TypeError
    const message = error.message.toLowerCase()
    return (
      message.includes('fetch') ||
      message.includes('network') ||
      message.includes('failed to fetch') ||
      message.includes('networkerror') ||
      message.includes('connection')
    )
  }

  // Check for fetch Response errors
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as any).status
    // Network-level HTTP errors
    return status === 0 || status === 408 || status === 503 || status === 504
  }

  return false
}

/**
 * Converts any error into a user-friendly error message
 * Returns either a network error or generic error
 */
export function getUserError(error: unknown): UserError {
  // Check if it's a network error
  if (isNetworkError(error)) {
    return {
      type: 'network',
      message: 'Network connection error. Please check your internet connection and try again.',
    }
  }

  // All other errors are generic
  return {
    type: 'generic',
    message: 'Something went wrong. Please try again.',
  }
}

/**
 * Logs errors in development only
 */
export function logError(context: string, error: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error)
  }
}
