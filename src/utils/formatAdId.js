const formatAdId = (id) => {
    // Pad the ID with leading zeros to ensure it has a total length of 9
    const paddedId = String(id).padStart(8, '0'); // 8 zeros since "BF" takes 2 characters
    return `BF${paddedId}`;
};

export default formatAdId;
