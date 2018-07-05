import React, { Component } from 'react';
import { render } from 'react-dom';
import ProgressiveImageLoading from '../../index';
import pic from '../assets/pic.jpg';
import thumbnail from '../assets/pic.thumbnail.jpg';
import '../../style.css';
import '../css/app.css';

export default class App extends Component {
  render() {
    return (
      <div style={{ width: 1200, height: 800 }}>
        <ProgressiveImageLoading
          thumbnailUrl={thumbnail}
          imageUrl={pic}
          blurRadius={50}
          width={1200}
          height={800}
          forceFetchImage={false}
          effectDuration={1000}
          imageEffectOnCls={['scenery-img', 'loaded']}
          imageEffectOffCls={['scenery-img']}
          canvasEffectOnCls={['scenery-img-canvas']}
          canvasEffectOffCls={['scenery-img-canvas', 'unloaded']}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
