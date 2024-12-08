import React, { useState } from 'react';

const ImageUploader = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

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
      formData.append('image', blob, selectedFile.name);

      // Отправляем запрос на сервер
      const response = await fetch(props.way, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке изображения');
      }

      const result = await response.json();
      console.log('Успешно загружено:', result);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Загрузить изображение</button>
    </div>
  );
};

export default ImageUploader;
