import { ParcelCreateRequest, ParcelResponse, ParcelListResponse } from "@/types/parcel";

export async function createParcel(data: ParcelCreateRequest, token?: string): Promise<ParcelResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/parcels/create/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(data),
        }
    );

    if (!res.ok) {
        const err = await res.json();
        throw err;
    }

    return res.json();
}

export async function getPendingParcels(token: string, page: number = 1): Promise<ParcelListResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/parcels/pending/?page=${page}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            },
        }
    );
    if (!res.ok) throw new Error("Failed to fetch pending parcels");
    return res.json();
}
export async function getAcceptedParcels(token: string, page: number = 1): Promise<ParcelListResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/accepted-parcels/?page=${page}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            },
        }
    );
    if (!res.ok) throw new Error("Failed to fetch pending parcels");
    return res.json();
}
export async function getOnTheWayParcels(token: string, page: number = 1): Promise<ParcelListResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/onway-parcels/?page=${page}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            },
        }
    );
    if (!res.ok) throw new Error("Failed to fetch pending parcels");
    return res.json();
}

export async function getDeliveredParcels(token: string, page: number = 1): Promise<ParcelListResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/parcels/delivered/?page=${page}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            },
        }
    );
    if (!res.ok) throw new Error("Failed to fetch delivered parcels");
    return res.json();
}

export async function getCancelledParcels(token: string, page: number = 1): Promise<ParcelListResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/parcels/cancelled/?page=${page}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            },
        }
    );
    if (!res.ok) throw new Error("Failed to fetch cancelled parcels");
    return res.json();
}
