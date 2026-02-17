export interface Notification {
    id: number;
    title: string;
    message: string;
    notification_type: string;
    created_at: string;
    is_read: boolean;
}

export interface NotificationListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Notification[];
}
