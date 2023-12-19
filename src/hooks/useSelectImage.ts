import { useState } from "react";

export default function useSelectImage() {
    const [result, setResult] = useState<string[]>([]);

    function selectImageLocally(images: File[]) {
        const newResults: string[] = [];

        for (let i = 0; i < images.length; i++) {
            const reader = new FileReader();

            reader.addEventListener("load", (event: any) => {
                newResults[i] = event.target.result; // Use `event.target.result` instead of `event.target.value`
                setResult([...newResults]);
            });

            reader.readAsDataURL(images[i]);
        }
    }

    return { result, selectImageLocally };
}
