export type Role = 'request_sender' | 'request_transporter' | 'request_handler';

export type RequestStatus = 'created' | 'forwarded' | 'received' | 'acknowledged' | 'resolved';

export interface DeviceIdentity {
  id: string; // UUID
  role: Role;
}

export interface DisasterRequest {
  id: string;
  timestamp: number;
  senderId: string;
  type: string; // e.g., 'medical', 'supplies', 'rescue', 'info'
  description: string;
  status: RequestStatus;
  statusHistory: {
    status: RequestStatus;
    timestamp: number;
    updatedBy: string; // device ID
  }[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface Peer {
  id: string;
  role: Role;
  lastSeen: number;
  isConnected: boolean;
}
