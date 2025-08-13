import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  maxDisplayItems?: number;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search symptoms...",
  maxDisplayItems = 3
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get suggestions based on partial matches
  const getSuggestions = () => {
    if (!searchTerm) return [];
    return filteredOptions.slice(0, 8); // Show top 8 suggestions
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleRemove = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter(v => v !== value));
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get display text for selected items
  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    
    const selectedOptions = selectedValues.map(value => 
      options.find(opt => opt.value === value)?.label || value
    );

    if (selectedValues.length <= maxDisplayItems) {
      return selectedOptions.join(', ');
    }
    
    return `${selectedOptions.slice(0, maxDisplayItems).join(', ')} +${selectedValues.length - maxDisplayItems} more`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Input */}
      <div
        onClick={handleToggle}
        className={`min-h-[48px] px-4 py-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-200 ${
          isOpen ? 'ring-2 ring-rose-500 border-transparent' : 'hover:border-gray-400'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 flex flex-wrap gap-1">
            {selectedValues.length === 0 ? (
              <span className="text-gray-500">{placeholder}</span>
            ) : (
              <>
                {selectedValues.slice(0, maxDisplayItems).map(value => {
                  const option = options.find(opt => opt.value === value);
                  return (
                    <span
                      key={value}
                      className="inline-flex items-center px-2 py-1 bg-rose-100 text-rose-800 rounded-full text-sm font-medium"
                    >
                      {option?.label || value}
                      <button
                        onClick={(e) => handleRemove(value, e)}
                        className="ml-1 hover:bg-rose-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
                {selectedValues.length > maxDisplayItems && (
                  <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    +{selectedValues.length - maxDisplayItems} more
                  </span>
                )}
              </>
            )}
          </div>
          <div className="flex items-center space-x-2 ml-2">
            {selectedValues.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Clear all"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`} />
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No symptoms found matching "{searchTerm}"
              </div>
            ) : (
              <div className="py-1">
                {filteredOptions.map(option => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`px-4 py-2 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedValues.includes(option.value)
                        ? 'bg-rose-50 text-rose-700 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{option.label}</span>
                      {selectedValues.includes(option.value) && (
                        <div className="w-4 h-4 bg-rose-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {selectedValues.length > 0 && (
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {selectedValues.length} symptom{selectedValues.length !== 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={handleClearAll}
                  className="text-rose-600 hover:text-rose-700 font-medium"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;