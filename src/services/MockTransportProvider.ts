import { TransportProvider } from './TransportService';
import { DisasterRequest } from '../models/types';

export class MockTransportProvider implements TransportProvider {
    name = 'Mock';
    isAvailable = true;
    private receiveCallback: ((request: DisasterRequest) => void) | null = null;

    async start() {
        console.log('Mock Transport Started');
    }

    async stop() {
        console.log('Mock Transport Stopped');
    }

    async broadcastRequest(request: DisasterRequest) {
        console.log('[MockTransport] Broadcasting:', request.id);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    onRequestReceived(callback: (request: DisasterRequest) => void) {
        this.receiveCallback = callback;
    }

    simulateIncomingRequest(request: DisasterRequest) {
        if (this.receiveCallback) {
            this.receiveCallback(request);
        }
    }
}
