import cloudinary from '@/resources/cloudinary';

const { uploader } = cloudinary;

export async function uploadFile(path:string) {
    const res = await uploader.upload(
        path,
        {
            unique_filename: true
        }
    );

    if(!res) {
        throw {
            code: 500,
            message: `Failed to upload file with path: ${path}`
        };
    }

    return {
        filename: res.public_id
    };
}