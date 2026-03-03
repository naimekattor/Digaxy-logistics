import { getServerSession } from 'next-auth';

export async function POST(req) {
  try {
    // const token = session?.accessToken;

    // if (!token) {
    //   return Response.json({ reply: 'Please login to use the assistant.' }, { status: 401 });
    // }

    const { message } = await req.json();

    const response = await fetch('http://10.10.13.75:8400/api/ai-support/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Backend API error:', data);
      return Response.json({ reply: 'Assistant is currently unavailable. Please try again later.' }, { status: response.status });
    }

    const reply = data?.data?.response || 'I received your message but could not process a response.';
    const state = data?.data?.state || null;

    return Response.json({
      reply: reply,
      state: state,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ reply: 'Something went wrong. Please check your connection and try again.' }, { status: 500 });
  }
}