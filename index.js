import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classlist from 'classlist';
import 'es6-promise/auto';
import { drawBlurImage, clearCanvas, normalize, loadImage, setStyle } from './lib';

const LOAD_CALLBACK_NOOP = (url, e, image) => {};
const DEFAULT_PLACEHOLDER = `data:image/png;base64,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`;

/**
 * 渐进式加载图片，支持通过指定缩略图方式渐进图片加载的过程
 * 分2种模式:
 *  1. 缩略图过渡模式，若指定缩略图thumbnailUrl，会在canvas画布中展示放大尺寸的模糊效果的缩略图，等待源文件异步加载完毕后替换展示；
 *  2. 普通模式，若未指定缩略图thumbnailUrl，退化成简单版本的异步加载图片的方式，源文件异步加载完毕即展示
 * 支持指定模糊值(blurRadius)、占位图、fallback图、强制获取源文件、是否为'双胞胎'图片的自定义函数等
 * @author Cipeng Xu
 */
export default class ProgressiveImageLoading extends Component {
  static propTypes = {
    // 缩略图url
    thumbnailUrl: PropTypes.string,
    // 源图片url，必传
    imageUrl: PropTypes.string.isRequired,
    // 占位图url，可指定data:image base64字符格式或普通图片url格式
    placeholderUrl: PropTypes.string,
    // fallback图片url
    fallbackUrl: PropTypes.string,
    // 图片显示的宽度
    width: PropTypes.number,
    // 图片显示的高度
    height: PropTypes.number,
    // 图片显示的最大宽度（宽高无法明确指定时，该字段必填）
    maxWidth: PropTypes.number,
    // 图片显示的最大高度（宽高无法明确指定时，该字段必填）
    maxHeight: PropTypes.number,
    // 图片的高宽比（宽高未指定时，建议该字段必填，否则会从image.naturalHeight / image.naturalWidth获得）
    ratio: PropTypes.number,
    // 模糊值
    blurRadius: PropTypes.number,
    // fade效果的延迟
    fadeTimeout: PropTypes.number,
    // 是否强制获取源文件方式请求图片
    forceFetchImage: PropTypes.bool,
    // 传递容器的其他React组件属性
    containerProps: PropTypes.object,
    // 传递源图片的alt属性
    alt: PropTypes.string,
    // 传递源图片的title属性
    title: PropTypes.string,
    // 传递源图片的DOM属性
    imageAttributes: PropTypes.object,
    // 动画持续时间，建议传源图片、canvas动画效果中的动画持续时间的最大值
    effectDuration: PropTypes.number,
    // 图片显示动画效果时添加的类名
    imageEffectOnCls: PropTypes.arrayOf(PropTypes.string),
    // 图片移除动画效果时添加的类名
    imageEffectOffCls: PropTypes.arrayOf(PropTypes.string),
    // canvas显示动画效果时添加的类名
    canvasEffectOnCls: PropTypes.arrayOf(PropTypes.string),
    // canvas移除动画效果时添加的类名
    canvasEffectOffCls: PropTypes.arrayOf(PropTypes.string),
    // 加载完成的回调
    onCompleted: PropTypes.func,
    // 缩略图加载成功的回调
    onThumbnailLoaded: PropTypes.func,
    // 缩略图加载失败的回调
    onThumbnailError: PropTypes.func,
    // 源图片加载成功的回调
    onImageLoaded: PropTypes.func,
    // 源图片加载失败的回调
    onImageError: PropTypes.func,
    // 是否为'双胞胎'图片的自定义函数或属性
    equalCustomizer: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  };

  static defaultProps = {
    placeholderUrl: DEFAULT_PLACEHOLDER,
    blurRadius: 100,
    fadeTimeout: 50,
    forceFetchImage: false,
    containerProps: {},
    alt: '',
    title: '',
    imageAttributes: {},
    effectDuration: 200,
    imageEffectOnCls: ['pil-figure-image-anim', 'loaded'],
    imageEffectOffCls: ['pil-figure-image-anim'],
    canvasEffectOnCls: ['pil-figure-canvas-anim'],
    canvasEffectOffCls: ['pil-figure-canvas-anim', 'unloaded'],
    onCompleted: LOAD_CALLBACK_NOOP,
    onThumbnailLoaded: LOAD_CALLBACK_NOOP,
    onThumbnailError: LOAD_CALLBACK_NOOP,
    onImageLoaded: LOAD_CALLBACK_NOOP,
    onImageError: LOAD_CALLBACK_NOOP,
    equalCustomizer: props => {
      let { thumbnailUrl, imageUrl } = props;
      return thumbnailUrl == imageUrl;
    },
  };

  constructor(props) {
    super(props);

    this.state = this.getInitStateFromProps(props);
    this._mounted = false;
    this.figureNode = null;
    this.fillerNode = null;
    this.mediaNode = null;
    this.canvasNode = null;
    this.mountedImage = null;
    this.timers = [];
    this.handleTwinLoaded = this.handleTwinLoaded.bind(this);
    this.handleTwinError = this.handleTwinError.bind(this);
    this.handleThumbnailLoaded = this.handleThumbnailLoaded.bind(this);
    this.handleThumbnailError = this.handleThumbnailError.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
    this.setFigureRef = this.setFigureRef.bind(this);
    this.setFillerRef = this.setFillerRef.bind(this);
    this.setMediaRef = this.setMediaRef.bind(this);
    this.setCanvasRef = this.setCanvasRef.bind(this);
  }

  getInitStateFromProps(props) {
    return {
      thumbnailLoaded: false,
      thumbnailError: false,
      imageLoaded: false,
      imageError: false,
      thumbnailEqualImage: this.isThumbnailEqualImage(props || this.props),
      thumbnail: null,
      image: null,
    };
  }

  isThumbnailEqualImage(props) {
    props = props || this.props;
    let { equalCustomizer } = props;
    if (typeof equalCustomizer === 'function') {
      return equalCustomizer(props);
    } else if (typeof equalCustomizer === 'boolean') {
      return equalCustomizer;
    }
    return false;
  }

  shouldShowPlaceholder(state, props) {
    let { thumbnailLoaded, thumbnailError, imageLoaded, imageError } = state || this.state;
    let { imageUrl } = props || this.props;
    if (
      !imageUrl ||
      !this._mounted ||
      (this._mounted && !thumbnailLoaded && !thumbnailError && !imageLoaded && !imageError)
    ) {
      return true;
    }
    return false;
  }

  shouldShowCanvas(state, props) {
    let { thumbnailLoaded, imageLoaded } = state || this.state;
    let { thumbnailUrl } = props || this.props;
    if (thumbnailUrl && (thumbnailLoaded || imageLoaded)) {
      return true;
    }
    return false;
  }

  shouldStateUpdate({ thumbnailUrl, imageUrl }) {
    if (!thumbnailUrl && !imageUrl) {
      return false;
    }
    let { thumbnailUrl: _thumbnailUrl, imageUrl: _imageUrl } = this.props;
    thumbnailUrl = thumbnailUrl || _thumbnailUrl;
    imageUrl = imageUrl || _imageUrl;
    return this._mounted && `${thumbnailUrl || ''}_${imageUrl || ''}` === `${_thumbnailUrl || ''}_${_imageUrl || ''}`;
  }

  componentDidMount() {
    this._mounted = true;
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    let { thumbnailUrl, imageUrl } = nextProps;
    if (!this.shouldStateUpdate({ thumbnailUrl, imageUrl })) {
      this.destroy();
      this.setState(this.getInitStateFromProps(), () => {
        this.init();
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { thumbnailUrl, imageUrl } = nextProps;
    if (this.shouldShowPlaceholder() !== this.shouldShowPlaceholder(nextState, nextProps)) {
      return true;
    }
    if (this.shouldShowCanvas() !== this.shouldShowCanvas(nextState, nextProps)) {
      return true;
    }
    if (!this.shouldStateUpdate({ thumbnailUrl, imageUrl })) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    this._mounted = false;
    this.figureNode = null;
    this.fillerNode = null;
    this.mediaNode = null;
    this.canvasNode = null;
    this.mountedImage = null;
    this.clearTimers();
  }

  init() {
    let { thumbnailUrl, imageUrl, forceFetchImage, imageEffectOffCls } = this.props;
    let { thumbnailEqualImage } = this.state;

    if (!imageUrl) return;

    if (thumbnailEqualImage) {
      this.loadImg({
        imgUrl: imageUrl,
        forceFetchImage,
        classList: ['pil-figure-image', ...imageEffectOffCls],
        onLoadHandler: this.handleTwinLoaded,
        onErrorHandler: this.handleTwinError,
      });
    } else {
      let thumbnailPromise = this.loadImg({
        imgUrl: thumbnailUrl,
        forceFetchImage,
        classList: [],
        onLoadHandler: this.handleThumbnailLoaded,
        onErrorHandler: this.handleThumbnailError,
      });
      let imagePromise = this.loadImg({
        imgUrl: imageUrl,
        forceFetchImage,
        classList: ['pil-figure-image', ...imageEffectOffCls],
        onLoadHandler: this.handleImageLoaded,
        onErrorHandler: this.handleImageError,
      });
      Promise.all([
        thumbnailPromise.catch(error => Promise.resolve(error)),
        imagePromise.catch(error => Promise.resolve(error)),
      ]).then(() => {
        let { thumbnailLoaded, imageLoaded, thumbnail, image } = this.state;
        let imageForShow = null;
        if (thumbnailLoaded || imageLoaded) {
          imageForShow = imageLoaded ? image : thumbnail;
        }
        if (imageForShow) {
          this.showImage(imageForShow);
        } else {
          this.showFallbackImage({ thumbnailUrl, imageUrl });
        }
      });
    }
  }

  destroy(mediaNode) {
    if (!mediaNode) {
      mediaNode = this.mediaNode;
    }
    if (mediaNode) {
      this.mountedImage && this.mountedImage.parentNode == mediaNode && mediaNode.removeChild(this.mountedImage);
    }
    this.mountedImage = null;
  }

  loadImg({ imgUrl, forceFetchImage = false, classList, onLoadHandler, onErrorHandler }) {
    if (imgUrl) {
      let origImgUrl = imgUrl;
      if (forceFetchImage) {
        // use `?_t=timestamp` force fetch image even when src does not change
        imgUrl = `${imgUrl}?_t=${new Date().getTime()}`;
      }
      return loadImage(imgUrl).then(
        data => {
          let { e, image } = data || {};
          if (image) {
            classList && classlist(image).add(...classList);
            onLoadHandler(origImgUrl, e, image);
            return Promise.resolve({ e, image });
          } else {
            onErrorHandler(origImgUrl, e, image);
            return Promise.reject({ e, image });
          }
        },
        error => {
          let { image } = error || {};
          onErrorHandler(origImgUrl, null, image);
          return Promise.reject({ e: null, image });
        }
      );
    }
    return Promise.reject({ url: imgUrl });
  }

  handleTwinLoaded(url, e, image) {
    if (this.shouldStateUpdate({ imageUrl: url })) {
      let { onCompleted, onImageLoaded } = this.props;
      this.setState({
        ...this.state,
        imageLoaded: true,
      });
      this.showBlurImage(image);
      this.showImage(image);
      onCompleted && onCompleted(url, e, image);
      onImageLoaded && onImageLoaded(url, e, image);
    }
  }

  handleTwinError(url, e, image) {
    if (this.shouldStateUpdate({ imageUrl: url })) {
      let { onCompleted, onImageError } = this.props;
      this.setState({
        ...this.state,
        imageError: true,
      });
      this.showFallbackImage({ thumbnailUrl: url, imageUrl: url });
      onCompleted && onCompleted(url, e, image);
      onImageError && onImageError(url, e, image);
    }
  }

  handleThumbnailLoaded(url, e, image) {
    if (this.shouldStateUpdate({ thumbnailUrl: url })) {
      let { onThumbnailLoaded } = this.props;
      let { imageLoaded } = this.state;
      this.setState({
        ...this.state,
        thumbnailLoaded: true,
        thumbnail: image,
      });
      if (!imageLoaded) {
        this.showBlurImage(image);
      }
      onThumbnailLoaded && onThumbnailLoaded(url, e, image);
    }
  }

  handleThumbnailError(url, e, image) {
    if (this.shouldStateUpdate({ thumbnailUrl: url })) {
      let { onThumbnailError } = this.props;
      this.setState({
        ...this.state,
        thumbnailError: true,
      });
      onThumbnailError && onThumbnailError(url, e, image);
    }
  }

  handleImageLoaded(url, e, image) {
    if (this.shouldStateUpdate({ imageUrl: url })) {
      let { onCompleted, onImageLoaded } = this.props;
      let { thumbnailLoaded } = this.state;
      this.setState({
        ...this.state,
        imageLoaded: true,
        image,
      });
      if (!thumbnailLoaded) {
        this.showBlurImage(image);
      }
      onCompleted && onCompleted(url, e, image);
      onImageLoaded && onImageLoaded(url, e, image);
    }
  }

  handleImageError(url, e, image) {
    if (this.shouldStateUpdate({ imageUrl: url })) {
      let { onCompleted, onImageError } = this.props;
      this.setState({
        ...this.state,
        imageError: true,
      });
      onCompleted && onCompleted(url, e, image);
      onImageError && onImageError(url, e, image);
    }
  }

  showBlurImage(image) {
    let { blurRadius, canvasEffectOnCls, canvasEffectOffCls } = this.props;
    if (this.canvasNode) {
      let canvasNode = this.canvasNode;
      let cl = classlist(canvasNode);
      cl.remove(...canvasEffectOffCls);
      cl.add(...canvasEffectOnCls);
      drawBlurImage(canvasNode, image, blurRadius);
    }
  }

  showImage(image) {
    let {
      fadeTimeout,
      effectDuration,
      canvasEffectOnCls,
      canvasEffectOffCls,
      imageEffectOnCls,
      imageEffectOffCls,
    } = this.props;
    if (this.canvasNode) {
      let canvasNode = this.canvasNode;
      this.timers.push(
        setTimeout(() => {
          let cl = classlist(canvasNode);
          cl.remove(...canvasEffectOnCls);
          cl.add(...canvasEffectOffCls);
          this.timers.push(
            setTimeout(() => {
              this.clearBlurCanvas();
            }, effectDuration)
          );
        }, fadeTimeout)
      );
    }
    if (this.mediaNode) {
      let mediaNode = this.mediaNode;
      this.destroy(mediaNode);
      this.mountedImage = this.setImageAttributes(image);
      mediaNode.appendChild(this.mountedImage);
      this.timers.push(
        setTimeout(() => {
          if (this.mountedImage) {
            let cl = classlist(this.mountedImage);
            cl.remove(...imageEffectOffCls);
            cl.add(...imageEffectOnCls);
          }
        }, fadeTimeout)
      );
    }
  }

  showFallbackImage({ thumbnailUrl, imageUrl }) {
    this.loadFallbackImage(
      (url, e, fallbackImage) => {
        this.showImage(fallbackImage);
      },
      () => {
        if (this.shouldStateUpdate({ thumbnailUrl, imageUrl })) {
          this.setState({
            ...this.state,
            imageError: true,
          });
          this.forceUpdate();
        }
      }
    );
  }

  loadFallbackImage(onFallbackLoad, onFallbackError) {
    let { fallbackUrl, imageEffectOffCls } = this.props;
    if (fallbackUrl) {
      return this.loadImg({
        imgUrl: fallbackUrl,
        forceFetchImage: false,
        classList: ['pil-figure-image', ...imageEffectOffCls],
        onLoadHandler: onFallbackLoad,
        onErrorHandler: onFallbackError,
      });
    } else {
      return Promise.reject({ url: null }).catch(onFallbackError);
    }
  }

  getAutoAdjustSize(image) {
    let { width, height, maxWidth, maxHeight } = this.props;
    width = normalize(width);
    height = normalize(height);
    maxWidth = normalize(maxWidth);
    maxHeight = normalize(maxHeight);
    let w = width,
      h = height;
    let { naturalWidth, naturalHeight } = image;
    let auto = false;
    if (naturalWidth && naturalHeight && (width == 0 || height == 0)) {
      if (width > 0) {
        h = (width * naturalHeight) / naturalWidth;
      } else if (height > 0) {
        w = (height * naturalWidth) / naturalHeight;
      } else {
        // 宽高都无法明确指定时，根据最大宽度、最大高度等比例缩小或放大展示
        if (naturalWidth > naturalHeight) {
          if (maxWidth > 0) {
            w = maxWidth;
            h = (maxWidth * naturalHeight) / naturalWidth;
          } else {
            h = maxHeight;
            w = (maxHeight * naturalWidth) / naturalHeight;
          }
        } else {
          if (maxHeight > 0) {
            h = maxHeight;
            w = (maxHeight * naturalWidth) / naturalHeight;
          } else {
            w = maxWidth;
            h = (maxWidth * naturalHeight) / naturalWidth;
          }
        }
      }
      auto = true;
    }
    return {
      width: w,
      height: h,
      auto,
    };
  }

  setAutoAdjustStyles(autoAdjustSize) {
    let { width, height, auto } = autoAdjustSize;
    if (auto && width > 0 && height > 0) {
      if (this.figureNode) {
        classlist(this.figureNode).add('auto');
        setStyle(this.figureNode, {
          width: `${width}px`,
          height: `${height}px`,
        });
      }
      if (this.fillerNode) {
        setStyle(this.fillerNode, {
          paddingBottom: `${(height / width) * 100}%`,
        });
      }
    }
  }

  setImageAttributes(image) {
    let { alt, title, imageAttributes } = this.props;
    let autoAdjustSize = this.getAutoAdjustSize(image);
    let { width: w, height: h } = autoAdjustSize;
    image.width = w;
    image.height = h;
    if (alt) {
      image.alt = alt;
    }
    if (title) {
      image.title = title;
    }

    _.forEach(imageAttributes, (value, key) => key != undefined && image.setAttribute(key, value));

    this.setAutoAdjustStyles(autoAdjustSize);

    return image;
  }

  clearBlurCanvas() {
    if (this.canvasNode) {
      clearCanvas(this.canvasNode);
    }
  }

  clearTimers() {
    _.forEach(this.timers, timer => clearTimeout(timer));
    this.timers = null;
  }

  setFigureRef(node) {
    this.figureNode = node;
  }

  setFillerRef(node) {
    this.fillerNode = node;
  }

  setMediaRef(node) {
    this.mediaNode = node;
  }

  setCanvasRef(node) {
    this.canvasNode = node;
  }

  getFillerStyle() {
    let { width, height, ratio } = this.props;
    let fillerPaddingBottom = 1;
    let _width = normalize(width);
    let _height = normalize(height);
    if (_width > 0 && _height > 0) {
      fillerPaddingBottom = _height / _width;
    } else if (ratio > 0) {
      fillerPaddingBottom = ratio;
    } else if (this.mountedImage) {
      let { naturalWidth, naturalHeight } = this.mountedImage;
      if (naturalWidth && naturalHeight) {
        fillerPaddingBottom = naturalHeight / naturalWidth;
      }
    }
    return {
      paddingBottom: `${fillerPaddingBottom * 100}%`,
    };
  }

  getCanvasClsName(animOn = false) {
    let { canvasEffectOnCls, canvasEffectOffCls } = this.props;
    let clsArr = ['pil-figure-canvas', ...(animOn ? canvasEffectOnCls : []), ...(!animOn ? canvasEffectOffCls : [])];
    return clsArr.join(' ');
  }

  getImageClsName(animOn = false) {
    let { imageEffectOnCls, imageEffectOffCls } = this.props;
    let clsArr = ['pil-figure-image', ...(animOn ? imageEffectOnCls : []), ...(!animOn ? imageEffectOffCls : [])];
    return clsArr.join(' ');
  }

  render() {
    let { thumbnailUrl, placeholderUrl, fallbackUrl, width, height, alt, title, containerProps, children } = this.props;
    let { imageError } = this.state;
    return (
      <div className="pil-figure" ref={this.setFigureRef} {...containerProps}>
        <div className="pil-figure-placeholder">
          <div className="pil-figure-filler" ref={this.setFillerRef} style={this.getFillerStyle()} />
          <div className="pil-figure-media" ref={this.setMediaRef}>
            {this.shouldShowCanvas() && <canvas className={this.getCanvasClsName(true)} ref={this.setCanvasRef} />}
            {this.shouldShowPlaceholder() && (
              <img className="pil-figure-image-placeholder" src={placeholderUrl} width={width} height={height} />
            )}
            {!this.shouldShowPlaceholder() && imageError ? (
              fallbackUrl ? (
                <img
                  className={this.getImageClsName(true)}
                  src={fallbackUrl}
                  width={width}
                  height={height}
                  alt={alt}
                  title={title}
                />
              ) : children ? (
                children
              ) : (
                <p>Image Not Found.</p>
              )
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
