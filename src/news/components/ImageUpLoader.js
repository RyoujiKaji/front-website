import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/DataContext';

const ImageUploader = forwardRef((props, ref) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  /*   const { state } = useLocation();
    const { id } = state; */

  useImperativeHandle(ref, () => ({
    uploadImg: async (newsId) => {

      // console.log(props.id);
      if (!selectedFile) {
        alert("Изображение не выбрано");
        return;
      }

      try {
        // Преобразуем файл в Blob
        const blob = new Blob([selectedFile]);
        const MAX_SIZE_OF_FILE = 65000;
        if (blob.size >= MAX_SIZE_OF_FILE) {
          throw new Error('Размер выбранного файла слишком большой');
        }

        // Создаем FormData для отправки файла
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('id', newsId.toString());

        // Отправляем запрос на сервер
        const response = await fetch('http://localhost:8080/news/editimg', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Ошибка при загрузке изображения');
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error);
        }
        //console.log('Успешно загружено:', result); //обработать ответ
      } catch (error) {
        setError(error.message);
      }
    }
  }));

  const navigate = useNavigate();
  // const data = useAppContext().data
  // const id = data.id;
  // const userRole = data.role;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
});

export default ImageUploader;
ImageUploader.displayName = "ImgUploader";
