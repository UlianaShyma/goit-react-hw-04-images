import { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../../icons/searchIcon.svg';
import {
  SearchHed,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => {
    setInputValue(event.currentTarget.value.toLowerCase());
  };

  const onFormSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }
    onSubmit(inputValue.trim());
    setInputValue('');
  };

  return (
    <SearchHed>
      <SearchForm onSubmit={onFormSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          <SearchIcon width="25" height="25" />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={inputValue}
        />
      </SearchForm>
    </SearchHed>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
