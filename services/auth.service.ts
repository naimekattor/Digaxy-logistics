export async function sendOtp(email: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/send/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to send OTP');
    }
    return res.json();
}

export async function verifyOtp(email: string, otp: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/verify/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Invalid OTP');
    }
    return res.json();
}

export async function changePassword(token: string, data: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/password/change/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Failed to change password');
    }
    return res.json();
}
