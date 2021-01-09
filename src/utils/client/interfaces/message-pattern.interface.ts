/**
 * Interface for message pattern used to send request to microservice
 *
 * - @property {string} role
 * - @property {string} cmd
 * - @property {*} metadata?
 *
 */
export interface IMessagePattern {
  role: string;
  cmd: string;
  metadata?: any;
  type?: string;
}
