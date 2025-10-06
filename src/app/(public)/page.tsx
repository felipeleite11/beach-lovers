'use client'

import { useForm } from "react-hook-form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient, getBetterAuthErrorMessage } from "@/lib/auth.client"
import { toast } from "sonner"
import Image from "next/image"

type LoginFormInputs = {
	email: string
	password: string
}

export default function SignIn() {
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
		defaultValues: {
			email: 'felipe@email.com',
			password: '12345678'
		}
	})

	const router = useRouter()

	async function onSubmit(data: LoginFormInputs) {
		await authClient.signIn.email({
			email: data.email,
			password: data.password,
			callbackURL: '/check_profile'
		}, {
			onRequest: () => {},
			onSuccess: () => {
				router.replace('/check_profile')
			},
			onError: ctx => {
				const message = getBetterAuthErrorMessage(ctx.error.code)
				
				toast.error(message)
			}
		})
	}
	async function handleLoginWithGoogle() {
		try {
			await authClient.signIn.social({
				provider: 'google',
				callbackURL: '/home'
			})
		} catch(e) {
			console.log('Google auth error:', e)
		}
	}

	return (
		<div className={`flex flex-col gap-8 items-center justify-center bg-[url(/images/public-images/1.png)] bg-no-repeat bg-cover h-[calc(100vh-4rem)] overflow-y-hidden`}>
			<div className="absolute top-15 left-0 h-[calc(100vh-3.75rem)] w-screen bg-white/40 flex flex-col gap-8 items-center justify-center pt-36">
				<Image alt="" width={200} height={100} src="/images/logo.png" className="h-16 md:h-24 object-contain my-1" />
				
				<Card className="w-full max-w-sm shadow-md mb-36 animate__animated animate__fadeInUp animate__faster">
					<CardHeader>
						<CardTitle className="text-center text-xl font-bold">
							Login
						</CardTitle>
					</CardHeader>

					<form onSubmit={handleSubmit(onSubmit)}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Digite seu email"
									{...register("email", { required: "Email é obrigatório" })}
									className="dark:bg-slate-700"
								/>
								{errors.email && (
									<p className="text-sm text-red-500">{errors.email.message}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="password">Senha</Label>
								<Input
									id="password"
									type="password"
									placeholder="Digite sua senha"
									{...register("password", { required: "Senha é obrigatória" })}
									className="dark:bg-slate-700"
								/>
								{errors.password && (
									<p className="text-sm text-red-500">{errors.password.message}</p>
								)}
							</div>

							<div className="flex justify-between items-center h-14 text-sm">
								<Link href="/password-recover" className="text-blue-600 hover:underline dark:text-blue-400">
									Esqueci a senha
								</Link>

								<Link href="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
									Cadastrar-se
								</Link>
							</div>
						</CardContent>

						<CardFooter>
							<Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white cursor-pointer">
								Entrar
							</Button>
						</CardFooter>
					</form>

					<Button 
						className="w-64 self-center cursor-pointer text-sm"
						onClick={handleLoginWithGoogle}
					>
						<Image alt="Google login" src="/images/google.png" width={50} height={50} className="w-6 object-content" />
						Entrar com Google
					</Button>
				</Card>
			</div>
		</div>
	)
}