import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Primitives';
import { useDriverSignupStore } from '@/stores/driverSignup.store';
import { Upload } from 'lucide-react';



export default function VehicleStep() {
  const {vehicleInfo,updateData,setStep}=useDriverSignupStore();
    const [preview, setPreview] = useState<string | null>(null);
   // 🔹 Generate preview URLs
    useEffect(() => {
      if (vehicleInfo.registrationImage) {
        const url = URL.createObjectURL(vehicleInfo.registrationImage);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    }, [vehicleInfo.registrationImage]);
  
  
    const handleFileUpload =
      (field: "registrationImage") =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
  
        updateData("vehicleInfo", { [field]: file });
      };
  return (
    <div className="space-y-6">
       <h3 className="text-lg font-semibold text-[#1A2E35]">Vehicle Information</h3>

      <div className="space-y-4">
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
           <select 
             className="w-full h-12 rounded-lg border border-gray-200 px-4 outline-none focus:border-brand-gold transition-colors bg-white"
             value={vehicleInfo.vehicleType || ''}
             onChange={(e) => updateData("vehicleInfo",{vehicleType: e.target.value})}
             required
           >
             <option value="">Select Type</option>
             <option value="truck">Truck</option>
             <option value="van">Van</option>
             <option value="bike">Bike</option>
             <option value="Car">Car</option>
           </select>
        </div>

        <Input 
          placeholder="Vehicle Model" 
          value={vehicleInfo.vehicleNumber || ''}
          onChange={(e) => updateData("vehicleInfo",{vehicleNumber: e.target.value})}
          required 
        />
        
        {/* Uploads */}
      <div className="grid grid-cols-2 gap-4">
        {/* Front */}
        <UploadBox
          preview={preview}
          label="Upload registrationImage"
          onChange={handleFileUpload("registrationImage")}
        />

        
      </div>
      </div>
    </div>
  );

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
}}


