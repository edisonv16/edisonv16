import { useState, useCallback } from 'react';

/**
 * Hook para la gestión del estado, interacciones y tracking del widget de WhatsApp.
 *
 * @param {Object} options Parámetros de configuración del widget.
 * @param {string} options.phoneNumber Número de teléfono en formato internacional (ej. '573185735382').
 * @param {string} options.initialMessage Mensaje inicial predeterminado.
 * @param {string} options.eventCustomName Nombre del evento para Google Tag Manager.
 * @returns {Object} Estados y controladores para el componente visual.
 */
export const useWhatsAppWidget = ({
  phoneNumber = '573185735382',
  initialMessage = '',
  eventCustomName = 'whatsapp_click'
} = {}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasUnreadBadge, setHasUnreadBadge] = useState(true);
  const [messageText, setMessageText] = useState(initialMessage);

  const toggleChat = useCallback(() => {
    setIsChatOpen((previousState) => !previousState);
    setHasUnreadBadge(false);
  }, []);

  const openChat = useCallback(() => {
    setIsChatOpen(true);
    setHasUnreadBadge(false);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  const handleMessageChange = useCallback((event) => {
    setMessageText(event.target.value);
  }, []);

  const sendMessage = useCallback((event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) {
      return;
    }

    // 1. Envío del evento al dataLayer de Google Tag Manager
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventCustomName,
        whatsapp_phone: phoneNumber,
        whatsapp_source: 'portfolio_floating_widget',
        whatsapp_message_length: trimmedMessage.length,
        timestamp: new Date().toISOString()
      });
    }

    // 2. Redirección a WhatsApp Web / App
    const encodedMessage = encodeURIComponent(trimmedMessage);
    const targetWhatsAppUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(targetWhatsAppUrl, '_blank', 'noopener,noreferrer');

    // 3. Cerrar la ventana tras enviar
    setIsChatOpen(false);
  }, [eventCustomName, messageText, phoneNumber]);

  return {
    isChatOpen,
    hasUnreadBadge,
    messageText,
    toggleChat,
    openChat,
    closeChat,
    handleMessageChange,
    sendMessage
  };
};

export default useWhatsAppWidget;
