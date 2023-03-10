import React, { useReducer } from 'react';
import './CarCard.scss';
import nexiaImg from '../images/nexia.png';

const featuresArr = {
  amount: 26395,
  totalAmount: 26395,
  additionalFeatures: [
    {
      id: 1,
      name: 'V-6 engine',
      price: 1500,
    },
    {
      id: 2,
      name: 'Premium sound system',
      price: 500,
    },
    {
      id: 3,
      name: 'Rear spoiler',
      price: 250,
    },
    {
      id: 4,
      name: 'Racing detail package',
      price: 1500,
    },
  ],

  addedFeatures: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        addedFeatures: [...state.addedFeatures, action.payload],
        totalAmount: state.totalAmount + action.payload.price,
        additionalFeatures: state.additionalFeatures.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case 'remove':
      return {
        ...state,
        additionalFeatures: [...state.additionalFeatures, action.payload],
        totalAmount: state.totalAmount - action.payload.price,
        addedFeatures: state.addedFeatures.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      throw new Error('Error');
  }
};

const CarCard = () => {
  const [state, dispatch] = useReducer(reducer, featuresArr);

  const add = (item) => {
    dispatch({ type: 'add', payload: item });
  };

  const remove = (item) => {
    dispatch({ type: 'remove', payload: item });
  };

  return (
    <div className="car">
      <div className="car__card">
        <img className="car__card-img" src={nexiaImg} alt="nexia-img" />
        <h3 className="car__card-title">Nexia</h3>
        <h4 className="car__card-amount">Amount: ${state.amount}</h4>
        <h4 className="car__card-list-title">Added features:</h4>
        <ul className="car__card-list">
          {state.addedFeatures.length === 0 ? (
            <p className="car__card-list-text">
              You can purchase items from the store.
            </p>
          ) : (
            ''
          )}
          {state.addedFeatures.map((item) => {
            return (
              <li className="car__card-item" key={item.id}>
                <button
                  className="car__card-item-btn"
                  onClick={() => remove(item)}
                >
                  &times;
                </button>
                <p>{item.name}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="car__features">
        <h3 className="car__features-title">Additional Features</h3>
        <ul className="car__features-list">
          {state.additionalFeatures.length === 0 ? (
            <p className="car__features-list-text">Nice looking car!</p>
          ) : (
            ''
          )}
          {state.additionalFeatures.map((item) => {
            return (
              <li className="car__features-item" key={item.id}>
                <button
                  className="car__features-item-btn"
                  onClick={() => add(item)}
                >
                  Add
                </button>
                <p>
                  {item.name} <span>(+{item.price})</span>
                </p>
              </li>
            );
          })}
        </ul>
        <h4 className="car__features-amount">
          Total Amount: ${state.totalAmount}
        </h4>
      </div>
    </div>
  );
};

export default CarCard;
