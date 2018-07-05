# progressive-image-loading
React实现的渐进式加载图片组件（Progressive Image Loading Component），支持通过指定缩略图方式渐进图片加载的过程，支持指定模糊值(blurRadius)、占位图、fallback图、强制获取源文件、是否为'双胞胎'图片的自定义函数等。<br>
共分2种模式:
* 缩略图过渡模式，若指定缩略图thumbnailUrl，会在canvas画布中展示放大尺寸的模糊效果的缩略图，等待源文件异步加载完毕后替换展示；<br>
* 普通模式，若未指定缩略图thumbnailUrl，退化成简单版本的异步加载图片的方式，源文件异步加载完毕即展示。<br>
