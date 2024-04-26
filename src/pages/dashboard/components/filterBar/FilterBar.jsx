import styles from "./filterbarComponent.module.css";
import img1 from "../../../../assets/images/img1.png";
import { useDispatch } from "react-redux";
import { filterMusicItems } from "../../../../store/slices/feedSlice";
import { useState } from "react";

function FilterBar({ updateFeed }) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    type: "",
    company: "",
    colour: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilter = async () => {
    try {
      setFilters({
        headphoneType: "",
        company: "",
        colour: "",
        price: "",
      });
    } catch (error) {
      console.error("Error fetching filtered items:", error);
    }
  };
  const handleFilter = async () => {
    try {
      const allEmpty = Object.values(filters).every((value) => value === "");
      if (allEmpty) {
        alert("Please select at least one value in the filter.");
        return; // Exit the function early
      }
      const filteredFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== null && value !== ""
        )
      );
      const filterParams = Object.entries(filteredFilters).map(
        ([filterItem, filterValue]) => ({
          filterItem,
          filterValue,
        })
      );
      const requestBody = JSON.stringify(filterParams);
      dispatch(filterMusicItems(requestBody));
    } catch (error) {
      console.error("Error fetching filtered items:", error);
    }
  };

  return (
    <div className={styles.filterbar}>
      <select
        name="headphoneType"
        value={filters.headphoneType}
        onChange={handleChange}
      >
        <option value="">Type</option>
        <option value="Over-Ear Headphone">Over-Ear Headphone</option>
        <option value="In-Ear Headphone">In-Ear Headphone</option>
        <option value="On-Ear Headphone">On-Ear Headphone</option>
      </select>
      <select name="company" value={filters.company} onChange={handleChange}>
        <option value="">Company</option>
        <option value="boAt">boAt</option>
        <option value="Bose">Bose</option>
        <option value="Sony">Sony</option>
        {/* Add options for different companies */}
      </select>
      <select name="colour" value={filters.colour} onChange={handleChange}>
        <option value="">Colour</option>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Black">Black</option>
        {/* Add options for different colors */}
      </select>
      <select name="price" value={filters.price} onChange={handleChange}>
        <option value="">Choose Price</option>
        <option value="2000">less than 2000</option>
        <option value="3000">2000 - 3000</option>
        <option value="4000">3000 - 4000</option>
        <option value="5000">more than 4000</option>
      </select>
      <button onClick={handleFilter} className={styles.filterbutton}>Filter</button>
      <button onClick={clearFilter} className={styles.clearfilterbutton}>Clear Filters</button>
    </div>
  );
}

export default FilterBar;
