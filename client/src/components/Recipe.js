import React from "react";
import { Card } from "react-bootstrap";

const Recipe = ({ title, description }) => {
  return (
    //   <div>
    //        <h3>{title}</h3>
    //     <p>{description}</p>
    //       </div>

    <Card className="recipe">
      <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Recipe;
