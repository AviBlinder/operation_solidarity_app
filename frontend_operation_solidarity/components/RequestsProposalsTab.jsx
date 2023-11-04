'use client';
import { useState } from 'react';

const RequestsProposalsTab = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { name: 'Requests', type: 'request', current: true },
    { name: 'Proposals', type: 'request', current: false },
  ];

  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
    // Logic to display content based on the selected tab or navigate to a new URL
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-[90%] rounded-md border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
          value={currentTab}
          onChange={(e) => handleTabClick(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="">
          <div className="-mb-px flex mx-2" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={classNames(
                  currentTab === tab.name
                    ? 'border-secondary-500 text-secondary-600 '
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'mx-4 w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium'
                )}
                aria-current={currentTab === tab.name ? 'page' : undefined}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestsProposalsTab;
