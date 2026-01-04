import * as Location from 'expo-location';
import { Alert, Platform } from 'react-native';

class LocationService {
    private static instance: LocationService;
    private currentLocation: Location.LocationObject | null = null;

    private constructor() { }

    public static getInstance(): LocationService {
        if (!LocationService.instance) {
            LocationService.instance = new LocationService();
        }
        return LocationService.instance;
    }

    /**
     * Request foreground and background location permissions
     */
    public async requestPermissions(): Promise<boolean> {
        try {
            const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();

            if (foregroundStatus !== 'granted') {
                Alert.alert(
                    'Permission Denied',
                    'Location access is required to show your position on the map and help responders find you during emergencies.',
                    [{ text: 'OK' }]
                );
                return false;
            }

            // Background permission is optional but helpful for tracking in emergencies
            if (Platform.OS === 'android' || Platform.OS === 'ios') {
                const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
                console.log('Background location status:', backgroundStatus);
            }

            return true;
        } catch (error) {
            console.error('Error requesting location permissions:', error);
            return false;
        }
    }

    /**
     * Get current device coordinates
     */
    public async getCurrentLocation(): Promise<Location.LocationObject | null> {
        try {
            const { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') return null;

            this.currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            return this.currentLocation;
        } catch (error) {
            console.error('Error getting current location:', error);
            return null;
        }
    }

    /**
     * Get the last cached location
     */
    public getLastLocation(): Location.LocationObject | null {
        return this.currentLocation;
    }
}

export const locationService = LocationService.getInstance();
