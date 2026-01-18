import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

export default function Dashboard() {
  const { name } = useLocalSearchParams<{ name: string }>(); // patient name from first screen
  const router = useRouter();
  const [status, setStatus] = useState<'Safe' | 'Fall'>('Safe');

  const triggerFall = () => {
    setStatus('Fall');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Pressable onPress={() => router.push('/notifs')}>
          <Text style={styles.bell}>🔔</Text>
        </Pressable>
      </View>

      {/* Patient Status Card */}
      <View style={[styles.statusCard, status === 'Safe' ? styles.normal : styles.fall]}>
        {/* Patient Name inside the card */}
        {name && <Text style={styles.patientName}>{name}</Text>}

        <Text style={styles.statusText}>
          {status === 'Safe' ? '🟢 Safe' : '🔴 Fall Detected'}
        </Text>
        <Text style={styles.subText}>Last movement: Just now</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionText}>Call Patient</Text>
        </Pressable>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionText}>Send Message</Text>
        </Pressable>
        <Pressable style={styles.actionBtn} onPress={() => router.push('/map')}>
          <Text style={styles.actionText}>Open Map</Text>
        </Pressable>
      </View>

      {/* Simulate Fall Button */}
      <Pressable style={[styles.simulateBtn, styles.fallBtn]} onPress={triggerFall}>
        <Text style={styles.actionText}>Simulate Fall</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 28,
    backgroundColor: '#020617', // dark gradient base
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60, // moves everything down
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.5,
    color: '#e5e7eb',
  },
  bell: {
    fontSize: 26,
    color: '#e5e7eb',
  },
  statusCard: {
    width: '100%',
    padding: 22,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  patientName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 6, // spacing between name and status
  },
  normal: {
    shadowColor: '#4ade80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  fall: {
    shadowColor: '#f87171',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#e5e7eb',
  },
  subText: {
    fontSize: 14,
    color: '#e5e7eb',
    opacity: 0.6,
  },
  quickActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: 4,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#6366f1',
    shadowColor: '#8b5cf6',
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  fallBtn: {
    backgroundColor: '#f87171',
    shadowColor: '#f87171',
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  simulateBtn: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
  },
});
