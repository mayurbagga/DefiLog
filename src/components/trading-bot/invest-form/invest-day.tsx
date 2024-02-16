'use client';

// static data
import { investFormData } from '@/data/static/trading-data';

import cn from 'classnames';
import { useState } from 'react';
import { Listbox } from '@/components/ui/listbox';
import InputLabel from '@/components/ui/input-label';
import { Transition } from '@/components/ui/transition';

// import icons
import { ChevronDown } from '@/components/icons/chevron-down';
import Text from '../../ui/text';
import VerticalThreeDots from '../../icons/vertical-three-dots';

export default function InvestDay() {
  let [state, setState] = useState(investFormData[0]);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      className="rounded-md p-4 border-2"
    >
      <div>
        <span className="mb-1.5 ml-1 block text-xs uppercase text-gray-600 dark:text-gray-400">
          Frequency
        </span>
        <div className="relative">
          <Listbox value={state} onChange={setState}>
            <Listbox.Button className="uppercase flex h-10 w-32 items-center justify-between rounded-lg border border-[#E2E8F0] bg-gray-200/50 px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-light-dark dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
              <div className="flex items-center mr-3">{state.name}</div>
              <ChevronDown />
            </Listbox.Button>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-light-dark xs:p-2">
                {investFormData.map((option) => (
                  <Listbox.Option key={option.id} value={option}>
                    {({ selected }) => (
                      <div
                        className={cn(
                          'flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100',
                          selected
                            ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700/70',
                        )}
                      >
                        {option.name}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>
      <div className='border-x-2 h-11 mt-4'>
       
      </div>
      <div>
        <span className="mb-1.5 mr-2 block text-right text-xs uppercase text-gray-600 dark:text-gray-400">
          How many times
        </span>
        <div className="relative">
          <input
            className="uppercase flex text-right h-10 w-32 items-center justify-between rounded-lg border border-[#E2E8F0] bg-gray-200/50 px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-light-dark dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5"
            type="text"
            name="how-many-times"
            id="1"
          />
        </div>
      </div>
    </div>
  );
}
