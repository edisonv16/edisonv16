import Info from '../../data/Info';
import useWhatsAppWidget from './useWhatsAppWidget';

/**
 * Widget de chat flotante interactivo integrado con WhatsApp y Google Tag Manager.
 *
 * @param {Object} props Propiedades del componente.
 * @param {Object} [props.widgetConfig] Configuración opcional del widget (por defecto toma Info.whatsapp).
 */
const WhatsAppChatWidget = ({ widgetConfig = Info.whatsapp } = {}) => {
  const {
    phoneNumber = '573185735382',
    operatorName = 'Edison Vidal Ospina',
    avatar = '/edisonospina.jpg',
    statusText = 'En línea',
    welcomeMessage = '¡Hola! 👋 Gracias por visitar mi portafolio. Si buscas agendar una reunión o conversar sobre un proyecto técnico, déjame tu mensaje y continuemos en WhatsApp.',
    defaultMessage = 'Hola Edison, estuve revisando tu portafolio web y me gustaría agendar una reunión para conversar sobre una oportunidad.',
    placeholder = 'Escribe tu mensaje para WhatsApp...',
    badgeText = '1',
    eventCustomName = 'whatsapp_click'
  } = widgetConfig || {};

  const {
    isChatOpen,
    hasUnreadBadge,
    messageText,
    toggleChat,
    closeChat,
    handleMessageChange,
    sendMessage
  } = useWhatsAppWidget({
    phoneNumber,
    initialMessage: defaultMessage,
    eventCustomName
  });

  return (
    <aside className="whatsapp-widget" aria-label="Asistente de contacto vía WhatsApp">
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
                  {statusText}
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

          {/* Cuerpo y burbuja de bienvenida */}
          <div className="whatsapp-card__body">
            <div className="whatsapp-card__chat-flow">
              <div className="whatsapp-card__message-bubble">
                <p className="whatsapp-card__message-text">
                  {welcomeMessage}
                </p>
                <div className="whatsapp-card__message-meta">
                  <span className="whatsapp-card__message-check" aria-hidden="true">
                    ✓✓
                  </span>
                </div>
              </div>
            </div>

            {/* Formulario editable para envío personalizado */}
            <form onSubmit={sendMessage} className="whatsapp-card__form">
              <label htmlFor="whatsapp-user-message-input" className="whatsapp-card__input-label">
                Mensaje a enviar:
              </label>
              <textarea
                id="whatsapp-user-message-input"
                name="whatsappMessage"
                className="whatsapp-card__textarea"
                rows={3}
                value={messageText}
                onChange={handleMessageChange}
                placeholder={placeholder}
                maxLength={500}
                required
              />
              <button
                type="submit"
                className="whatsapp-card__send-btn"
                aria-label="Enviar mensaje a WhatsApp y activar agendamiento"
                disabled={!messageText.trim()}
              >
                <span>Enviar a WhatsApp</span>
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
