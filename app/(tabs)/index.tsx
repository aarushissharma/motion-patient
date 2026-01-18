import { View, Text, TextInput, Switch, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function Onboarding() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [contacts, setContacts] = useState(false);

  const handleContinue = () => {
    if (!name || !code) return;
    router.push({
      pathname: '/dashboard',
      params: { name }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Motion</Text>
      <Text style={styles.subtitle}>
        Real-time fall detection & safety monitoring
      </Text>

      <Text style={styles.label}>Patient Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter patient name"
        placeholderTextColor="#9CA3AF"
      />

      <Text style={styles.label}>Patient QR / Code</Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="Enter pairing code"
        placeholderTextColor="#9CA3AF"
      />

      {/* Permissions */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Notifications</Text>
        <Switch 
          value={notifications} 
          onValueChange={setNotifications} 
          trackColor={{ true: '#8b5cf6', false: '#374151' }}
          thumbColor={notifications ? '#e5e7eb' : '#9CA3AF'}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Location Access</Text>
        <Switch 
          value={location} 
          onValueChange={setLocation} 
          trackColor={{ true: '#8b5cf6', false: '#374151' }}
          thumbColor={location ? '#e5e7eb' : '#9CA3AF'}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Contacts Access</Text>
        <Switch 
          value={contacts} 
          onValueChange={setContacts} 
          trackColor={{ true: '#8b5cf6', false: '#374151' }}
          thumbColor={contacts ? '#e5e7eb' : '#9CA3AF'}
        />
      </View>

      <Pressable style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#e5e7eb',
    textAlign: 'center',
    marginBottom: 6
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#9CA3AF'
  },
  label: {
    fontSize: 16,
    color: '#e5e7eb',
    marginBottom: 4,
    alignSelf: 'flex-start'
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    color: '#e5e7eb',
    marginBottom: 16
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    paddingHorizontal: 6
  },
  switchLabel: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '500'
  },
  button: {
    width: '100%',
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 14,
    marginTop: 25,
    shadowColor: '#8b5cf6',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500'
  }
});
