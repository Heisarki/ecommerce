"use client"
import Input from "@/components/ui/Input"
import { useForm, SubmitHandler } from "react-hook-form"

interface IFormInput {
    firstName: string
    lastName: string
    age: number
}

export default function App() {
    const { register: formData, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            firstName: "",
            lastName: "",
            age: 0,
        }
    })
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-[0.3rem]'>
                <Input
                    inputRegister={formData("firstName", { required: true, maxLength: 20 })}
                    placeholder="First name"
                />
                {errors.firstName && <>Firstname error</>}
            </div>
            <div className='flex flex-col gap-[0.3rem]'>
                <input {...formData("lastName", { required: true, pattern: /^[A-Za-z]+$/i })} />
                {errors.lastName && <>Lastname error</>}
            </div>
            <div className='flex flex-col gap-[0.3rem]'>
                <input type="number" {...formData("age", { min: 18, max: 99 })} />
            </div>
            <div>
                <button type="submit">submit</button>
            </div>
        </form>
    )
}