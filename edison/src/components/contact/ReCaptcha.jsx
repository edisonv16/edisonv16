import { useEffect, useRef } from 'react';

const RECAPTCHA_SCRIPT_ID = 'google-recaptcha-script';

const ReCaptcha = ({ siteKey, onVerify, onExpire }) => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    let checkInterval = null;

    const renderWidget = () => {
      if (!containerRef.current) return;
      if (typeof window === 'undefined' || !window.grecaptcha || typeof window.grecaptcha.render !== 'function') return;

      if (widgetIdRef.current === null) {
        try {
          widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
            sitekey: siteKey,
            theme: 'dark',
            callback: (token) => {
              if (onVerifyRef.current) {
                onVerifyRef.current(token);
              }
            },
            'expired-callback': () => {
              if (onExpireRef.current) {
                onExpireRef.current();
              }
            }
          });
        } catch {
          // Si el contenedor ya fue renderizado o recaptcha ya inicializó
        }
      }
    };

    if (typeof window !== 'undefined' && window.grecaptcha && window.grecaptcha.render) {
      renderWidget();
    } else if (typeof document !== 'undefined') {
      let script = document.getElementById(RECAPTCHA_SCRIPT_ID);

      if (!script) {
        script = document.createElement('script');
        script.id = RECAPTCHA_SCRIPT_ID;
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }

      checkInterval = window.setInterval(() => {
        if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
          if (checkInterval) window.clearInterval(checkInterval);
          renderWidget();
        }
      }, 200);
    }

    return () => {
      if (checkInterval) {
        window.clearInterval(checkInterval);
      }
    };
  }, [siteKey]);

  return (
    <div className="contact-form__recaptcha-wrapper" data-testid="recaptcha-container">
      <div ref={containerRef} className="contact-form__recaptcha"></div>
    </div>
  );
};

export default ReCaptcha;
