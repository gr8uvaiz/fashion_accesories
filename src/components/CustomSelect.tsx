import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  disabled = false,
  searchable = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          relative w-full px-4 py-3 rounded-lg border-2 transition-all cursor-pointer
          ${error ? "border-red-500" : "border-slate-200 dark:border-slate-700"}
          ${disabled ? "bg-slate-100 dark:bg-slate-800 cursor-not-allowed opacity-60" : "bg-white dark:bg-slate-900 hover:border-primary"}
          ${isOpen ? "border-primary ring-2 ring-primary/20" : ""}
        `}
      >
        <div className="flex items-center justify-between">
          <span
            className={
              selectedOption
                ? "text-slate-900 dark:text-white"
                : "text-slate-400"
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span
            className={`material-icons text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          >
            expand_more
          </span>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border-2 border-primary rounded-lg shadow-2xl max-h-64 overflow-hidden">
          {searchable && (
            <div className="p-2 border-b border-slate-200 dark:border-slate-700">
              <div className="relative">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  search
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-primary"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          <div className="overflow-y-auto max-h-52 custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`
                    px-4 py-3 cursor-pointer transition-colors flex items-center justify-between
                    ${option.value === value ? "bg-primary/10 text-primary font-medium" : "hover:bg-slate-50 dark:hover:bg-slate-800"}
                  `}
                >
                  <span>{option.label}</span>
                  {option.value === value && (
                    <span className="material-icons text-primary text-sm">
                      check
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-slate-400">
                No options found
              </div>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CustomSelect;
