import { Loader2Icon } from "lucide-react"
import { ImageProps } from 'next/image'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getRandomItem } from "@/utils/number"

const loaderImages = [
	'/images/spinners/ball.png',
	'/images/spinners/racket.png',
	'/images/spinners/volley.png'
]

type SpinnerImageProps = Omit<ImageProps, 'alt' | 'src'> & { src?: string }

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<Loader2Icon
			role="status"
			aria-label="Loading"
			className={cn("size-4 animate-spin", className)}
			{...props}
		/>
	)
}

function SpinnerImage({ className, src, ...props }: SpinnerImageProps) {
	const randomImage = getRandomItem<string>(loaderImages)

	return (
		<div className="flex flex-col justify-center items-center gap-4 mt-40 text-sm text-slate-300" suppressHydrationWarning>
			<Image
				width={80}
				height={80}
				src={src || randomImage}
				alt="Aguarde"
				role="status"
				aria-label="Loading"
				className={cn("w-24 h-24 animate-spin", className)}
				{...props}
			/>
			
			<span className="animate-pulse">Aguarde...</span>
		</div>
	)
}

export { Spinner, SpinnerImage }
