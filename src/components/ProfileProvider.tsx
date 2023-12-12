import { ProfileContext } from "@/context/ProfileContext";
import { useState } from "react";

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
  
    const updateProfile = (newProfile) => setProfile(newProfile);
  
    return (
      <ProfileContext.Provider value={{ profile, updateProfile }}>
        {children}
      </ProfileContext.Provider>
    );
  };
  