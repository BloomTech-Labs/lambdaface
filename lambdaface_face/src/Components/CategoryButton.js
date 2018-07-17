import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';

class CategoryButton extends React.Component {

  setupCategories = () => {
    const { categories, category } = this.props;
    
    const categorySetup = categories
      .slice(1)
      .map((category, i) => [category, `${i + 1}`]);

    const currentCategory = categorySetup.find(val => val[1] === `${category[1]}`);

    const remainingCategories = categorySetup
      .filter(val => val[0].replace(' ', '') !== currentCategory[0]);

    return [
      currentCategory,
      ...remainingCategories,
    ];
  }

  handleChange = event => {
    if (event.target.value === '') return;  
    const newCategory = event.target.value.split(',');
    this.props.changeCategory(newCategory);    
    // console.log("handling change", newCategory);
  };

  render() {
    return (
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select
          native
          onChange={this.handleChange}
        >
          {/* TODO: fix categories */}
          {/* tuples, category[0] is the string, category[1] is the categoryId */}
          {this.setupCategories()
            .map(category => (
              <option
                key={category[1]}
                value={`${category.join(',')}`}
              >
                {category[0]}
              </option>
            ))
          }
        </Select>
      </FormControl>
    );
  }
}

export default CategoryButton;