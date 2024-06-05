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
  const { primaryColor, setPrimaryColor } = useContext(HandleThemmingContext);
  const [isHsl, setIsHsl] = useState(true);

  return (
    <div className="shadow-sm flex items-center gap-2 rounded-full border border-muted-foreground/50 w-96 h-14">
      <Popover>
        <PopoverTrigger asChild>
          <small className="ml-3 my-2 size-8 bg-primary rounded-full cursor-pointer"></small>
        </PopoverTrigger>
        <PopoverContent asChild className="w-fit p-0 bg-transparent">
          <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
        </PopoverContent>
      </Popover>
      {(isHsl && (
        <div className="flex-1 h-full flex items-center">
          <p className="flex-initial">#</p>
          <HexColorInput
            className="h-full flex-1"
            color={primaryColor}
            onChange={setPrimaryColor}
          />
        </div>
      )) || (
        <div className="flex-1 h-full flex items-center">
          <Input className="flex-1 h-full focus:border-none border border-r-primary rounded-none" />
          <Input className="flex-1 h-full focus:border-none border border-r-primary rounded-none" />
          <Input className="flex-1 h-full focus:border-none rounded-none" />
        </div>
      )}
      <button
        className="flex-initial h-10 mr-0-3 my-2 flex justify-center items-center text-secondary-foreground"
        onClick={() => setIsHsl(!isHsl)}
      >
        <p>HEX</p>
        <ChevronsUpDown className="size-5" />
      </button>
    </div>
  );
};

export default PickColor;
