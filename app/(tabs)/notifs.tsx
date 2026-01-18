import { View, Text, Pressable, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

// Sample alert data
const sampleAlerts = [
  {
    id: '1',
    type: 'Fall detected',
    time: '2026-01-17 10:23 AM',
    location: '123 Main St, City',
    actions: ['Call patient', 'Check map', 'Notify caregiver']
  },
  {
    id: '2',
    type: 'Safe zone breach',
    time: '2026-01-16 08:10 PM',
    location: '456 Park Ave, City',
    actions: ['Call patient', 'Notify caregiver']
  },
  {
    id: '3',
    type: 'Manual SOS',
    time: '2026-01-15 03:50 PM',
    location: '789 Elm St, City',
    actions: ['Call patient', 'Notify caregiver', 'Check map']
  }
];

export default function Alerts() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const router = useRouter();

  if (selectedAlert) {
    // Detail view
    return (
      <ScrollView contentContainerStyle={styles.detailContainer}>
        <Text style={styles.detailTitle}>{selectedAlert.type}</Text>
        
        <Text style={styles.detailLabel}>Time:</Text>
        <Text style={styles.detailText}>{selectedAlert.time}</Text>

        <Text style={styles.detailLabel}>Location:</Text>
        <Text style={styles.detailText}>{selectedAlert.location}</Text>

        <Text style={styles.detailLabel}>Recommended Actions:</Text>
        {selectedAlert.actions.map((action: string, index: number) => (
          <Text key={index} style={styles.detailText}>• {action}</Text>
        ))}

        <Pressable
          style={styles.resolveButton}
          onPress={() => setSelectedAlert(null)}
        >
          <Text style={styles.resolveButtonText}>Acknowledge / Resolve</Text>
        </Pressable>
      </ScrollView>
    );
  }

  // List view
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alert Feed</Text>
      <FlatList
        data={sampleAlerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.alertCard}
            onPress={() => setSelectedAlert(item)}
          >
            <Text style={styles.alertType}>{item.type}</Text>
            <Text style={styles.alertTime}>{item.time}</Text>
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60, // heading lower
    backgroundColor: '#020617'
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 20,
    textAlign: 'center'
  },
  alertCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12
  },
  alertType: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e5e7eb'
  },
  alertTime: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4
  },
  detailContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    backgroundColor: '#020617'
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#e5e7eb',
    marginBottom: 20,
    textAlign: 'center'
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e5e7eb',
    marginTop: 12
  },
  detailText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 4
  },
  resolveButton: {
    marginTop: 30,
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOpacity: 0.35,
    shadowRadius: 10
  },
  resolveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  }
});
