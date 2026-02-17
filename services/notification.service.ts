import { NotificationListResponse } from "@/types/notification";

export async function getNotifications(
    token: string,
    page: number = 1,
    pageSize: number = 2
): Promise<NotificationListResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/list/?page=${page}&page_size=${pageSize}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to fetch notifications");
    }

    return res.json();
}
