import React from 'react';
import { useParams } from 'react-router-dom';

const ProductList = () => {
	const { categoryName, subCategoryName } = useParams();
	// console.log(categoryName, subCategoryName);
	return (
		<div className="min-h-screen">
			<h1>{categoryName} ProductList</h1>

			<h5>{subCategoryName}</h5>
		</div>
	);
};

export default ProductList;
