import imageCompression from 'browser-image-compression';

const useImageCompressor = () => {

    const compressImages = async (files) => {
        const compressedFiles = await Promise.all(
            files.map(async (file) => {
                if (!(file instanceof File)) {return file;}

                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1200,
                    useWebWorker: true,
                    fileType: 'image/webp',
                    initialQuality: 0.8,
                };

                try {
                    const compressedBlob = await imageCompression(file, options);        

                    const newFileName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
                    return new File([compressedBlob], newFileName, { type: 'image/webp', lastModified: Date.now() });
                } catch {
                    return file; 
                }
            })
        );

        return compressedFiles;
    };

    return { compressImages };
};

export default useImageCompressor;
