import React from 'react';
import {
  Title,
  Description,
  Price,
  Seller,
  Color,
  CurrentColor,
} from './elements.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';

const Colors = ({ children, updateCurrentColor, currentColor }) =>
  children
    ? React.Children.map(children, (item) =>
        item ? (
          <Color
            itemColor={item}
            currentColor={currentColor}
            onClick={() => updateCurrentColor(item)}
          >
            <div
              style={{
                backgroundColor: `${item}`,
                width: '100%',
                height: '100%',
                borderRadius: '15px',
              }}
            />
          </Color>
        ) : null
      )
    : null;

const loadingMessage = 'Loading...';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: loadingMessage,
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
  }

  updateCurrentColor(item) {
    console.log('Products - updateCurrentColor for ' + JSON.stringify(item));

    this.setState((state) => ({
      currentColor: item,
    }));
  }

  componentDidMount() {
    console.log('Products - componentDidMount for ' + this.props.currentProduct);
    // TODO: Fix this.props.currentProduct.id is undefined
    this.setState((state) => ({
      currentColor: '',
    }));
  }

  render() {
    let {
      id,
      title,
      description,
      product_price,
      seller,
      colors,
    } = this.props.currentProduct;

    return (
      <div key={id} style={{ paddingTop: '75px', paddingLeft: '25px' }}>
        {title ? (
          <>
            <Title>{title}</Title>
            <Seller>{seller}</Seller>
            <hr />
            <Price>{product_price}</Price>
            <CurrentColor>
              Color:{' '}
              <div
                style={{
                  fontWeight: '700',
                  display: 'inline-block',
                  color: '#111',
                }}
              >
                {this.state.currentColor}
              </div>
            </CurrentColor>
            <Colors
              currentColor={this.state.currentColor}
              updateCurrentColor={this.updateCurrentColor}
            >
              {colors}
            </Colors>
            <Description>
              <ul style={{ listStylePosition: 'inside', paddingLeft: '0px' }}>
                {description ? (
                  description.split('\n').map((item) => <li>{item}</li>)
                ) : (
                  <h3>{loadingMessage}</h3>
                )}
              </ul>
            </Description>
          </>
        ) : (
          <CircularProgress
            style={{ margin: '10% 50%' }}
            color="rgb(35, 47, 62)"
          />
        )}
      </div>
    );
  }
}

export default Product;
