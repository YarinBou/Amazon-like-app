import React from "react";

export default function Rating(props) {
  const { data } = props;
  return (
    <div className="review card card-body">
        {data.text}
    </div>
  );
}
