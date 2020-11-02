/**
 * Interface for Microservice pattern
 * 
 * - @property {string} role
 * - @property {string} cmd
 * - @property {*} metadata? 
 * 
 */
export interface IMicroservicePattern {
    role: string,
    cmd: string,
    metadata?: any,
}