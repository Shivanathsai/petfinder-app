import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
});

//class component
//more powerful, can always be used even when state and lifecycle aren't needed
class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: []
        };
    }

    componentDidMount() {
        //returns a promise, which is an object which represents a future value
        petfinder.pet.find({ output: "full", location: "Chattanooga, TN" })
            .then(data => {
                let pets;

                if (data.petfinder.pets && data.petfinder.pets.pet) {
                    if (Array.isArray(data.petfinder.pets.pet)) {
                        pets = data.petfinder.pets.pet
                    } else {
                        [data.petfinder.pets.pet];
                    }
                } else {
                    pets = []
                }

                this.setState({
                    pets: pets
                })
            });
    }

    render() {
        // return React.createElement("div", {}, [
        //   React.createElement(
        //     "h1",
        //     { onClick: this.handleTitleClick },
        //     "Adopt Me!"
        //   ),
        //   React.createElement(Pet, {
        //     name: "Oreo",
        //     animal: "Cat",
        //     breed: "American Shorthair"
        //   }),
        //   React.createElement(Pet, {
        //     name: "Luna",
        //     animal: "Dog",
        //     breed: "Havanese"
        //   }),
        //   React.createElement(Pet, {
        //     name: "Indy",
        //     animal: "Dog",
        //     breed: "Golden Retriever"
        //   })
        // ]);

        //gets translated into the above via Parcel / Babel
        return (
            <div className="search">
                {this.state.pets.map(pet => {
                    let breed;

                    if (Array.isArray(pet.breeds.breed)) {
                        breed = pet.breeds.breed.join(', ')
                    } else {
                        breed = pet.breeds.breed
                    }
                    return (
                        <Pet
                            key={pet.id}
                            animal={pet.animal}
                            name={pet.name}
                            breed={breed}
                            media={pet.media}
                            location={`${pet.contact.city}, ${pet.contact.state}`}
                            id={pet.id}
                        />
                    )
                })}
            </div>
        );
    }
}

//this creates a new instance of the "class"
//could be React.createElement(App, {}, null) but this is the same
// render(React.createElement(App), document.getElementById("root"));

export default Results;
