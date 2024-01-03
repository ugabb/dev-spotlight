//uuid
import { v4 } from 'uuid'
import { storage } from '@/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface IImages {
    url: string
}

export default function useUploadImages() {
    async function uploadImagesToFirebase(images: File[]) {
        if (images.length <= 0) {
            return;
        };

        const imagesUrl: IImages[] = [];

        for (let img of images) {
            // Create a storage reference from our storage service
            const [name, _] = img?.name.split('.');
            const imageName = `${name} - ${v4()}`;
            const projectImagesRef = ref(storage, `project-images/${imageName}`);
            await uploadBytes(projectImagesRef, img)

            const imageUrl = await getDownloadURL(projectImagesRef);
            imagesUrl.push({ url: imageUrl });
        }
        return imagesUrl;
    }

    // async function getImageUrl(){

    // }

    return { uploadImagesToFirebase };
}