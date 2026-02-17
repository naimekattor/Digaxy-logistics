import { UserProfile, ProfileUpdateRequest } from "@/types/profile";

export async function getProfile(token: string): Promise<UserProfile> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/customer/profile/`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            },
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to fetch profile");
    }

    return res.json();
}

export async function updateProfile(token: string, data: ProfileUpdateRequest): Promise<UserProfile> {
    const fd = new FormData();

    if (data.username) fd.append("username", data.username);
    if (data.full_name) fd.append("full_name", data.full_name);
    if (data.phone_number) fd.append("phone_number", data.phone_number);
    if (data.usergender) fd.append("usergender", data.usergender);
    if (data.date_of_birth) fd.append("date_of_birth", data.date_of_birth);

    if (data.profile_picture instanceof File) {
        fd.append("profile_picture", data.profile_picture);
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/customer/profile/`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                // Note: Content-Type is automatically set with boundary for FormData
            },
            body: fd,
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update profile");
    }

    return res.json();
}
