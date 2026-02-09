import { useEffect, useState, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';

interface Notification {
    id?:number
    type?:string
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

    // Create connection
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7249/notificationhub?techCode=${techCode}`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);

    return () => {
      newConnection?.stop();
    };
  }, [techCode]);

  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        console.log('SignalR Connected with tech code:', techCode);
        setIsConnected(true);

        // Listen for notifications
        connection.on('ReceivingNotifications', (data: any) => {
          console.log('Notification received:', data);
          
          // Transform backend data to notification format
          const newNotification: Notification = {
              id: Date.now(), // Use timestamp as unique ID
              type: data.CONTACT_TYPE || 'breakdown',
              machinE_REF_NO: `New Job: ${data.MACHINE_REF_NO}`,
              note: `${data.NOTE || 'New breakdown job'} - ${data.CUS_ADD1}`,
              dJ_DATE: 'Just now',
              joB_STATUS: undefined,
              dJ_ID: '',
              seriaL_NO: '',
              cuS_NAME: '',
              cuS_ADD1: '',
              cuS_ADD2: '',
              cuS_ADD3: '',
              cuS_CONTACT: '',
              cuS_TEL_NO: '',
              teaM_ID: '',
              teaM_NAME: '',
              tecH_CODE: '',
              tecH_MOBILE: '',
              machinE_MODEL_ID: '',
              machinE_MODEL_NAME: '',
              cuS_STATUS: '',
              jobStatus: ''
          };

          setNotifications(prev => [newNotification, ...prev]);
        });

        // Handle reconnection
        connection.onreconnected(() => {
          console.log('SignalR Reconnected');
          setIsConnected(true);
        });

        connection.onreconnecting(() => {
          console.log('SignalR Reconnecting...');
          setIsConnected(false);
        });

        connection.onclose(() => {
          console.log('SignalR Disconnected');
          setIsConnected(false);
        });

      } catch (err) {
        console.error('SignalR Connection Error:', err);
        setIsConnected(false);
        
        // Retry after 5 seconds
        setTimeout(() => startConnection(), 5000);
      }
    };

    startConnection();

    return () => {
      connection.off('ReceivingNotifications');
    };
  }, [connection, techCode]);

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