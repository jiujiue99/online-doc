import React from "react";

export default function useLoginState() {
  const [data, setData] = React.useState([]);
  return [data, setData];
}
