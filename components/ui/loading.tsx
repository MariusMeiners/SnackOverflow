import React, { useState } from 'react';
import { UpdateIcon } from '@radix-ui/react-icons';

const Loading: React.FC<HTMLElement> = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex space-x-4 animate-spin text-white">
            <UpdateIcon className="w-24 h-24 text-green-400" />
          </div>
        </div>
      )
}
export { Loading }
