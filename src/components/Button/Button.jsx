import { LoadMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <LoadMore onClick={onClick} type="button">
      Load more
    </LoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
