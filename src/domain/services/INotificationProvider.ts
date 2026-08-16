export interface INotificationProvider {
  send(identifier: string, code: string, purpose: string): Promise<void>;
}