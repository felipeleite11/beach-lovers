import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { extname } from 'path'
import { v4 as uuid } from 'uuid'

export const minioClient = new S3Client({
	endpoint: process.env.STORAGE_ENDPOINT as string,
	forcePathStyle: true,
	region: process.env.STORAGE_REGION,
	credentials: {
		accessKeyId: process.env.STORAGE_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY as string
	}
})

export async function uploadToMinio(file: File): Promise<string> {
	if(!file) {
		throw new Error('Arquivo não enviado.')
	}

	const bytes = await file.arrayBuffer()
	const buffer = Buffer.from(bytes)
	const extension = extname(file.name)
	const filename = `${uuid()}.${extension}`

	const uploadCommand = new PutObjectCommand({
		ACL: 'public-read',
		Bucket: process.env.STORAGE_BUCKET,
		Key: filename,
		Body: buffer,
		ContentType: file.type
	})

	await minioClient.send(uploadCommand!)

	return `${process.env.STORAGE_ENDPOINT}/${process.env.STORAGE_BUCKET}/${filename}`
}
