import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';

class CategoryButton extends React.Component {
  state = {
    category: this.props.category
  };

  handleChange = event => {
    console.log(event.target.value)
    if (event.target.value === '') return;
    const newCategory = event.target.value.split(',');
    this.setState({ category: newCategory });
    this.props.changeCategory(newCategory);    
    // console.log("handling change", newCategory);
  };

  render() {
    // create new array so we can mutate it with sort() AND change to tuples to keep value constant
    console.log(this.props.categories);
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
          {[ currentCategory, ...categories.filter(val => val[0] !== currentCategory[0]) ]
            .map(category => {
            // tuples, category[0] is the string, category[1] is the categoryId
              return (
                <option
                  key={category[1]}
                  value={`${category.join(',')}`}
                >{category[0]}</option>
              );
            })
          }
        </Select>
      </FormControl>
    );
  }
}

export default CategoryButton;