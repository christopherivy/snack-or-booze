import React from "react";
import { Link } from "react-router-dom";
import "./FoodMenu.css";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    ListGroup,
    ListGroupItem
} from "reactstrap";

function FoodMenu ({ menuItems, title = 'Food' }) {

    return (
        <section className="col-md-4">
            <Card>
                <CardBody>
                    <CardTitle className="font-weight-bold text-center">
                        { title } Menu
          </CardTitle>
                    <CardText>
                        Please select an item from our menu to see more details about the offerring.
          </CardText>
                    <ListGroup>
                        { menuItems.map(item => (
                            <Link to={ `/${item.type}/${item.id}` } key={ item.id }>
                                <ListGroupItem>{ item.name }</ListGroupItem>
                            </Link>
                        )) }
                    </ListGroup>
                </CardBody>
            </Card>
        </section>
    );
}

export default FoodMenu;
