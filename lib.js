import StackBlur from 'stackblur-canvas';
import 'es6-promise/auto';

export const drawBlurImage = (canvasNode, image, blurRadius = 100) => {
  try {
    if (canvasNode) {
      let w = canvasNode.width;
      let h = canvasNode.height;
      let context = canvasNode.getContext('2d');
      context.clearRect(0, 0, w, h);
      context.drawImage(image, 0, 0, w, h);
      StackBlur.canvasRGBA(canvasNode, 0, 0, w, h, blurRadius);
    }
  } catch (e) {
    console.error(e);
  }
};

export const clearCanvas = canvasNode => {
  try {
    if (canvasNode) {
      let w = canvasNode.width;
      let h = canvasNode.height;
      let context = canvasNode.getContext('2d');
      context.clearRect(0, 0, w, h);
    }
  } catch (e) {
    console.error(e);
  }
};

export const normalize = x => {
  return typeof x !== 'number' ? parseFloat(x) | 0 : x;
};

export const loadImage = url => {
  let image = null;
  if (typeof url === 'string') {
    image = new Image();
    // crossOrigin需在src之前赋值
    image.crossOrigin = 'Anonymous';
    // 确保load事件在是缓存过的图片时也能触发
    if (image.complete || image.complete === undefined) {
      image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    }
    image.src = url;
  } else {
    return Promise.reject({ url });
  }

  let result = new Promise((resolve, reject) => {
    if (image.naturalWidth) {
      resolve({ image });
    } else if (image.complete) {
      reject({ image });
    } else {
      image.addEventListener('load', completed);
      image.addEventListener('error', completed);
    }
    function completed(e) {
      if (image.naturalWidth) {
        resolve({
          e,
          image,
        });
      } else {
        reject({
          e,
          image,
        });
      }
      image.removeEventListener('load', completed);
      image.removeEventListener('error', completed);
    }
  });
  result.image = image;
  return result;
};

export const setStyle = (elem, style = {}) => {
  if (elem) {
    style = style || {};
    for (let prop in style) {
      try {
        elem.style[prop] = style[prop];
      } catch (e) {}
    }
  }
};
