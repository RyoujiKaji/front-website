import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/DataContext';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const data = useAppContext().data
  const id = data.id;
  const userRole = data.role;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Пожалуйста, выберите файл для загрузки.");
      return;
    }

    try {
      // Преобразуем файл в Blob
      const blob = new Blob([selectedFile], { type: selectedFile.type });

      // Создаем FormData для отправки файла
      const formData = new FormData();
      formData.append('image', selectedFile.name);
      formData.append('id', id);

      // Отправляем запрос на сервер
      const response = await fetch('путь к api авы', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке изображения');
      }

      const result = await response.json();
      console.log('Успешно загружено:', result); //обработать ответ
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReturnClick = () => {
    navigate('/' + userRole + 'account');
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Загрузить изображение</button>
      <button onClick={handleReturnClick}>Вернуться в личный кабинет</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUploader;