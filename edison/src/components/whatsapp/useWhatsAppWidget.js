import { useState, useCallback } from 'react';

/**
 * Genera la hora formateada para los mensajes (HH:mm).
 * @returns {string} Hora formateada.
 */
const getFormattedTimestamp = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Hook para la gestión del chat conversacional interactivo integrado con Make.com y Google Tag Manager.
 *
 * @param {Object} options Configuración del widget.
 * @param {string} options.phoneNumber Teléfono de respaldo para WhatsApp.
 * @param {string} options.welcomeMessage Mensaje de bienvenida inicial.
 * @param {string} options.initialMessage Mensaje precargado en el formulario.
 * @param {string} options.eventCustomName Evento para GTM dataLayer.
 * @param {string} options.makeWebhookUrl URL del webhook en Make.com.
 * @returns {Object} Estados y manejadores de interacción.
 */
export const useWhatsAppWidget = ({
  phoneNumber = '573185735382',
  welcomeMessage = '¡Hola! 👋 Gracias por visitar mi portafolio. Cuéntame sobre tu proyecto o consulta técnica.',
  initialMessage = '',
  eventCustomName = 'whatsapp_click',
  makeWebhookUrl = 'https://hook.us2.make.com/jt5r7jvtrodngsjka1atkwkrt5ol3ct7'
} = {}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasUnreadBadge, setHasUnreadBadge] = useState(true);
  const [inputText, setInputText] = useState(initialMessage);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-initial-msg',
      sender: 'assistant',
      text: welcomeMessage,
      timestamp: getFormattedTimestamp()
    }
  ]);

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

  const handleInputChange = useCallback((event) => {
    setInputText(event.target.value);
  }, []);

  const sendMessage = useCallback(async (event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    const trimmedUserMessage = inputText.trim();
    if (!trimmedUserMessage || isTyping) {
      return;
    }

    const userMessageId = `user-msg-${Date.now()}`;
    const userTimestamp = getFormattedTimestamp();

    // 1. Agregar mensaje del usuario a la conversación
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: userMessageId,
        sender: 'user',
        text: trimmedUserMessage,
        timestamp: userTimestamp
      }
    ]);

    // Limpiar input y activar estado "escribiendo"
    setInputText('');
    setIsTyping(true);

    // 2. Disparar evento a Google Tag Manager (dataLayer)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventCustomName,
        whatsapp_phone: phoneNumber,
        whatsapp_source: 'portfolio_embedded_chat',
        whatsapp_message_length: trimmedUserMessage.length,
        timestamp: new Date().toISOString()
      });
    }

    // 3. Enviar mensaje de forma asíncrona hacia el Webhook de Make.com
    try {
      const response = await fetch(makeWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*'
        },
        body: JSON.stringify({
          message: trimmedUserMessage,
          sender: 'visitante_web',
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }

      let rawResponseText = '';
      let parsedResponse = null;

      if (typeof response.text === 'function') {
        rawResponseText = await response.text();
        try {
          parsedResponse = JSON.parse(rawResponseText);
        } catch {
          // Texto plano normal
        }
      } else if (typeof response.json === 'function') {
        parsedResponse = await response.json();
      }

      let assistantReplyText = '';
      if (parsedResponse && typeof parsedResponse === 'object') {
        assistantReplyText =
          parsedResponse.reply ||
          parsedResponse.message ||
          parsedResponse.response ||
          parsedResponse.text ||
          (Array.isArray(parsedResponse) ? parsedResponse[0] : rawResponseText);
      } else if (typeof parsedResponse === 'string') {
        assistantReplyText = parsedResponse;
      } else {
        assistantReplyText = rawResponseText ? rawResponseText.trim() : '';
      }

      if (!assistantReplyText) {
        assistantReplyText = '¡He recibido tu mensaje! Pronto me comunicaré contigo.';
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: `assistant-msg-${Date.now()}`,
          sender: 'assistant',
          text: assistantReplyText,
          timestamp: getFormattedTimestamp()
        }
      ]);
    } catch {
      // Mensaje de respaldo con opción a WhatsApp directo
      const fallbackUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(trimmedUserMessage)}`;
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: `fallback-msg-${Date.now()}`,
          sender: 'assistant',
          text: 'Gracias por tu mensaje. Se ha registrado tu consulta en mi sistema. También puedes tocar aquí para continuar por WhatsApp si requieres respuesta inmediata.',
          fallbackUrl,
          isFallback: true,
          timestamp: getFormattedTimestamp()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [eventCustomName, inputText, isTyping, makeWebhookUrl, phoneNumber]);

  return {
    isChatOpen,
    hasUnreadBadge,
    inputText,
    messages,
    isTyping,
    toggleChat,
    openChat,
    closeChat,
    handleInputChange,
    sendMessage
  };
};

export default useWhatsAppWidget;
