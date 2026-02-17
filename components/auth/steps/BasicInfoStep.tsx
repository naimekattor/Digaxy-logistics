import React from 'react';
import { Input } from '@/components/ui/Primitives';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useDriverSignupStore } from '@/stores/driverSignup.store';



export default function BasicInfoStep() {
  const [showPass, setShowPass] = React.useState(false);
  const { basicInfo, updateData } = useDriverSignupStore();

  return (
    <div className="space-y-4">
      <div className="">
        <Input 
          placeholder="User name" 
          value={basicInfo.username}
          onChange={(e) => updateData("basicInfo",{username: e.target.value})}
          required 
        />
      </div>

      <div className="relative">
        <Input 
          type="email" 
          placeholder="Email" 
          className="pl-10"
          value={basicInfo.email}
          onChange={(e) => updateData("basicInfo",{email: e.target.value})}
          required 
        />
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      </div>

      <div className="relative">
        <Input 
          type={showPass ? "text" : "password"} 
          placeholder="Password" 
          value={basicInfo.password}
          onChange={(e) => updateData("basicInfo",{password: e.target.value})}
          required 
        />
        <button 
          type="button" 
          onClick={() => setShowPass(!showPass)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="relative">
        <Input 
          type={showPass ? "text" : "password"} 
          placeholder="Confirm password" 
          value={basicInfo.confirmPassword}
          onChange={(e) => updateData("basicInfo",{confirmPassword: e.target.value})}
          required 
        />
      </div>
    </div>
  );
}
