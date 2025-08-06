import { env } from '@/env.mjs';

const API_CHATBOT_URL = env.NEXT_PUBLIC_API_CHATBOT_URL;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message, sessionId, action } = body;

        // Handle session actions
        if (action === 'start_session') {
            const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            return Response.json({ sessionId, message: 'Session started' });
        }

        if (action === 'end_session') {
            // Forward session end to Flask backend
            const response = await fetch(`${API_CHATBOT_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'END_SESSION',
                    sessionId,
                    action: 'end_session'
                })
            });
            return Response.json({ message: 'Session ended' });
        }

        if (!message) {
            return new Response(JSON.stringify({ error: 'Message is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Forward the request to Flask backend with session info
        const response = await fetch(`${API_CHATBOT_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                session_id: sessionId || null
            })
        });

        if (!response.ok) {
            throw new Error(`Flask API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure we return a proper response format
        return Response.json({
            response: data.response || data.message || data.answer || data.text || "Xin lỗi, tôi không thể xử lý câu hỏi của bạn.",
            sessionId: data.session_id || sessionId
        });
    } catch (error) {
        console.error('Chatbot API error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to get response from chatbot',
            message: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
} 
