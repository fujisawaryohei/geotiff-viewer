import React, { useState, useRef } from 'react';
import { fromArrayBuffer, GeoTIFFImage } from 'geotiff';
import { ReactZoomPanPinch } from 'react-zoom-pan-pinch';

interface GeoTiffViewerProps {
  file: File;
}

const GeoTiffViewr: React.FC<GeoTiffViewerProps> = ({ file }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState<Promise<GeoTIFFImage> | null>(null);
  const [scale, setScale] = useState(1);
  const ReactZoomPanPinchRef = useRef<ReactZoomPanPinch | null>(null);

  const handleImageLoaded = async (image: HTMLImageElement) => {
    try {
      const tiff = await fromArrayBuffer(arrayBuffer);
      const image = await setImage(tiff.getImage());
      const width = image.getWidth();
      const height = image.getHeight();

      if(ReactZoomPanPinch.current) {
        // 初期位置とスケールを設定
        ReactZoomPanPinch.current.reset({ x: position.x, y: position.y, scale });
      }
    } catch (error) {
      console.error(error);
    }
  }

    return (
      <div>
        <ReactZoomPanPinch
          ref={ReactZoomPanPinchRef}
          
          scale={scale}
          position={position}
          onPan={setPosition}
          onZoom={setScale}
        >
          { image && (
            <img src={image.src} width={image.width} height={image.height} />
          )}
        </ReactZoomPanPinch>
      </div>
    )
}