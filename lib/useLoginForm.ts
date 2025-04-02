import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useAuth } from "@/context/AuthContext"

export const useLoginForm = () => {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email.includes("@")) newErrors.email = "Invalid email format"
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!validate()) return;

     setIsLoading(true);
     try {
       await login(formData); 
       toast.success("Logged in successfully!");
       router.refresh(); 
     } catch (error: unknown) {
       toast.error(error.message || "Invalid email or password");
     } finally {
       setIsLoading(false);
     }
   };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return { formData, errors, isLoading, handleChange, handleSubmit }
}