import { useEffect, useState, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';

interface Notification {
  id?: number;
  type?: string;
  joB_STATUS: any;
  dJ_ID: string;
  seriaL_NO: string;
  machinE_REF_NO: string;
  cuS_NAME: string;
  cuS_ADD1: string;
  cuS_ADD2: string;
  cuS_ADD3: string;
  cuS_CONTACT: string;
  cuS_TEL_NO: string;
  teaM_ID: string;
  teaM_NAME: string;
  dJ_DATE: string;
  tecH_CODE: string;
  tecH_MOBILE: string;
  machinE_MODEL_ID: string;
  machinE_MODEL_NAME: string;
  cuS_STATUS: string;
  note: string;
  jobStatus: string;
}

export const useSignalR = (techCode: string | null) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!techCode) return;

    // ✅ Use environment variable for backend URL
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    console.log('Connecting to SignalR hub at:', apiUrl);

    // Create connection
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}notificationhub?techCode=${techCode}`, {
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets | 
                   signalR.HttpTransportType.ServerSentEvents | 
                   signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000]) // Better retry strategy
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);

    return () => {
      console.log('Cleaning up SignalR connection');
      newConnection?.stop();
    };
  }, [techCode]);

  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        console.log('✅ SignalR Connected with tech code:', techCode);
        setIsConnected(true);

        // Listen for notifications
        connection.on('ReceivingNotifications', (data: any) => {
          console.log('🔔 Notification received:', data);
          
          // Map the complete backend data
          const newNotification: Notification = {
            id: Date.now(),
            type: data.CONTACT_TYPE || 'breakdown',
            dJ_ID: data.DJ_ID || '',
            seriaL_NO: data.SERIAL_NO || '',
            machinE_REF_NO: data.MACHINE_REF_NO || '',
            cuS_NAME: data.CUS_NAME || 'Unknown',
            cuS_ADD1: data.CUS_ADD1 || '',
            cuS_ADD2: data.CUS_ADD2 || '',
            cuS_ADD3: data.CUS_ADD3 || '',
            cuS_CONTACT: data.CUS_CONTACT || '',
            cuS_TEL_NO: data.CUS_TEL_NO || '',
            teaM_ID: data.TEAM_ID || '',
            teaM_NAME: data.TEAM_NAME || '',
            dJ_DATE: data.DJ_DATE || new Date().toISOString(),
            tecH_CODE: data.TECH_CODE || '',
            tecH_MOBILE: data.TECH_MOBILE || '',
            machinE_MODEL_ID: data.MACHINE_MODEL_ID || '',
            machinE_MODEL_NAME: data.MACHINE_MODEL_NAME || '',
            cuS_STATUS: data.CUS_STATUS || '',
            note: data.NOTE || 'New breakdown job',
            jobStatus: data.CUS_STATUS || 'PENDING',
            joB_STATUS: data.CUS_STATUS || 'PENDING',
          };

          setNotifications(prev => [newNotification, ...prev]);
          
          // Optional: Play notification sound
          playNotificationSound();
        });

        // Handle reconnection
        connection.onreconnected((connectionId) => {
          console.log('🔄 SignalR Reconnected:', connectionId);
          setIsConnected(true);
        });

        connection.onreconnecting((error) => {
          console.log('⚠️ SignalR Reconnecting...', error);
          setIsConnected(false);
        });

        connection.onclose((error) => {
          console.log('❌ SignalR Disconnected:', error);
          setIsConnected(false);
        });

      } catch (err) {
        console.error('❌ SignalR Connection Error:', err);
        setIsConnected(false);
        
        // Retry after 5 seconds
        setTimeout(() => {
          console.log('🔄 Retrying connection...');
          startConnection();
        }, 5000);
      }
    };

    startConnection();

    return () => {
      connection.off('ReceivingNotifications');
    };
  }, [connection, techCode]);

  // Optional notification sound
 const playNotificationSound = () => {
  try {
    const audio = new Audio();
    
    // Try multiple formats for browser compatibility
    audio.src = '/notification.mp3';
    audio.volume = 0.5;
    audio.load(); // Preload the audio
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('✅ Notification sound played successfully');
        })
        .catch(err => {
          console.error('⚠️ Sound play failed:', err.message);
          // Fallback: try a different approach
          tryAlternativeSound();
        });
    }
  } catch (err) {
    console.error('❌ Sound not available:', err);
  }
};

const tryAlternativeSound = () => {
  // Fallback using Web Audio API
  try {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    fetch('/notification.mp3')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        source.start();
        console.log('✅ Sound played via Web Audio API');
      })
      .catch(err => console.error('Web Audio API failed:', err));
  } catch (err) {
    console.error('Alternative sound method failed:', err);
  }
};

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notifications,
    isConnected,
    clearNotifications,
    removeNotification,
  };
};