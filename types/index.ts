export enum UserRole {
  DRIVER = 'driver',
  HELPER = 'helper',
  CUSTOMER = 'mover'
}

export enum DriverStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface DriverDetails {
  licenseNumber: string;
  licenseExpiry: string;
  licenseFront?: string; // URL or Base64
  licenseBack?: string;
  vehicleType: string;
  vehicleModel: string;
  vehiclePlate: string;
  nidFront?: string;
  nidBack?: string;
  passport?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  status?: DriverStatus; // Only for drivers/helpers
  driverDetails?: DriverDetails;
}

export interface Job {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  price: number;
  distance: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  date: string;
  type: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: any;
}