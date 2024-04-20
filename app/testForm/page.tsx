"use client"
import { useForm, SubmitHandler } from "react-hook-form"

interface IFormInput {
    firstName: string
    lastName: string
    age: number
}

export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName", { required: true, maxLength: 20 })} placeholder="First name" />
            {errors.firstName && <>Firstname error</>}
            <input {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })} />
            {errors.lastName && <>Lastname error</>}
            <input type="number" {...register("age", { min: 18, max: 99 })} />
            <input type="submit" />
            <button type="submit">submit</button>
        </form>
    )
}