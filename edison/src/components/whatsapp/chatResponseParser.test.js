import { extractAssistantReply, formatConversationText } from './chatResponseParser';

describe('chatResponseParser', () => {
  const userScreenshotPayload = `{"reply": "¡Hola! Como Senior Systems Development Engineer, Edison domina un sólido stack tecnológico enfocado en la escalabilidad, la nube y el desarrollo full-stack: * **Backend:** Node.js, Python, Java y C#. * **Frontend:** React, Next.js, TypeScript y Tailwind CSS. * **Cloud & DevOps:** AWS, Docker, Kubernetes, CI/CD y Serverless. * **Bases de datos:** PostgreSQL, MongoDB, DynamoDB y Redis. * **Arquitectura:** Microservicios, arquitecturas orientadas a eventos y diseño de APIs RESTful/GraphQL. ¿Te gustaría conocer más detalles sobre alguna de estas tecnologías o sobre su experiencia en algún proyecto en particular?"}`;

  test('extracts clean text from exact user screenshot payload without JSON brackets', () => {
    const extracted = extractAssistantReply(userScreenshotPayload);

    expect(extracted.startsWith('{')).toBe(false);
    expect(extracted.endsWith('}')).toBe(false);
    expect(extracted.includes('{"reply"')).toBe(false);
    expect(extracted).toContain('¡Hola! Como Senior Systems Development Engineer');
    expect(extracted).toContain('• **Backend:** Node.js, Python, Java y C#.');
    expect(extracted).toContain('¿Te gustaría conocer más detalles');
  });

  test('extracts message when JSON has literal unescaped newlines', () => {
    const multilinePayload = `{"reply": "¡Hola!\nAquí están las áreas principales:\n* Node.js\n* React"}`;
    const extracted = extractAssistantReply(multilinePayload);

    expect(extracted.startsWith('{')).toBe(false);
    expect(extracted).toContain('¡Hola!');
    expect(extracted).toContain('Node.js');
  });

  test('extracts message wrapped in markdown code fence', () => {
    const markdownPayload = "```json\n" + userScreenshotPayload + "\n```";
    const extracted = extractAssistantReply(markdownPayload);

    expect(extracted.startsWith('{')).toBe(false);
    expect(extracted).toContain('Edison domina un sólido stack');
  });

  test('extracts message from double stringified JSON', () => {
    const doubleStringified = JSON.stringify(JSON.stringify({ reply: 'Respuesta anidada' }));
    const extracted = extractAssistantReply(doubleStringified);

    expect(extracted).toBe('Respuesta anidada');
  });

  test('extracts message from parsed JS object', () => {
    const objectPayload = {
      reply: 'Hola desde objeto directo'
    };
    const extracted = extractAssistantReply('', objectPayload);

    expect(extracted).toBe('Hola desde objeto directo');
  });

  test('extracts message from alternative keys like message or response', () => {
    expect(extractAssistantReply(JSON.stringify({ message: 'Texto de mensaje' }))).toBe('Texto de mensaje');
    expect(extractAssistantReply(JSON.stringify({ response: 'Texto de respuesta' }))).toBe('Texto de respuesta');
  });

  test('formats inline bullet points with clean line breaks', () => {
    const rawWithInlineBullets = 'Habilidades: * **HTML:** Básico. * **CSS:** Avanzado.';
    const formatted = formatConversationText(rawWithInlineBullets);

    expect(formatted).toBe('Habilidades:\n\n• **HTML:** Básico.\n• **CSS:** Avanzado.');
  });

  test('handles null, undefined or empty input gracefully', () => {
    expect(extractAssistantReply(null)).toBe('');
    expect(extractAssistantReply(undefined)).toBe('');
    expect(extractAssistantReply('')).toBe('');
    expect(formatConversationText(null)).toBe('');
  });
});
