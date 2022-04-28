/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState, useEffect } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'

function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(' ')
}

type SdkConfigSelectorProps = {
  label: string
  fieldname: string
  setRepo: (value: boolean | ((prevVar: boolean) => boolean)) => void
  repo: {}
}

const RepoSelector: React.FC<SdkConfigSelectorProps> = (props) => {
  const [repos, setRepos] = useState([]);
  const {repo, setRepo} = props;

    const fetchRepos = async () => {
    const response = await fetch(`/api/repos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    setRepos(data.data);
  }

  useEffect(() => {
    if (repos?.length < 1) {
      fetchRepos();
    }
  }, []);


  return (
    <>    <Combobox as="div" value={repo} onChange={setRepo}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">GitHub Repo</Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          name={props.fieldname}
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => {
            return event.target.value
          }}
          displayValue={(repo) => repo?.name}
          
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {repos.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {repos.map((repo) => (
              <Combobox.Option
                key={repo.name}
                value={repo}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span className={classNames(selected && 'font-semibold')}>{repo.name}</span>
                      <span
                        className={classNames(
                          'ml-2 truncate text-gray-500',
                          active ? 'text-indigo-200' : 'text-gray-500'
                        )}
                      >
                        {repo.description}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  </>
  )
}

export default RepoSelector;