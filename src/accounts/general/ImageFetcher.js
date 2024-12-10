import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/DataContext';

const ImageFetcher = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const contData = useAppContext().data;
    const id = contData.id;

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch('http://localhost:8080/users/avatar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id }) //если нет изображения вернуть пустой 
                });

                if (response.status === 404) {
                    throw new Error('У Вас нет аватара');
                }
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const blob = await response.blob();
                if (blob.size === 0) {
                    throw new Error('У Вас нет аватара');
                }
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();

        // Очистка URL при размонтировании компонента
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {imageUrl ? <img src={imageUrl} alt={`Image`} /> : <div>No image found</div>}
        </div>
    );
};

export default ImageFetcher;
