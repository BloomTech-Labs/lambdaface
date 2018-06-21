import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';

class CategoryButton extends React.Component {
  state = {
    category: this.props.category
  };

  handleChange = event => {
    if (event.target.value === '') return;
    const newCategory = event.target.value.split(',');
    this.setState({ category: newCategory });
    this.props.changeCategory(newCategory);    
    // console.log("handling change", newCategory);
  };

  render() {
    // create new array so we can mutate it with sort() AND change to tuples to keep value constant
    const categories = this.props.categories.slice(1).map((cat, i) => [cat, i+1]);
    const currentCategory = this.state.category;
    return (
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select
          native
          onChange={this.handleChange}
        >
          {/* Sorts the array, moving the currentCategory to the 0th index and leaving the rest in the original order */}
          {categories.sort((a, b) => a[0].split(" ").join("") === currentCategory[0].split(" ").join("") ? -1 : b[0].split(" ").join("") === currentCategory[0].split(" ").join("") ? 1 : 0).map((cat,i) => {
            // tuples, cat[0] is the string, cat[1] is the categoryId
            return <option key={Math.random()} value={`${cat[0]},${cat[1]}`}>{cat[0]}</option>
          })}
        </Select>
      </FormControl>
    );
  }
}

export default CategoryButton;