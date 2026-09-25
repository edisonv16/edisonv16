import { useRef, useEffect } from 'react';
import Info from '../../data/Info';
import useWhatsAppWidget from './useWhatsAppWidget';

/**
 * Renderiza el contenido del mensaje dando formato de énfasis a texto entre asteriscos dobles (**texto**).
 *
 * @param {string} messageContent Contenido del mensaje.
 * @returns {React.ReactNode} Nodos React renderizables.
 */
const renderMessageContent = (messageContent) => {
  if (!messageContent) {
    return null;
  }
  if (!messageContent.includes('**')) {
    return messageContent;
  }

  const contentParts = messageContent.split(/(\*\*[^*]+\*\*)/g);
  return contentParts.map((contentChunk, chunkIndex) => {
    if (contentChunk.startsWith('**') && contentChunk.endsWith('**')) {
      const boldText = contentChunk.slice(2, -2);
      return (
        <strong key={`bold-chunk-${chunkIndex}`} className="whatsapp-card__text-bold">
          {boldText}
        </strong>
      );
    }
    return contentChunk;
  });
};

/**
 * Widget de chat conversacional interactivo integrado con Make.com y Google Tag Manager.
 * Permite interactuar directamente en el portafolio sin salir a WhatsApp.
 *
 * @param {Object} props Propiedades del componente.
 * @param {Object} [props.widgetConfig] Configuración opcional del widget.
 */
const WhatsAppChatWidget = ({ widgetConfig = Info.whatsapp } = {}) => {
  const {
    phoneNumber = '573185735382',
    operatorName = 'Edison Vidal Ospina',
    avatar = '/edisonospina.jpg',
    statusText = 'En línea',
    welcomeMessage = '¡Hola! 👋 Gracias por visitar mi portafolio. Cuéntame sobre tu proyecto o consulta técnica.',
    defaultMessage = 'Hola Edison, estuve revisando tu portafolio web y me gustaría agendar una reunión para conversar sobre una oportunidad.',
    placeholder = 'Escribe tu mensaje aquí...',
    badgeText = '1',
    eventCustomName = 'whatsapp_click',
    makeWebhookUrl = 'https://hook.us2.make.com/jt5r7jvtrodngsjka1atkwkrt5ol3ct7'
  } = widgetConfig || {};

  const {
    isChatOpen,
    hasUnreadBadge,
    inputText,
    messages,
    isTyping,
    quickOptions,
    toggleChat,
    closeChat,
    handleInputChange,
    sendMessage,
    handleQuickOption
  } = useWhatsAppWidget({
    phoneNumber,
    welcomeMessage,
    initialMessage: defaultMessage,
    eventCustomName,
    makeWebhookUrl
  });

  const messagesEndReference = useRef(null);

  // Auto-scroll al final cuando hay nuevos mensajes o cambia el estado de escritura
  useEffect(() => {
    if (isChatOpen && messagesEndReference.current) {
      messagesEndReference.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isChatOpen, messages, isTyping]);

  return (
    <aside className="whatsapp-widget" aria-label="Asistente de contacto interactivo">
      {isChatOpen && (
        <dialog
          className="whatsapp-card"
          open
          aria-labelledby="whatsapp-chat-operator-name"
        >
          {/* Cabecera del chat */}
          <div className="whatsapp-card__header">
            <div className="whatsapp-card__profile">
              <div className="whatsapp-card__avatar-container">
                <img
                  src={avatar}
                  alt={`Fotografía de ${operatorName}`}
                  className="whatsapp-card__avatar-image"
                  width="44"
                  height="44"
                />
                <span className="whatsapp-card__online-dot" aria-hidden="true" />
              </div>
              <div className="whatsapp-card__profile-info">
                <h3 id="whatsapp-chat-operator-name" className="whatsapp-card__operator-name">
                  {operatorName}
                </h3>
                <span className="whatsapp-card__status-text">
                  {isTyping ? 'Escribiendo respuesta...' : statusText}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="whatsapp-card__close-btn"
              onClick={closeChat}
              aria-label="Cerrar conversación de WhatsApp"
            >
              <i className="fa fa-times" aria-hidden="true" />
            </button>
          </div>

          {/* Cuerpo y flujo de mensajes conversacionales */}
          <div className="whatsapp-card__body">
            <div className="whatsapp-card__chat-flow" role="log" aria-live="polite">
              {messages.map((messageItem) => {
                const isUser = messageItem.sender === 'user';
                return (
                  <div
                    key={messageItem.id}
                    className={`whatsapp-card__message-bubble ${
                      isUser
                        ? 'whatsapp-card__message-bubble--user'
                        : 'whatsapp-card__message-bubble--assistant'
                    }`}
                  >
                    <p className="whatsapp-card__message-text">
                      {renderMessageContent(messageItem.text)}
                    </p>

                    {messageItem.fallbackUrl && (
                      <a
                        href={messageItem.fallbackUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="whatsapp-card__fallback-link"
                        aria-label="Abrir conversación directamente en WhatsApp"
                      >
                        <i className="fa fa-whatsapp" aria-hidden="true" />
                        <span>Abrir WhatsApp directo</span>
                      </a>
                    )}

                    <div className="whatsapp-card__message-meta">
                      <span className="whatsapp-card__timestamp">
                        {messageItem.timestamp}
                      </span>
                      <span className="whatsapp-card__message-check" aria-hidden="true">
                        {isUser ? '✓' : '✓✓'}
                      </span>
                    </div>
                  </div>
                );
              })}

              {messages.length <= 1 && (
                <div
                  className="whatsapp-card__quick-options"
                  role="group"
                  aria-label="Opciones rápidas de consulta"
                >
                  {quickOptions.map((quickOptionItem) => (
                    <button
                      key={quickOptionItem.id}
                      type="button"
                      className="whatsapp-card__quick-option-btn"
                      onClick={() => handleQuickOption(quickOptionItem)}
                    >
                      <span className="whatsapp-card__quick-option-label">
                        {quickOptionItem.label}
                      </span>
                      <i className="fa fa-chevron-right whatsapp-card__quick-option-arrow" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}

              {isTyping && (
                <div
                  className="whatsapp-card__message-bubble whatsapp-card__message-bubble--assistant whatsapp-card__message-bubble--typing"
                  aria-label="Edison Vidal está escribiendo una respuesta"
                >
                  <span className="whatsapp-typing-dot" />
                  <span className="whatsapp-typing-dot" />
                  <span className="whatsapp-typing-dot" />
                </div>
              )}
              <div ref={messagesEndReference} />
            </div>

            {/* Formulario interactivo para enviar mensajes al bot/agente */}
            <form onSubmit={sendMessage} className="whatsapp-card__form">
              <label htmlFor="whatsapp-user-message-input" className="whatsapp-card__input-label">
                Mensaje a enviar:
              </label>
              <textarea
                id="whatsapp-user-message-input"
                name="whatsappMessage"
                className="whatsapp-card__textarea"
                rows={2}
                value={inputText}
                onChange={handleInputChange}
                placeholder={placeholder}
                maxLength={500}
                disabled={isTyping}
                required
              />
              <button
                type="submit"
                className="whatsapp-card__send-btn"
                aria-label="Enviar mensaje al asistente"
                disabled={!inputText.trim() || isTyping}
              >
                <span>{isTyping ? 'Enviando...' : 'Enviar mensaje'}</span>
                <i className="fa fa-paper-plane" aria-hidden="true" />
              </button>
            </form>
          </div>
        </dialog>
      )}

      {/* Botón flotante disparador */}
      <button
        type="button"
        className={`whatsapp-trigger ${isChatOpen ? 'whatsapp-trigger--active' : ''}`}
        onClick={toggleChat}
        aria-expanded={isChatOpen}
        aria-haspopup="dialog"
        aria-label={isChatOpen ? 'Minimizar ventana de WhatsApp' : 'Abrir chat interactivo de WhatsApp'}
      >
        {hasUnreadBadge && !isChatOpen && (
          <span className="whatsapp-trigger__badge" aria-label={`${badgeText} mensaje sin leer`}>
            {badgeText}
          </span>
        )}
        {isChatOpen ? (
          <i className="fa fa-times whatsapp-trigger__close-icon" aria-hidden="true" />
        ) : (
          <svg
            className="whatsapp-trigger__icon"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16 2a13.9 13.9 0 0 0-12 20.89L2 30l7.33-1.92A13.94 13.94 0 1 0 16 2zm0 25.5a11.53 11.53 0 0 1-5.88-1.6l-.42-.25-4.36 1.14 1.16-4.25-.27-.44A11.57 11.57 0 1 1 16 27.5zm6.34-8.68c-.35-.18-2.07-1-2.39-1.12s-.56-.17-.8.18-.92 1.13-1.12 1.37-.41.26-.76.09a9.66 9.66 0 0 1-2.85-1.76 10.64 10.64 0 0 1-2-2.45c-.2-.35 0-.54.16-.72.16-.16.35-.41.53-.62s.23-.35.35-.59.06-.44-.03-.62-.8-1.92-1.1-2.63c-.29-.7-.59-.6-.8-.61h-.69a1.32 1.32 0 0 0-1 .46 4.06 4.06 0 0 0-1.27 3 7 7 0 0 0 1.48 3.73 16.14 16.14 0 0 0 6.2 5.48c3.67 1.6 3.67 1.07 4.33 1a3.67 3.67 0 0 0 2.45-1.73 3 3 0 0 0 .21-1.73c-.09-.15-.33-.24-.68-.41z" />
          </svg>
        )}
      </button>
    </aside>
  );
};

export default WhatsAppChatWidget;
