import React from 'react'
import '../Canvas.css';
import '../index.css';

const DeckCard = () => {
    return (
        <div className="card col-md-3 code-font">
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    )
}
export default DeckCard;