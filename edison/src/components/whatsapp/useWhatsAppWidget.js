import { useState, useCallback } from 'react';
import { extractAssistantReply } from './chatResponseParser';

/**
 * Genera la hora formateada para los mensajes (HH:mm).
 * @returns {string} Hora formateada.
 */
const getFormattedTimestamp = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Opciones interactivas rápidas iniciales para el usuario.
 */
export const DEFAULT_QUICK_OPTIONS = [
  { id: 'agenda', label: '📅 Agendar cita', action: 'agenda' },
  { id: 'portfolio', label: '💼 Preguntar sobre mi portafolio', action: 'portfolio' },
  { id: 'direct', label: '💬 Hablar directamente con Edison', action: 'direct' }
];

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

  const addAssistantMessage = useCallback((replyText) => {
    if (!replyText) {
      return;
    }
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: `assistant-msg-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: getFormattedTimestamp()
      }
    ]);
  }, []);

  const sendMessage = useCallback(
    async (eventOrMessageText = null) => {
      let messageToSend = '';
      if (typeof eventOrMessageText === 'string') {
        messageToSend = eventOrMessageText.trim();
      } else {
        if (eventOrMessageText && typeof eventOrMessageText.preventDefault === 'function') {
          eventOrMessageText.preventDefault();
        }
        messageToSend = inputText.trim();
      }

      if (!messageToSend || isTyping) {
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
          text: messageToSend,
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
          whatsapp_message_length: messageToSend.length,
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
            message: messageToSend,
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
            // Si no es JSON estándar se procesa de forma resiliente con extractAssistantReply
          }
        } else if (typeof response.json === 'function') {
          parsedResponse = await response.json();
        }

        let assistantReplyText = extractAssistantReply(rawResponseText, parsedResponse);

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
        const fallbackUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageToSend)}`;
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
    },
    [inputText, isTyping, eventCustomName, phoneNumber, makeWebhookUrl]
  );

  const handleQuickOption = useCallback(
    (quickOption) => {
      if (!quickOption) {
        return;
      }

      if (quickOption.action === 'direct') {
        const directGreeting = encodeURIComponent(
          'Hola Edison, estuve revisando tu portafolio web y me gustaría hablar directamente contigo.'
        );
        const directWhatsAppUrl = `https://wa.me/${phoneNumber}?text=${directGreeting}`;
        if (typeof window !== 'undefined') {
          window.open(directWhatsAppUrl, '_blank', 'noopener,noreferrer');
        }
        return;
      }

      if (quickOption.action === 'agenda') {
        sendMessage('Hola Edison, me gustaría agendar una reunión o cita para conversar sobre una oportunidad.');
        return;
      }

      if (quickOption.action === 'portfolio') {
        addAssistantMessage(
          '¡Excelente! Cuéntame qué te gustaría saber. Puedes preguntarme sobre mi experiencia liderando arquitecturas frontend, proyectos de alta escala en Sodimac Colombia, stack tecnológico o casos de éxito.'
        );
      }
    },
    [phoneNumber, sendMessage, addAssistantMessage]
  );

  return {
    isChatOpen,
    hasUnreadBadge,
    inputText,
    messages,
    isTyping,
    quickOptions: DEFAULT_QUICK_OPTIONS,
    toggleChat,
    openChat,
    closeChat,
    handleInputChange,
    sendMessage,
    handleQuickOption,
    addAssistantMessage
  };
};

export default useWhatsAppWidget;
