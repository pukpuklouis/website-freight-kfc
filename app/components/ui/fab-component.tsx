import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { SiLine } from 'react-icons/si';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '~/components/ui/dialog';

interface FABProps {
  qrValue: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'responsive';
  variant?: 'default' | 'outline' | 'ghost';
}

export function FAB({ 
  qrValue, 
  position = 'responsive',
  variant = 'default'
}: FABProps) {
  const positionClasses = {
    'bottom-right': 'bottom-12 right-4',
    'bottom-left': 'bottom-12 left-4',
    'top-right': 'top-24 right-4',
    'top-left': 'top-24 left-4',
    // Fixed responsive positioning - bottom on small screens, top on md and up
    'responsive': 'bottom-24 right-4 md:bottom-auto md:top-24 md:right-4'
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className={`fixed ${positionClasses[position]} rounded-full flex items-center w-14 h-14 justify-center shadow-lg z-50 bg-green-600 dark:bg-green-900 dark:hover:bg-green-700 hover:bg-green-700 transition-all duration-200 ease-in-out`}
        >
          <SiLine className="text-[var(--gray-2)] dark:text-[var(--gray-11)] dark:hover:text-[var(--gray-12)] min-w-6 min-h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-w-lg mx-auto sm:w-[80vw] md:w-[70vw] lg:w-[30vw] rounded-2xl border-1">
        <div className="flex justify-center p-4 rounded-md">
          <QRCodeSVG
            value={qrValue}
            size={200}
            level="H"
            includeMargin
            className="w-full max-w-[200px]"
          />
        </div>
        <DialogFooter>
          <DialogTitle className="text-md font-semibold mx-auto">加line快速詢問</DialogTitle>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
