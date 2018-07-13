import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';

class CategoryButton extends React.Component {

  handleChange = event => {
    if (event.target.value === '') return;
    const newCategory = event.target.value.split(',');
    this.props.changeCategory(newCategory);    
    // console.log("handling change", newCategory);
  };

  render() {
    // create new array so we can mutate it with sort() AND change to tuples to keep value constant
    const categories = this.props.categories.slice(1).map((cat, i) => [cat, i+1]);
    const currentCategory = this.props.category;
    return (
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select
          native
          onChange={this.handleChange}
        >
          {/* TODO: fix categories */}
          {/* tuples, category[0] is the string, category[1] is the categoryId */}
          {[ categories.find(val => val[1] === currentCategory[1]),
            ...categories.filter(val => val[0].replace(' ', '') !== currentCategory[0]) ]
            .map(category => (
              <option
                key={category[1]}
                value={`${category.join(',')}`}
              >{category[0]}</option>
            ))
          }
        </Select>
      </FormControl>
    );
  }
}

export default CategoryButton;