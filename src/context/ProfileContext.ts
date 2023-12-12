import React, { useState, createContext } from 'react';

export const ProfileContext = createContext({
    profile: null,
    setProfile: () => { },
});
