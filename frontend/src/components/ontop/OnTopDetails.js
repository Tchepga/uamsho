import React, { Component } from 'react';
import CartBook from '../utilities/CardBook';

class OnTopDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                "ANTHROPOLOGIE", "ART", "DROIT", "BIOLOGIE", "NATURE", "JEUNESSE", "ENTREPRISE"
            ],
            newBook: [
                { 'title': '1Mon Afrique à moi', 'author': "Patrick Tchepga", "likes": 2, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Père et Mère', 'author': "Paul Martin", "likes": 3, "prix": 20, "image": "", "category": "entreprenariat" },
                { 'title': 'La vallée perdue', 'author': "Paul Martin", "likes": 4, "prix": 52, "image": "", "category": "entreprenariat" },
                { 'title': 'Retour aux source', 'author': "Paul Martin", "likes": 3, "prix": 30, "image": "", "category": "entreprenariat" },
                { 'title': 'Mon avenir', 'author': "Ange Mougoue", "likes": 3, "prix": 20, "image": "", "category": "entreprenariat" },
                { 'title': "L'Afrique demain", 'author': "Ruben Njietcheu", "likes": 3, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Develeppement africain', 'author': "Aime cesar", "likes": 5, "prix": 70, "image": "", "category": "entreprenariat" },
                { 'title': "A la conquête du monde", 'author': "Ahmadou Ahidjo", "likes": 3, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Je suis fier de toi', 'author': "Paul Biya", "likes": 3, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Je vais changer le monde', 'author': "Patrick Tchepga", "likes": 3, "prix": 10, "image": "", "category": "entreprenariat" },
                { 'title': "Mes ancètres", 'author': "Nelly Kenne", "likes": 2, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'La vie', 'author': "Pascal Njamo", "likes": 1, "prix": 57, "image": "", "category": "entreprenariat" }
            ],
            bestSeller: [
                { 'title': '2Mon Afrique à moi', 'author': "Patrick Tchepga", "likes": 2, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Père et Mère', 'author': "Paul Martin", "likes": 3, "prix": 20, "image": "", "category": "entreprenariat" },
                { 'title': 'La vallée perdue', 'author': "Paul Martin", "likes": 4, "prix": 52, "image": "", "category": "entreprenariat" },
                { 'title': 'Retour aux source', 'author': "Paul Martin", "likes": 3, "prix": 30, "image": "", "category": "entreprenariat" },
                { 'title': 'Mon avenir', 'author': "Ange Mougoue", "likes": 3, "prix": 20, "image": "", "category": "entreprenariat" },
                { 'title': "L'Afrique demain", 'author': "Ruben Njietcheu", "likes": 3, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Develeppement africain', 'author': "Aime cesar", "likes": 5, "prix": 70, "image": "", "category": "entreprenariat" },
                { 'title': "A la conquête du monde", 'author': "Ahmadou Ahidjo", "likes": 3, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Je suis fier de toi', 'author': "Paul Biya", "likes": 3, "prix": 50, "image": "", "category": "entreprenariat" }
            ],
            entreprenariat: [
                { 'title': '3Mon Afrique à moi', 'author': "Patrick Tchepga", "likes": 2, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Père et Mère', 'author': "Paul Martin", "likes": 3, "prix": 20, "image": "", "category": "entreprenariat" },
                { 'title': 'Develeppement africain', 'author': "Aime cesar", "likes": 5, "prix": 70, "image": "", "category": "entreprenariat" },
                { 'title': "A la conquête du monde", 'author': "Ahmadou Ahidjo", "likes": 3, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Je suis fier de toi', 'author': "Paul Biya", "likes": 3, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Je vais changer le monde', 'author': "Patrick Tchepga", "likes": 3, "prix": 10, "image": "", "category": "entreprenariat" },
                { 'title': "Mes ancètres", 'author': "Nelly Kenne", "likes": 2, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'La vie', 'author': "Pascal Njamo", "likes": 1, "prix": 57, "image": "", "category": "entreprenariat" }
            ],
            jeunesse: [
                { 'title': '4Mon Afrique à moi', 'author': "Patrick Tchepga", "likes": 2, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'APère et Mère', 'author': "Paul Martin", "likes": 3, "prix": 20, "image": "", "category": "entreprenariat" },
                { 'title': 'DZeveleppement africain', 'author': "Aime cesar", "likes": 5, "prix": 70, "image": "", "category": "entreprenariat" },
                { 'title': "A la conquête du monde", 'author': "Ahmadou Ahidjo", "likes": 3, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Je suis fier de toi', 'author': "Paul Biya", "likes": 3, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'Je vais changer le monde', 'author': "Patrick Tchepga", "likes": 3, "prix": 10, "image": "", "category": "entreprenariat" },
                { 'title': "Mes ancètres", 'author': "Nelly Kenne", "likes": 2, "prix": 50, "image": "", "category": "entreprenariat" },
                { 'title': 'La vie', 'author': "Pascal Njamo", "likes": 1, "prix": 57, "image": "", "category": "entreprenariat" }
            ]
        }
    }
    
    render() {
        let bookData = []
        switch (this.props.choice) {
            case "Best seller":
                bookData = this.state.bestSeller
                break
        
            case "Entreprenariat":
                bookData = this.state.entreprenariat
                break
    
            case "Jeunesse":
                bookData = this.state.jeunesse
                break

            default:
                bookData = this.state.newBook
                break
        }
        let booksNodes = []
        for(let i = 0; i<bookData.length; i++) {
            booksNodes.push(
                <div className="col-4" key={i} >
                    <CartBook
                        title={bookData[i].title}
                        likes={bookData[i].likes}
                        author={bookData[i].author}
                        price={bookData[i].prix}
                        category={bookData[i].category}
                        image={bookData[i].image}
                    />
                </div>
            )
        }

        return (
            <div className="row mt-3">
                {booksNodes}
            </div>
        );
    }
}

export default OnTopDetails;