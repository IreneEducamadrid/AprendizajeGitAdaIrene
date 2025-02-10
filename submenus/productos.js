document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.querySelector(".main-image");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
  
    let currentIndex = 0;
  
    const updateMainImage = (index) => {
      mainImage.src = thumbnails[index].src;
      currentIndex = index;
    };
  
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => updateMainImage(index));
    });
  
    leftArrow.addEventListener("click", () => {
      const newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      updateMainImage(newIndex);
    });
  
    rightArrow.addEventListener("click", () => {
      const newIndex = (currentIndex + 1) % thumbnails.length;
      updateMainImage(newIndex);
    });
  });
  