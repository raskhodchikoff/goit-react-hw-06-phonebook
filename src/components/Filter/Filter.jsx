import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selector';
import { setFilter } from 'redux/phonebookSlice';

import { Label } from 'components/Filter/Filter.styled';
import { Box } from './../Box';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const onFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <Box as="div">
      <Label htmlFor="text">
        <span>Find contacts by name</span>
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={onFilter}
          autoComplete="off"
        />
      </Label>
    </Box>
  );
};
