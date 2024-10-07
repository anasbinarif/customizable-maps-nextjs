'use client';
import React, { createContext, useContext, useState } from 'react';

const BoxOrderContext = createContext();

export const BoxOrderProvider = ({ children }) => {
  const [boxOrderRows, setBoxOrderRows] = useState([
    'mapinfo',
    'imgs',
    'textlogo',
  ]);
  const [boxOrderRow1, setBoxOrderRow1] = useState(['map', 'locations']);
  const [boxOrderRow3, setBoxOrderRow3] = useState(['text', 'logo']);

  //   console.log(boxOrderRows);

  const moveBox1 = (fromIndex, toIndex) => {
    const updatedOrder = [...boxOrderRow1];
    const [movedItem] = updatedOrder.splice(fromIndex, 1);

    updatedOrder.splice(toIndex, 0, movedItem);
    setBoxOrderRow1(updatedOrder);
  };

  const moveBox3 = (fromIndex, toIndex) => {
    const updatedOrder = [...boxOrderRow3];
    const [movedItem] = updatedOrder.splice(fromIndex, 1);

    updatedOrder.splice(toIndex, 0, movedItem);
    setBoxOrderRow3(updatedOrder);
  };

  const moveRows = (fromIndex, toIndex) => {
    const updatedOrder = [...boxOrderRows];
    const [movedItem] = updatedOrder.splice(fromIndex, 1);

    updatedOrder.splice(toIndex, 0, movedItem);
    setBoxOrderRows(updatedOrder);
  };

  return (
    <BoxOrderContext.Provider
      value={{
        boxOrderRow1,
        moveBox1,
        boxOrderRow3,
        moveBox3,
        boxOrderRows,
        moveRows,
      }}
    >
      {children}
    </BoxOrderContext.Provider>
  );
};

export const useBoxOrder = () => {
  return useContext(BoxOrderContext);
};
