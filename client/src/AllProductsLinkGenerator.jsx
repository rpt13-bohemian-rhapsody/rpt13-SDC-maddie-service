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
    allProducts.map(({ id, title }) => <Link key={id} id={id} name={title} />)
  ) : (
      <CircularProgress style={{ margin: '10% 50%' }} color="rgb(35, 47, 62)" />
    );

export default AllProductsLinkGenerator;
