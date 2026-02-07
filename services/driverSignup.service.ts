import { useDriverSignupStore } from "@/stores/driverSignup.store";

export async function submitDriverSignup(data: DriverSignupState) {
  const fd = new FormData();

  // Basic
  fd.append("full_name", data.basicInfo.fullName);
  fd.append("email", data.basicInfo.email);
  fd.append("password", data.basicInfo.password);
  fd.append("role", "DRIVER");

  // License
  fd.append("driver_license_number", data.licenseInfo.licenseNumber);
  fd.append(
    "driving_license_front_image",
    data.licenseInfo.licenseFront!
  );
  fd.append(
    "driving_license_back_image",
    data.licenseInfo.licenseBack!
  );

  // Vehicle
  fd.append("driver_vehicle_number", data.vehicleInfo.vehicleNumber);
  fd.append("vehicle_type", data.vehicleInfo.vehicleType);
  fd.append(
    "driver_vehicle_registration_image",
    data.vehicleInfo.registrationImage!
  );

  // Identity
  fd.append("driver_nid_front_image", data.identityInfo.nidFront!);
  fd.append("driver_nid_back_image", data.identityInfo.nidBack!);

  if (data.identityInfo.passport) {
    fd.append("driver_passport_image", data.identityInfo.passport);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/driver/signup/`,
    {
      method: "POST",
      body: fd,
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
}
