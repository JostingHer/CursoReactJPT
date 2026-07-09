import { useForm } from 'react-hook-form'
import Error from './Error'
import type { DraftPatient } from '../types'
import { usePatientStore } from '../store'

export default function PatientForm() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<DraftPatient>()

    const { addPatient, getPatientById, activeId } = usePatientStore()

    const registerPatient = (data: DraftPatient) => {
        addPatient(data)
        reset()
        getPatientById("")
    }


    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <h2>activeId: {activeId}</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', { required: 'El nombre es obligatorio' })}
                    />
                    {errors.name && <Error>{errors.name.message as string}</Error>}
                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', { required: 'El nombre del propietario es obligatorio' })}
                    />
                    {errors.caretaker && <Error>{errors.caretaker.message as string}</Error>}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register('email', { required: 'El email es obligatorio' })}
                    />
                    {errors.email && <Error>{errors.email.message as string}</Error>}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register('date', { required: 'La fecha de alta es obligatoria' })}
                    />
                    {errors.date && <Error>{errors.date.message as string}</Error>}
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register('symptoms', { required: 'Los síntomas son obligatorios' })}
                    ></textarea>
                    {errors.symptoms && <Error>{errors.symptoms.message as string}</Error>}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value='Guardar Paciente'
                />
            </form>
        </div>
    )
}