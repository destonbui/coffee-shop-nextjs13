import React from "react";

interface Props {
  children: React.ReactNode;
}

const ProductsLayout = ({ children }: Props) => {
  return <div>layout {children}</div>;
};

export default ProductsLayout;
