import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../client/src/App';
import AllProductsLinkGenerator, {
  Link,
} from '../client/src/AllProductsLinkGenerator';

describe('renders homepage', () => {
  it('renders 100 items from database', () => {
    const AppComponent = shallow(<App />);
    const allDummyProducts = [
      { title: 'test product 1', id: '1' },
      { title: 'test product 2', id: '2' },
      { title: 'test product 3', id: '3' },
      { title: 'test product 4', id: '4' },
    ];
    const AllProductsLinkGeneratorComponent = mount(
      <AllProductsLinkGenerator allProducts={allDummyProducts} />
    );
    console.log(AllProductsLinkGeneratorComponent.debug());
    expect(AppComponent).toBeDefined();
    // expect(AllProductsLinkGeneratorComponent.find(<Link />)).toHaveLength(4);
    expect(AllProductsLinkGeneratorComponent.find('.bPeFxW')).toHaveLength(4);
  });
});

describe('title, seller, price, color, color buttons, and description exist', () => {
  // check for title
  // it('renders a title for a product', () => {
  // })
  // check for seller
  // check for price
  // check for color
  // check for color selection buttons
  // check for description
});

describe('color selection buttons change color', () => {
  // check state and make sure that the color on the page is the same as the first color in the array
  // click one of the buttons
  // make sure color: reflects that change.
});
