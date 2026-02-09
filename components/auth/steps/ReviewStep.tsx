import React from "react";
import { useDriverSignupStore } from "@/stores/driverSignup.store";
import Image from "next/image";

function PreviewImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="w-full max-w-md">
      <div className="relative w-full aspect-[3/2] overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}



export default function ReviewStep() {
  const {
    basicInfo,
    licenseInfo,
    vehicleInfo,
    identityInfo,
  } = useDriverSignupStore();

  const registrationImageUrl = vehicleInfo.registrationImage
    ? URL.createObjectURL(vehicleInfo.registrationImage)
    : "";

  const licenseFrontUrl = licenseInfo.licenseFront
    ? URL.createObjectURL(licenseInfo.licenseFront)
    : "";

  const licenseBackUrl = licenseInfo.licenseBack
    ? URL.createObjectURL(licenseInfo.licenseBack)
    : "";

  const nidFrontUrl = identityInfo.nidFront
    ? URL.createObjectURL(identityInfo.nidFront)
    : "";

  const nidBackUrl = identityInfo.nidBack
    ? URL.createObjectURL(identityInfo.nidBack)
    : "";

  const passportUrl = identityInfo.passport
    ? URL.createObjectURL(identityInfo.passport)
    : "";

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#1A2E35]">
        Review Information
      </h3>

      <div className="space-y-4 text-sm">
        {/* Personal Info */}
        <Section title="Personal Info">
          <Grid>
            <p>Name: {basicInfo.username} </p>
            <p>Email: {basicInfo.email}</p>
          </Grid>
        </Section>

        {/* License Info */}
        <Section title="License Info">
          <div className="space-y-3">
            <Grid>
              <p>Number: {licenseInfo.licenseNumber || "-"}</p>
            </Grid>
            <div className="space-y-2">
              <Status
                label="License Front"
                ok={!!licenseInfo.licenseFront}
              />
              {/* {licenseFrontUrl && (
  <PreviewImage
    src={licenseFrontUrl}
    alt="License Front"
  />
)} */}

            </div>
            <div className="space-y-2">
              <Status
                label="License Back"
                ok={!!licenseInfo.licenseBack}
              />
              {/* {licenseBackUrl && (
  <PreviewImage
    src={licenseBackUrl}
    alt="License Back"
  />
)} */}

            </div>
          </div>
        </Section>

        {/* Vehicle Info */}
        <Section title="Vehicle Info">
          <Grid>
            <p>Type: {vehicleInfo.vehicleType || "-"}</p>
            <p>Model: {vehicleInfo.vehicleNumber || "-"}</p>
          </Grid>
          {/* {registrationImageUrl && (
  <PreviewImage
    src={registrationImageUrl}
    alt="Vehicle Registration"
  />
)} */}

        </Section>

        {/* Identity */}
        <Section title="Identity">
          <div className="space-y-3">
            <div className="space-y-2">
              <Status label="NID Front" ok={!!identityInfo.nidFront} />
              
              {/* {nidFrontUrl && (
  <PreviewImage
    src={nidFrontUrl}
    alt="nidFrontUrl"
  />
)} */}

            </div>
            <div className="space-y-2">
              <Status label="NID Back" ok={!!identityInfo.nidBack} />
              
              {/* {nidBackUrl && (
  <PreviewImage
    src={nidBackUrl}
    alt="nidBackUrl"
  />
)} */}

            </div>
            <div className="space-y-2">
              <p>
                Passport:{" "}
                {identityInfo.passport ? (
                  <span className="text-green-600">Uploaded</span>
                ) : (
                  <span className="text-gray-400">Not provided</span>
                )}
              </p>
              {/* {passportUrl && (
                <div className="mt-2">
                  <img
                    src={passportUrl}
                    alt="Passport"
                    className="w-full max-w-md h-auto rounded-lg border border-gray-200"
                  />
                </div>
              )} */}
            </div>
          </div>
        </Section>
      </div>

      {/* Confirmation */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="termsReview"
          className="w-4 h-4 rounded border-gray-300 accent-brand-gold"
          required
        />
        <label
          htmlFor="termsReview"
          className="text-sm text-gray-500"
        >
          I confirm that all information provided is accurate
        </label>
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-2 text-gray-600">
      {children}
    </div>
  );
}

function Status({
  label,
  ok,
}: {
  label: string;
  ok: boolean;
}) {
  return (
    <p className={ok ? "text-green-600" : "text-red-500"}>
      {label}: {ok ? "Uploaded" : "Missing"}
    </p>
  );
}
