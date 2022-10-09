import cloudinary from '@/resources/cloudinary';

const { uploader } = cloudinary;

export async function uploadFile(path: string) {
    const response = await uploader.upload(
        path,
        {
            unique_filename: true
        }
    );

    if (!response) {
        throw {
            code: 500,
            message: `failed to upload file with path: ${ path }`
        };
    }

    return {
        filename: response.public_id
    };
}