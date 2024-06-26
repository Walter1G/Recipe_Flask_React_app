import React from "react";
import { Card } from "react-bootstrap";
import {Modal, Button} from 'react-bootstrap'

const Recipe = ({ title, description, onClick, onDelete }) => {
  return (
    //   <div>
    //        <h3>{title}</h3>
    //     <p>{description}</p>
    //       </div>

    <Card className="recipe">
      <Card.Body>
              <Card.Title>{title}</Card.Title>
              <p>{description}</p>
              <Button variant="primary" onClick={onClick}>Update</Button>
              {" "}
              <Button variant="danger" onClick={onDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default Recipe;
