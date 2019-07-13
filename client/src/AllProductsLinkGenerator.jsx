import React from 'react';
import { StyledLink } from './elements.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Link = ({ id, name }) => (
  <StyledLink href={`/products/${id}`}>
    {id}. {name} >
  </StyledLink>
);

const AllProductsLinkGenerator = ({ allProducts }) =>
  allProducts.length > 1 ? (
    allProducts.map(({ id, title }) => <Link key={'link-' + id} id={id} name={title} />)
  ) : (
      <CircularProgress style={{ margin: '10% 50%' }} color="primary" key={'cp-' + id} />
    );

export default AllProductsLinkGenerator;
