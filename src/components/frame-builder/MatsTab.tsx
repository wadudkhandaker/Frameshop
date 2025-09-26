import React, { useMemo } from 'react';
import { Info } from 'lucide-react';
import { MatStyle, ImageOverlap, MatCategory, MatWidthType, MatBoard } from './types';
import { matBoards } from './data';

interface MatsTabProps {
  matStyle: MatStyle;
  setMatStyle: (style: MatStyle) => void;
  imageOverlap: ImageOverlap;
  setImageOverlap: (overlap: ImageOverlap) => void;
  vGroove: boolean;
  setVGroove: (groove: boolean) => void;
  activeMatCategory: MatCategory;
  setActiveMatCategory: (category: MatCategory) => void;
  selectedMatBoard: MatBoard | null;
  setSelectedMatBoard: (board: MatBoard | null) => void;
  matWidthType: MatWidthType;
  setMatWidthType: (type: MatWidthType) => void;
  uniformWidth: string;
  setUniformWidth: (width: string) => void;
  customWidths: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  setCustomWidths: (widths: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  }) => void;
}

const MatsTab: React.FC<MatsTabProps> = ({
  matStyle,
  setMatStyle,
  imageOverlap,
  setImageOverlap,
  vGroove,
  setVGroove,
  activeMatCategory,
  setActiveMatCategory,
  selectedMatBoard,
  setSelectedMatBoard,
  matWidthType,
  setMatWidthType,
  uniformWidth,
  setUniformWidth,
  customWidths,
  setCustomWidths
}) => {
  const filteredMatBoards = useMemo(() => {
    return matBoards.filter(mat => mat.category === activeMatCategory);
  }, [activeMatCategory]);

  return (
    <div className="space-y-6">
      {/* Mat Style */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Style</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="1"
                checked={matStyle === '1'}
                onChange={(e) => setMatStyle(e.target.value as MatStyle)}
                className="mr-3 text-amber-600"
              />
              Single
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="2"
                checked={matStyle === '2'}
                onChange={(e) => setMatStyle(e.target.value as MatStyle)}
                className="mr-3 text-amber-600"
              />
              Double
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="0"
                checked={matStyle === '0'}
                onChange={(e) => setMatStyle(e.target.value as MatStyle)}
                className="mr-3 text-amber-600"
              />
              None
            </label>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Image overlap</h4>
          <div className="space-y-2">
            <select
              value={imageOverlap}
              onChange={(e) => setImageOverlap(e.target.value as ImageOverlap)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              disabled={matStyle === '0'}
            >
              <option value="PHOTO">On</option>
              <option value="EXACT">Off</option>
            </select>
            <div className="relative group">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                <div><strong>On</strong>: Opening cut with 3-5mm image overlap.</div>
                <div><strong>Off</strong>: Opening cut to exact image size entered.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {matStyle !== '0' && (
        <>
          {/* Top Mat */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Top Mat</h4>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={vGroove}
                  onChange={(e) => setVGroove(e.target.checked)}
                  className="mr-2 text-amber-600"
                />
                V Groove
                <div className="relative group ml-2">
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    A vgroove is a line cut around the opening which helps bring focus to your image
                  </div>
                </div>
              </label>
            </div>

            {/* Mat Category Tabs */}
            <div className="border-b border-gray-200 mb-4">
              <div className="flex gap-1">
                {[
                  { id: 'white-core', label: 'White Core' },
                  { id: 'black-core', label: 'Black Core' },
                  { id: 'museum', label: 'Museum' }
                ].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveMatCategory(category.id as MatCategory)}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                      activeMatCategory === category.id
                        ? 'bg-amber-600 text-white border-b-2 border-amber-600'
                        : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mat Board Grid */}
            <div className="grid grid-cols-8 gap-2 mb-6">
              {filteredMatBoards.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMatBoard(mat)}
                  className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                    selectedMatBoard?.id === mat.id
                      ? 'border-amber-500 ring-2 ring-amber-200'
                      : 'border-gray-300 hover:border-amber-300'
                  }`}
                  style={{ backgroundColor: mat.color }}
                  title={mat.name}
                />
              ))}
            </div>

            {/* Mat Width Options */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="uniform"
                    checked={matWidthType === 'uniform'}
                    onChange={(e) => setMatWidthType(e.target.value as MatWidthType)}
                    className="mr-2 text-amber-600"
                    disabled={matStyle === ('0' as MatStyle)}
                  />
                  Uniform Width
                </label>
                <input
                  type="number"
                  value={uniformWidth}
                  onChange={(e) => setUniformWidth(e.target.value)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  min="2"
                  max="20"
                  step="0.1"
                  disabled={matStyle === ('0' as MatStyle) || matWidthType !== 'uniform'}
                />
                <span className="text-sm text-gray-600">cm</span>
              </div>

              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="radio"
                    value="custom"
                    checked={matWidthType === 'custom'}
                    onChange={(e) => setMatWidthType(e.target.value as MatWidthType)}
                    className="mr-2 text-amber-600"
                    disabled={matStyle === ('0' as MatStyle)}
                  />
                  Custom Width
                </label>
                {matWidthType === 'custom' && (
                  <div className="grid grid-cols-4 gap-2 ml-6">
                    {['top', 'bottom', 'left', 'right'].map((side) => (
                      <div key={side}>
                        <label className="block text-xs text-gray-500 mb-1 capitalize">
                          {side}:
                        </label>
                        <input
                          type="number"
                          value={customWidths[side as keyof typeof customWidths]}
                          onChange={(e) => setCustomWidths({
                            ...customWidths,
                            [side]: e.target.value
                          })}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          min="2"
                          max="20"
                          step="0.1"
                          disabled={matStyle === ('0' as MatStyle)}
                        />
                      </div>
                    ))}
                    <div className="col-span-4 text-xs text-gray-600 mt-1">cm</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Mat - HTML only, visible when Double is selected */}
      {matStyle === '2' && (
        <div className="pt-2">
          <hr className="my-4" />
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Bottom Mat</h4>
          </div>

          {/* Tabs (static for now) */}
          <div className="border-b border-gray-200 mb-4">
            <ul className="flex gap-1">
              <li className="px-4 py-2 text-sm font-medium rounded-t-lg text-gray-600 hover:text-amber-600 hover:bg-amber-50">White Core</li>
              <li className="px-4 py-2 text-sm font-medium rounded-t-lg bg-amber-600 text-white border-b-2 border-amber-600">Black Core</li>
              <li className="px-4 py-2 text-sm font-medium rounded-t-lg text-gray-600 hover:text-amber-600 hover:bg-amber-50">Museum</li>
            </ul>
          </div>

          {/* Swatch grid (static, non-interactive) */}
          <div className="grid grid-cols-8 gap-2 mb-6">
            {matBoards.slice(0, 24).map((mat) => (
              <div
                key={`bottom-${mat.id}`}
                className="w-12 h-12 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: mat.color }}
                title={mat.name}
              />
            ))}
          </div>

          {/* Width input (static) */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700">Width:</label>
            <input
              type="number"
              className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              min="0.5"
              max="20"
              step="0.1"
              defaultValue={0.5}
            />
            <span className="text-sm text-gray-600">cm</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatsTab;