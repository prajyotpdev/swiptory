import React, { useState, useEffect } from "react";

const FilterForm = ({ data, onFilteredDataChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState(data);
  const [filterOptions, setFilterOptions] = useState([
    "This Week",
    "This Month",
    "This Year",
  ]);

  const filterItems = (val) => {
    setSelectedFilter(val);
  };

  useEffect(() => {
    if (selectedFilter) {
      const currentDate = new Date();
      const startDate = new Date(currentDate);

      switch (selectedFilter) {
        case "This Week":
          startDate.setDate(currentDate.getDate() - 7);
          break;
        case "This Month":
          startDate.setMonth(currentDate.getMonth() - 1);
          break;
        case "This Year":
          startDate.setFullYear(currentDate.getFullYear() - 1);
          break;
        default:
          break;
      }

      const filteredData = data.filter(
        (item) =>
          new Date(item.createdAt) >= startDate &&
          new Date(item.createdAt) <= currentDate
      );
      setFilteredItems(filteredData);
      onFilteredDataChange(filteredData);
    } else {
      setFilteredItems(data);
      onFilteredDataChange(data);
    }
  }, [selectedFilter, data, onFilteredDataChange]);
  return (
    <div className="container">
      <FilterOptions
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        changeOption={filterItems}
      />
      <div className="filter-form">
        <FilterItems data={filteredItems} />
      </div>
    </div>
  );
};

const FilterOptions = ({ filterOptions, selectedFilter, changeOption }) => {
  const handleChange = (e) => {
    const val = e.target.value;
    changeOption(val);
  };

  return (
    <div className="filter-options">
      <div className="filter-option">
        <select value={selectedFilter} onChange={handleChange}>
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const FilterItems = ({ data }) => {
  return (
    <div className="filter-items">
      {data.map((item) => (
        <div key={item.name} className="filter-item">
          {item.name}
        </div>
      ))}
    </div>
  );
};

const filterData = []; // Your filter data goes here

export default FilterForm;
