import MapView, { Marker, Circle, Region } from 'react-native-maps';
import { View, Text, StyleSheet, Pressable, PanResponder, Dimensions } from 'react-native';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';

export default function MapScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const { width } = Dimensions.get('window');

  const [patientLocation, setPatientLocation] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  // Safe zone state
  const [safeZone, setSafeZone] = useState({
    center: { latitude: 37.78825, longitude: -122.4324 },
    radius: 100 // initial radius
  });

  const [isDraggingEdge, setIsDraggingEdge] = useState(false);

  // PanResponder for resizing the circle by dragging the edge
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => setIsDraggingEdge(true),
      onPanResponderMove: (evt, gestureState) => {
        if (!mapRef.current) return;

        const { locationX, locationY } = evt.nativeEvent;
        mapRef.current.pointForCoordinate(safeZone.center).then(centerPoint => {
          // Calculate distance in pixels from center to touch
          const dx = locationX - centerPoint.x;
          const dy = locationY - centerPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Convert pixels to approximate meters using latitudeDelta
          const radiusMeters = (distance / width) * patientLocation.latitudeDelta * 111320;
          setSafeZone(prev => ({ ...prev, radius: Math.max(50, radiusMeters) }));
        });
      },
      onPanResponderRelease: () => setIsDraggingEdge(false)
    })
  ).current;

  // Solid header
  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>Patient Location</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={patientLocation}
      >
        {/* Patient Marker */}
        <Marker
          coordinate={patientLocation}
          title="Patient"
          pinColor="#4ADE80"
        />

        {/* Safe Zone Circle */}
        <Circle
          center={safeZone.center}
          radius={safeZone.radius}
          strokeColor="rgba(99,102,241,0.5)"
          fillColor="rgba(99,102,241,0.15)"
        />

        {/* Safe Zone Center Marker (draggable) */}
        <Marker
          coordinate={safeZone.center}
          draggable
          pinColor="#6366F1"
          onDragEnd={e =>
            setSafeZone(prev => ({
              ...prev,
              center: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              }
            }))
          }
        />
      </MapView>

      {header}

      {/* Confirm Button */}
      <View style={styles.bottom}>
        <Pressable style={styles.confirmBtn} onPress={() => alert('Safe zone set!')}>
          <Text style={styles.confirmText}>Confirm Safe Zone</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  header: {
    position: 'absolute',
    top: 50,
    left: 24,
    right: 24,
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 16
  },
  title: { fontSize: 20, fontWeight: '800', color: '#e5e7eb' },
  bottom: {
    position: 'absolute',
    bottom: 50,
    left: 24,
    right: 24,
    alignItems: 'center'
  },
  confirmBtn: {
    backgroundColor: '#EC4899',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16
  },
  confirmText: { color: '#fff', fontWeight: '700', fontSize: 16 }
});
