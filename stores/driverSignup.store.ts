import { create } from "zustand";
export interface DriverSignupState {
  step: number;

  basicInfo: {
    username?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
  };

  licenseInfo: {
    licenseNumber?: string;
    licenseFront?: File | null;
    licenseBack?: File | null;
  };

  vehicleInfo: {
    vehicleType?: string;
    vehicleNumber?: string;
    registrationImage?: File | null;
  };

  identityInfo: {
    nidFront?: File | null;
    nidBack?: File | null;
    passport?: File | null;
  };

  setStep: (step: number) => void;
  updateData: <K extends keyof DriverSignupState>(
    key: K,
    value: Partial<DriverSignupState[K]>
  ) => void;
  reset: () => void;
}
export const useDriverSignupStore=create<DriverSignupState>((set)=>({
    step:1,
    basicInfo:{},
    licenseInfo:{},
    vehicleInfo:{},
    identityInfo:{},
    setStep:(step)=>set({step}),
    updateData:(key,value)=>
        set((state)=>
        ({
            ...state,
            [key]:{
                ...(state[key] as object),
                ...value
            }
        })),
        reset:()=>
            set({
                step:1,
                basicInfo: {},
      licenseInfo: {},
      vehicleInfo: {},
      identityInfo: {},
            }),



}))

