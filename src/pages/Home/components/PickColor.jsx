import { HexColorInput, HexColorPicker } from 'react-colorful';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useContext } from 'react';
import { HandleThemmingContext } from '@/context/HandleThemming';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';

const PickColor = () => {
  const { primaryColor, setPrimaryColor } = useContext(HandleThemmingContext);
  return (
    <div className="shadow-sm flex items-center gap-2 rounded-full border border-muted-foreground/50 min-w-56">
      <Popover>
        <PopoverTrigger asChild>
          <small className="mx-3 my-2 size-8 bg-primary rounded-full cursor-pointer"></small>
        </PopoverTrigger>
        <PopoverContent asChild className="w-fit p-0 bg-transparent">
          <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
        </PopoverContent>
      </Popover>
      <div className="flex-1 h-full flex items-center">
        <p className="flex-initial">#</p>
        <HexColorInput
          className="h-full flex-1"
          color={primaryColor}
          onChange={setPrimaryColor}
        />
      </div>
      <button className='flex-initial h-10 mx-3 my-2 flex justify-center items-center text-secondary-foreground'>
        <p>HEX</p>
        <ChevronsUpDown className="size-5" />
      </button>
    </div>
  );
};

export default PickColor;
