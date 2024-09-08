import { HexColorInput, HexColorPicker } from 'react-colorful';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useContext, useState } from 'react';
import { HandleThemmingContext } from '@/context/HandleThemming';
import { ChevronsUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

const PickColor = () => {
  const {
    primaryColor,
    setPrimaryColor,
    saturation,
    setSaturation,
    lightness,
    setLightness,
    hue,
    setHue,
    convertToHsl,
  } = useContext(HandleThemmingContext);
  const [isHsl, setIsHsl] = useState(true);

  return (
    <div className="shadow-sm flex items-center gap-2 rounded-full border border-muted-foreground/50 w-full max-w-md h-14">
      <Popover>
        <PopoverTrigger asChild>
          <small className="ml-3 my-2 size-8 bg-primary rounded-full cursor-pointer"></small>
        </PopoverTrigger>
        <PopoverContent asChild className="w-fit p-0 bg-transparent">
          <HexColorPicker
            color={primaryColor}
            onChange={(e) => convertToHsl(e)}
          />
        </PopoverContent>
      </Popover>
      {(isHsl && (
        <div className="flex-1 h-full flex items-center">
          <p className="flex-initial text-lg font-medium pr-1 text-secondary">
            #
          </p>
          <HexColorInput
            className="h-full flex-1 text-lg font-medium bg-transparent text-secondary"
            color={primaryColor}
            onChange={(e) => convertToHsl(e)}
          />
        </div>
      )) || (
        <div className="flex-1 h-full flex items-center">
          <div className="flex-1 h-full relative">
            <div className="absolute top-1/2 transform -translate-y-1/2 left-4 text-muted-foreground text-lg uppercase">
              H
            </div>
            <Input
              type="number"
              className="flex-1 h-full border-l-transparent border-y-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 border border-r-1 border-r-muted-foreground/50 rounded-none pl-10 text-lg font-medium"
              value={hue}
              onChange={(e) => setHue(e.target.value)}
            />
          </div>
          <div className="flex-1 h-full relative">
            <div className="absolute top-1/2 transform -translate-y-1/2 left-4 text-muted-foreground text-lg uppercase">
              s
            </div>
            <Input
              type="number"
              className="flex-1 h-full border-l-transparent border-y-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 border border-r-1 border-r-muted-foreground/50 rounded-none pl-10 text-lg font-medium"
              value={saturation}
              onChange={(e) => setSaturation(e.target.value)}
            />
          </div>
          <div className="flex-1 h-full relative">
            <div className="absolute top-1/2 transform -translate-y-1/2 left-4 text-muted-foreground text-lg uppercase">
              l
            </div>
            <Input
              type="number"
              className="flex-1 h-full border-l-transparent border-y-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 border border-r-1 border-r-muted-foreground/50 rounded-none pl-10 text-lg font-medium"
              value={lightness}
              onChange={(e) => setLightness(e.target.value)}
            />
          </div>
        </div>
      )}
      <button
        className="flex-initial h-10 mx-3 my-2 flex justify-center items-center text-secondary-foreground"
        onClick={() => setIsHsl(!isHsl)}
      >
        <p>HEX</p>
        <ChevronsUpDown className="size-5" />
      </button>
    </div>
  );
};

export default PickColor;
