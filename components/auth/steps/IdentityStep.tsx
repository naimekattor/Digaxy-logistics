import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { useDriverSignupStore } from "@/stores/driverSignup.store";

export default function IdentityStep() {
  const { identityInfo, updateData } = useDriverSignupStore();

  const [previews, setPreviews] = useState<{
    nidFront?: string;
    nidBack?: string;
    passport?: string;
  }>({});

  // 🔹 Generate preview URLs safely
  useEffect(() => {
    const urls: string[] = [];

    const createPreview = (file?: File, key?: string) => {
      if (!file || !key) return;
      const url = URL.createObjectURL(file);
      urls.push(url);
      setPreviews((prev) => ({ ...prev, [key]: url }));
    };

    createPreview(identityInfo.nidFront, "nidFront");
    createPreview(identityInfo.nidBack, "nidBack");
    createPreview(identityInfo.passport, "passport");

    return () => urls.forEach(URL.revokeObjectURL);
  }, [identityInfo]);

  const handleFileUpload =
    (field: "nidFront" | "nidBack" | "passport") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      updateData("identityInfo", { [field]: file });
    };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#1A2E35]">
        Identity Verification
      </h3>

      {/* NID Section */}
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Please upload your National ID (Required)
        </p>

        <div className="grid grid-cols-2 gap-4">
          <UploadBox
            label="Upload NID Front"
            preview={previews.nidFront}
            onChange={handleFileUpload("nidFront")}
          />

          <UploadBox
            label="Upload NID Back"
            preview={previews.nidBack}
            onChange={handleFileUpload("nidBack")}
          />
        </div>
      </div>

      {/* Passport */}
      <div className="space-y-4 pt-4">
        <p className="text-sm text-gray-600">Passport (Optional)</p>

        <UploadBox
          label="Upload Passport"
          preview={previews.passport}
          onChange={handleFileUpload("passport")}
        />
      </div>
    </div>
  );
}

/* 🔹 Reusable Upload Component */
function UploadBox({
  preview,
  label,
  onChange,
}: {
  preview?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-center text-center hover:bg-gray-50 transition-colors relative h-44">
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={onChange}
      />

      {preview ? (
        <img
          src={preview}
          alt={label}
          className="w-full h-full object-cover rounded-md"
        />
      ) : (
        <div className="flex flex-col items-center">
          <Upload className="text-gray-400 mb-2" size={24} />
          <p className="text-sm text-gray-500 font-medium">{label}</p>
        </div>
      )}
    </div>
  );
}
