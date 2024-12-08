import React, { useEffect, useState } from "react";
const imageUrl = "https://i.imgur.com/fHyEMsl.jpg";

function ObtainedImage(props) {
  const [img, setImg] = useState();
  const [id, setId] = useState();
  const [imageUrl1, setImageUrl] = useState();
  setImageUrl(props.url)
  setId(props.id)

  const fetchImage = async () => {
    //const res = await fetch(imageUrl);
    /* const response = fetch(imageUrl, { // Замените на Ваш API //await - без ответа действие не продолжится
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    }); */
    /* const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL); */
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <img src={img} alt="icons" />
    </>
  );
}

export default ObtainedImage

/* Мы вызываем fetch с imageUrl, чтобы сделать запрос GET к нему.

Затем мы вызываем res.blob, чтобы преобразовать объект ответа в blob.

Затем мы вызываем URL.createObjectURL с imageBlob, чтобы преобразовать его в строку URL, которую мы можем установить как атрибут src элемента img.

Наконец, мы вызываем setImg с imageObjectURL, чтобы мы могли установить img как значение src для его отображения.

Заключение
Чтобы извлечь изображение из API с помощью React, мы можем использовать функцию fetch. */