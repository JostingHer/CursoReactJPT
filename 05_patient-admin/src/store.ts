import { create } from 'zustand'
import type { DraftPatient, Patient } from './types'

type PatientState = {
    activeId: Patient["id"];
    patients: Patient[]
    addPatient: (patient: DraftPatient) => void
    removePatient: (id: string) => void
    removeAllPatients: () => void
    updatePatient: (patient: Patient) => void
    getPatientById: (id: Patient["id"]) => void;
}

const addPatient = (state: PatientState, patient: DraftPatient) => {
    const newPatient = {
        id: crypto.randomUUID(),
        ...patient,
    }
    return [...state.patients, newPatient]
}

export const usePatientStore = create<PatientState>((set) => ({
    patients: [],
    activeId: "",
    addPatient: (patient) => set((state) => ({ patients: addPatient(state, patient) })),
    removePatient: (id) => set((state) => ({ patients: state.patients.filter((patient) => patient.id !== id) })),
    removeAllPatients: () => set({ patients: [] }),
    updatePatient: (patient) => set((state) => ({ patients: state.patients.map((p) => p.id === patient.id ? patient : p) })),
    getPatientById: (id) => {
        set(() => ({
            activeId: id,
        }));
    },
}))

