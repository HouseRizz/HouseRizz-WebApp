"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProducts } from '@/utils/cloudkit-utils';
import { Product } from '@/types/cloudkit';
import { useAuthContext } from "@/contexts/AuthContext";

const ProductDetail: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const products = await getProducts();
                    const foundProduct = products.find(p => p.recordName === id);
                    setProduct(foundProduct || null);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img
                        src={product.fields.imageURL1.value.downloadURL}
                        alt={product.fields.name}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                    <h1 className="text-3xl font-bold mb-4">{product.fields.name}</h1>
                    <p className="text-xl mb-4">${product.fields.price.toFixed(2)}</p>
                    <p className="mb-4">{product.fields.description}</p>
                    <p className="mb-2"><strong>Category:</strong> {product.fields.category}</p>
                    <p className="mb-2"><strong>Supplier:</strong> {product.fields.supplier}</p>
                    <p className="mb-4"><strong>Address:</strong> {product.fields.address}</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => {
                            // Implement add to cart functionality here
                            console.log('Add to cart:', product.recordName);
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;