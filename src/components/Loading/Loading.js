//CSS
import './Loading.css';

//Other
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import loadingAnimation from './loadingAnimation.json';

const Loading = () => {
  const loadingRef = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: loadingRef.current,
      animationData: loadingAnimation,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
  }, []);
  return (
    <div className='loading-container'>
      <div ref={loadingRef} id='loadingAnimation'></div>
    </div>
  );
};

export default Loading;
