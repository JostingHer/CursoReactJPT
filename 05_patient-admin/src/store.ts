import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import type { DraftPatient, Patient } from './types'

type PatientState = {
    patients: Patient[];
    activeId: Patient["id"] | "";
    addPatient: (patient: DraftPatient) => void
    removePatient: (id: string) => void
    removeAllPatients: () => void
    updatePatient: (patient: Patient) => void
    getPatientById: (id: Patient["id"]) => void;
}

const revivePatientDates = (patients: Patient[]) =>
    patients.map((patient) => ({
        ...patient,
        date: new Date(patient.date),
    }))

const addPatient = (state: PatientState, patient: DraftPatient) => {
    const newPatient = {
        ...patient,
        id: crypto.randomUUID(),
        date: new Date(patient.date),
    }
    return [...state.patients, newPatient]
}

export const usePatientStore = create<PatientState>()(
    devtools(persist((set) => ({
        patients: [],
        activeId: "",
        addPatient: (patient) => set((state) => ({ patients: addPatient(state, patient) })),
        removePatient: (id) => set((state) => ({ patients: state.patients.filter((patient) => patient.id !== id) })),
        removeAllPatients: () => set({ patients: [] }),
        updatePatient: (patient) => set((state) => (
            {
                patients: state.patients.map((p) => p.id === patient.id ? { ...patient, date: new Date(patient.date) } : p),
                activeId: ""
            }
        )),
        getPatientById: (id) => {
            set(() => ({
                activeId: id,
            }));
        },
    }), {
        name: 'patients',
        storage: createJSONStorage(() => sessionStorage),
        merge: (persistedState, currentState) => {
            const state = persistedState as PatientState
            return {
                ...currentState,
                ...state,
                patients: revivePatientDates(state.patients),
            }
        },
    })))

