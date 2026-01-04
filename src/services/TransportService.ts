import { DisasterRequest } from '../models/types';

export interface TransportProvider {
  name: string;
  isAvailable: boolean;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  broadcastRequest: (request: DisasterRequest) => Promise<void>;
  onRequestReceived: (callback: (request: DisasterRequest) => void) => void;
}

export class TransportService {
  private providers: TransportProvider[] = [];
  private receivedCallbacks: ((request: DisasterRequest) => void)[] = [];

  registerProvider(provider: TransportProvider) {
    this.providers.push(provider);
    provider.onRequestReceived((request) => {
      this.handleReceivedRequest(request);
    });
  }

  async startAll() {
    await Promise.all(this.providers.map(p => p.start()));
  }

  async stopAll() {
    await Promise.all(this.providers.map(p => p.stop()));
  }

  async broadcast(request: DisasterRequest) {
    const promises = this.providers
      .filter(p => p.isAvailable)
      .map(p => p.broadcastRequest(request).catch(console.error));
    await Promise.all(promises);
  }

  onRequestReceived(callback: (request: DisasterRequest) => void) {
    this.receivedCallbacks.push(callback);
  }

  private handleReceivedRequest(request: DisasterRequest) {
    this.receivedCallbacks.forEach(cb => cb(request));
  }
}

export const transportService = new TransportService();
