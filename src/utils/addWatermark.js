const addWatermarkToImage = (file, watermarkText = '©boonfu.com') => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                const fontSize = Math.max(12, canvas.width / 40);
                ctx.font = `bold ${fontSize}px Inter`;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.lineWidth = 2;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const x = canvas.width / 2;
                const y = canvas.height / 2;
                ctx.strokeText(watermarkText, x, y);
                ctx.fillText(watermarkText, x, y);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const newFileName = file.name.replace(/\.[^/.]+$/, '') + '.webp';

                            const watermarkedFile = new File([blob], newFileName, {
                                type: 'image/webp',
                                lastModified: Date.now(),
                            });
                            resolve(watermarkedFile);
                        } else {
                            reject(new Error(`System could not process ${file.name}`));
                        }
                    },
                    'image/webp',
                    0.9
                );
            };

            img.onerror = () =>
                reject(
                    new Error(
                        `The file "${file.name}" appears to be corrupted or not a valid image.`
                    )
                );
            img.src = e.target.result;
        };

        reader.onerror = () => reject(new Error(`Could not read permissions for "${file.name}".`));
        reader.readAsDataURL(file);
    });
};

export default addWatermarkToImage;
