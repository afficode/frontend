import imageCompression from 'browser-image-compression';

const useImageCompressor = () => {
    const compressImages = async (files) => {
        console.log(files);
        const compressedFiles = await Promise.all(
            files.map(async (file) => {
                if (!(file instanceof File)) {
                    return file;
                }

                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                    fileType: 'image/webp',
                    initialQuality: 1,
                };

                try {
                    const compressedBlob = await imageCompression(file, options);

                    const newFileName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
                    return new File([compressedBlob], newFileName, {
                        type: 'image/webp',
                        lastModified: Date.now(),
                    });
                } catch {
                    throw new Error(
                        `Could not compress "${file.name}". The file might be corrupt.`
                    );
                }
            })
        );

        return compressedFiles;
    };

    return { compressImages };
};

export default useImageCompressor;
