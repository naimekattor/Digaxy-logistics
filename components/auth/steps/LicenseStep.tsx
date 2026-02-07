import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Primitives";
import { Upload } from "lucide-react";
import { useDriverSignupStore } from "@/stores/driverSignup.store";

export default function LicenseStep() {
  const { licenseInfo, updateData } = useDriverSignupStore();

  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  // 🔹 Generate preview URLs
  useEffect(() => {
    if (licenseInfo.licenseFront) {
      const url = URL.createObjectURL(licenseInfo.licenseFront);
      setFrontPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [licenseInfo.licenseFront]);

  useEffect(() => {
    if (licenseInfo.licenseBack) {
      const url = URL.createObjectURL(licenseInfo.licenseBack);
      setBackPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [licenseInfo.licenseBack]);

  const handleFileUpload =
    (field: "licenseFront" | "licenseBack") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      updateData("licenseInfo", { [field]: file });
    };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#1A2E35]">
        Driving License Details
      </h3>

      {/* License Number */}
      <Input
        placeholder="License Number"
        value={licenseInfo.licenseNumber || ""}
        onChange={(e) =>
          updateData("licenseInfo", { licenseNumber: e.target.value })
        }
        required
      />

      {/* Uploads */}
      <div className="grid grid-cols-2 gap-4">
        {/* Front */}
        <UploadBox
          preview={frontPreview}
          label="Upload Front"
          onChange={handleFileUpload("licenseFront")}
        />

        {/* Back */}
        <UploadBox
          preview={backPreview}
          label="Upload Back"
          onChange={handleFileUpload("licenseBack")}
        />
      </div>
    </div>
  );
}

/* 🔹 Reusable Upload Box with Preview */
function UploadBox({
  preview,
  label,
  onChange,
}: {
  preview: string | null;
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
