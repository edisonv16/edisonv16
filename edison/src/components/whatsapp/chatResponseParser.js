/**
 * Utilidad de procesamiento y limpieza de respuestas del webhook de chat.
 * Garantiza que nunca se muestre sintaxis JSON ({ "reply": ... }),
 * caracteres de escape redundantes o bloques de código al usuario final.
 */

/**
 * Aplica formato estético a listas y viñetas para presentación conversacional.
 *
 * @param {string} rawCleanText Texto sin envolturas JSON.
 * @returns {string} Texto con saltos de línea y viñetas legibles.
 */
export const formatConversationText = (rawCleanText) => {
  if (!rawCleanText || typeof rawCleanText !== 'string') {
    return '';
  }

  let formatted = rawCleanText;

  // Formatear viñetas en línea precedidas por dos puntos, punto o salto
  formatted = formatted.replace(/:\s+\*\s+/g, ':\n\n• ');
  formatted = formatted.replace(/\.\s+\*\s+/g, '.\n• ');
  formatted = formatted.replace(/;\s+\*\s+/g, ';\n• ');
  formatted = formatted.replace(/\n\s*\*\s+/g, '\n• ');

  // Separar párrafos finales como preguntas de cierre
  formatted = formatted.replace(/(\.)\s+(¿[A-ZÁÉÍÓÚa-záéíóú])/g, '$1\n\n$2');

  return formatted.trim();
};

/**
 * Extrae y limpia el texto de la respuesta del asistente desde cualquier formato
 * (objeto JSON, texto plano con formato JSON, JSON anidado, o markdown).
 *
 * @param {string|Object|null} rawInput Entrada cruda recibida de la API.
 * @param {Object|null} parsedInput Objeto ya parseado opcional.
 * @returns {string} Mensaje final completamente desprovisto de llaves o etiquetas JSON.
 */
export const extractAssistantReply = (rawInput, parsedInput = null) => {
  // 1. Si ya se dispone de un objeto parseado válido
  if (parsedInput && typeof parsedInput === 'object') {
    const candidateValue =
      parsedInput.reply ??
      parsedInput.message ??
      parsedInput.response ??
      parsedInput.text ??
      (Array.isArray(parsedInput) ? parsedInput[0] : null);

    if (candidateValue !== null && candidateValue !== undefined) {
      return extractAssistantReply(candidateValue);
    }
  }

  // 2. Si el argumento principal es un objeto
  if (rawInput && typeof rawInput === 'object') {
    const candidateValue =
      rawInput.reply ??
      rawInput.message ??
      rawInput.response ??
      rawInput.text ??
      (Array.isArray(rawInput) ? rawInput[0] : null);

    if (candidateValue !== null && candidateValue !== undefined) {
      return extractAssistantReply(candidateValue);
    }

    return '';
  }

  if (!rawInput || typeof rawInput !== 'string') {
    return '';
  }

  let textCandidate = rawInput.trim();

  // 3. Remover bloques de código markdown tipo ```json ... ```
  if (textCandidate.startsWith('```')) {
    textCandidate = textCandidate
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();
  }

  // 4. Intento con JSON.parse estándar
  try {
    const jsonParsed = JSON.parse(textCandidate);
    if (jsonParsed && (typeof jsonParsed === 'object' || (typeof jsonParsed === 'string' && jsonParsed !== textCandidate))) {
      return extractAssistantReply(jsonParsed);
    }
  } catch {
    // Si falla por caracteres de control literales (saltos de línea sin escapar)
  }

  // 5. Intento con JSON.parse sanitizando saltos de línea y tabulaciones literales
  try {
    const sanitizedText = textCandidate.replace(/[\r\n\t]+/g, (controlChar) => (controlChar === '\t' ? '\\t' : '\\n'));
    const sanitizedParsed = JSON.parse(sanitizedText);
    if (sanitizedParsed && typeof sanitizedParsed === 'object') {
      return extractAssistantReply(sanitizedParsed);
    }
  } catch {
    // Continuar con extracción por patrones regex
  }

  // 6. Extracción por Regex de claves conocidas ("reply", "message", "response", "text")
  const regexPatterns = [
    /["']?(?:reply|message|response|text)["']?\s*:\s*"([\s\S]*)"\s*\}?\s*$/i,
    /["']?(?:reply|message|response|text)["']?\s*:\s*'([\s\S]*)'\s*\}?\s*$/i,
    /["']?(?:reply|message|response|text)["']?\s*:\s*`([\s\S]*)`\s*\}?\s*$/i
  ];

  for (const regexPattern of regexPatterns) {
    const match = textCandidate.match(regexPattern);
    if (match && match[1] !== undefined) {
      let extractedContent = match[1];
      extractedContent = extractedContent
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '')
        .replace(/\\t/g, '\t')
        .replace(/\\\\/g, '\\');
      return formatConversationText(extractedContent);
    }
  }

  // 7. Limpieza heurística si persiste como objeto con llave "reply"
  if (textCandidate.startsWith('{') && textCandidate.includes('"reply"')) {
    const replyIndex = textCandidate.indexOf('"reply"');
    const colonIndex = textCandidate.indexOf(':', replyIndex);
    if (colonIndex !== -1) {
      let sliceText = textCandidate.slice(colonIndex + 1).trim();
      if (sliceText.startsWith('"') || sliceText.startsWith("'")) {
        sliceText = sliceText.slice(1);
      }
      sliceText = sliceText.replace(/["'}]+\s*$/, '');
      const cleanedHeuristic = sliceText
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '')
        .replace(/\\\\/g, '\\');
      return formatConversationText(cleanedHeuristic);
    }
  }

  return formatConversationText(textCandidate);
};

export default extractAssistantReply;
