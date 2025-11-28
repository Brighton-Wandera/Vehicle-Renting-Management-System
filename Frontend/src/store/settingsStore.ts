import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    emailNotifications: boolean;
    maintenanceMode: boolean;
    toggleEmailNotifications: () => void;
    toggleMaintenanceMode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            emailNotifications: true,
            maintenanceMode: false,
            toggleEmailNotifications: () => set((state) => ({ emailNotifications: !state.emailNotifications })),
            toggleMaintenanceMode: () => set((state) => ({ maintenanceMode: !state.maintenanceMode })),
        }),
        {
            name: 'admin-settings-storage',
        }
    )
);
