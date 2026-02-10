export const generateCategoryUrl = (category) => {
    return category.toLowerCase().replace(/[\s,&]+/g, '-');
};

export const generateSubCategoryUrl = (category) => {
    return category.toLowerCase().replace(/[\s,&]+/g, '-');
};
