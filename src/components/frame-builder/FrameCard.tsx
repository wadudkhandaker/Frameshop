import React from 'react';
import { Frame } from './types';

interface FrameCardProps {
  frame: Frame;
  isSelected: boolean;
  onClick: () => void;
}

export const FrameCard: React.FC<FrameCardProps> = ({ frame, isSelected, onClick }) => {
  const getFrameColor = (colour: string): string => {
    const colorMap: { [key: string]: string } = {
      'Black': '#2c2c2c',
      'White': '#f8f8f8',
      'Raw Oak': '#d4a574',
      'Black Grain': '#3c3c3c',
      'White Grain': '#f0f0f0',
      'Silver': '#c0c0c0',
      'Gold': '#daa520',
      'Antique Gold': '#b8860b',
      'Red': '#dc2626',
      'Blue': '#2563eb',
      'Green': '#16a34a',
    };
    return colorMap[colour] || '#d4a574';
  };

  return (
    <div className="frame-card__container">
      <div 
        className={`frame-card ${isSelected ? 'frame-card--selected' : ''}`}
        onClick={onClick}
      >
        <div className="frame-card__main">
          {/* Frame preview */}
          <div className="frame-image-container">
            <div 
              className="frame-preview"
              style={{
                backgroundColor: getFrameColor(frame.color),
                border: `8px solid ${getFrameColor(frame.color)}`,
                borderRadius: '2px',
                width: '80px',
                height: '60px',
                position: 'relative',
                boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div 
                className="frame-inner"
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              />
            </div>
          </div>
          
          <div className="frame-card__code">{frame.code}</div>
          <div className="frame-card__size">Width: {frame.width} cm</div>
          <div className="frame-card__rate">Price Rate {frame.priceRate}</div>
        </div>
        
        <div className={`frame-card__info ${isSelected ? 'frame-card__info--expanded' : ''}`}>
          <table className="frame-card__info__table">
            <thead>
              <tr>
                <td colSpan={2} className="title">{frame.code}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Width</td>
                <td>{frame.width} cm</td>
              </tr>
              <tr>
                <td>Depth</td>
                <td>{frame.depth} cm</td>
              </tr>
              <tr>
                <td>Rebate</td>
                <td>{frame.rebate} cm</td>
              </tr>
              <tr>
                <td>Material</td>
                <td>{frame.material}</td>
              </tr>
              <tr>
                <td>Colour</td>
                <td>{frame.color}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
