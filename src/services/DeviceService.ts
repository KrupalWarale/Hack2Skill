import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Role } from '../models/types';

const DEVICE_ID_KEY = 'device_id';
const ROLE_KEY = 'user_role';

export const DeviceService = {
  getDeviceId: async (): Promise<string> => {
    let id = await AsyncStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = uuid.v4() as string;
      await AsyncStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  },
  
  getRole: async (): Promise<Role | null> => {
    const role = await AsyncStorage.getItem(ROLE_KEY);
    return role as Role | null;
  },
  
  setRole: async (role: Role) => {
    await AsyncStorage.setItem(ROLE_KEY, role);
  }
};
