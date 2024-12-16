import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/DataContext';

const ImageFetcher = (props) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId]= useState(props.id);

    const contData = useAppContext().data;
    //const id = contData.id;

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch('http://localhost:8080/news/getimg', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id }) //если нет изображения вернуть пустой 
                });

                if (response.status === 404) {
                    throw new Error('Изображение отсутствует');
                }
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const blob = await response.blob();
               /*  if (blob.size === 0) {
                    throw new Error(''); //обходим создание url
                } */
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
            {imageUrl ? <img src={imageUrl} alt={`Image`} class = "image" /> : <div>No image found</div>}
        </div>
    );
};

export default ImageFetcher;
