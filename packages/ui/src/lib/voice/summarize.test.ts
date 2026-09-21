import { describe, expect, test } from 'bun:test';

import { sanitizeForTTS } from './summarize';

describe('sanitizeForTTS', () => {
    test('strips markdown but keeps line structure', () => {
        const text = [
            '## What is Qwen TTS',
            '',
            'Some **bold** text with `inline code`.',
        ].join('\n');
        expect(sanitizeForTTS(text)).toBe('What is Qwen TTS\nSome bold text with inline code.');
    });

    test('collapses blank lines and horizontal whitespace runs', () => {
        expect(sanitizeForTTS('a\n\n\nb   c\t\td')).toBe('a\nb c d');
        expect(sanitizeForTTS('a \n\n b')).toBe('a\nb');
    });

    test('normalizes CRLF line breaks', () => {
        expect(sanitizeForTTS('first line\r\nsecond line')).toBe('first line\nsecond line');
    });
});
