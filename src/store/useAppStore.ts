import { create } from 'zustand';
import { Role, DisasterRequest } from '../models/types';
import { storageService } from '../services/StorageService';
import { DeviceService } from '../services/DeviceService';
import { transportService } from '../services/TransportService';
import { MockTransportProvider } from '../services/MockTransportProvider';

interface AppState {
  isInitialized: boolean;
  currentRole: Role | null;
  deviceId: string | null;
  requests: DisasterRequest[];

  initApp: () => Promise<void>;
  setRole: (role: Role) => Promise<void>;
  loadRequests: () => Promise<void>;
  addRequest: (request: DisasterRequest) => Promise<void>;
  updateRequestStatus: (id: string, status: any) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  isInitialized: false,
  currentRole: null,
  deviceId: null,
  requests: [],

  initApp: async () => {
    const deviceId = await DeviceService.getDeviceId();
    const role = await DeviceService.getRole();
    await storageService.init();

    // Init Transport
    const mockProvider = new MockTransportProvider();
    transportService.registerProvider(mockProvider);

    transportService.onRequestReceived(async (request) => {
      console.log('Received request:', request.id);
      await storageService.addRequest(request);
      const requests = await storageService.getRequests();
      set({ requests });
    });

    await transportService.startAll();

    const requests = await storageService.getRequests();

    set({
      deviceId,
      currentRole: role,
      requests,
      isInitialized: true
    });
  },

  setRole: async (role: Role) => {
    await DeviceService.setRole(role);
    set({ currentRole: role });
  },

  loadRequests: async () => {
    const requests = await storageService.getRequests();
    set({ requests });
  },

  addRequest: async (request: DisasterRequest) => {
    await storageService.addRequest(request);
    const requests = await storageService.getRequests();
    set({ requests });
    transportService.broadcast(request);
  },

  updateRequestStatus: async (id: string, status: any) => {
    const { deviceId } = get();
    const historyEntry = {
      status,
      timestamp: Date.now(),
      updatedBy: deviceId || 'unknown'
    };
    await storageService.updateRequestStatus(id, status, historyEntry);
    const requests = await storageService.getRequests();
    set({ requests });
    // Should also broadcast the update
  }
}));
