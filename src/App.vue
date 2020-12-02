<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-btn target="_blank" @click="readAllCocktails()">
        <span>Add cocktail</span>
      </v-btn>
      <div>{{ allCocktails }}</div>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "./firebase";
// import axios from "axios";
const db = firebase.firestore();

export default {
  name: "App",
  components: {},

  data: () => ({
    cocktail: {
      name: "",
      instructions: "",
      ingredients: [],
      measurements: [],
    },
    allCocktails: [],
  }),
  methods: {
    readAllCocktails() {
      let cocktailsData = [];
      db.collection("cocktails")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
           cocktailsData.push({
              id: doc.id,
              name: doc.data().name,
              instructions: doc.data().instructions,
              ingredients: doc.data().ingredients,
              measurements: doc.data().measurements
            });
            console.log(doc.id, " => ", doc.data());
          });
          this.allCocktails = cocktailsData
          return cocktailsData
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      
      
    }

    // getCocktailsByLetter(letter) {
    //   var path =
    //     "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + letter;
    //   axios.get(path).then((response) => {
    //     var drinks = response.data.drinks;
    //     if (drinks != null) {
    //       this.info = {
    //         ...this.info,
    //         ...drinks,
    //       };
    //       drinks.forEach((drink) => {
    //         if (drink.strAlcoholic == "Alcoholic") {
    //           this.formatCocktail(drink);
    //         }
    //       });
    //     }
    //   });
    // },
    // getAllCocktails() {
    //   this.alphabet.forEach((letter) => {
    //     console.log(letter);
    //     this.getCocktailsByLetter(letter);
    //   });
    // },

    // formatCocktail(drink) {
    //   var ingredients = [];
    //   var measurements = [];
    //   this.cocktail.name = drink.strDrink;
    //   this.cocktail.instructions = drink.strInstructions;
    //   for (var i = 1; i <= 15; i++) {
    //     var str = "strIngredient" + i.toString();
    //     if (drink[str] != null) {
    //       ingredients.push(drink[str]);
    //     }
    //   }
    //   this.cocktail.ingredients = ingredients;
    //   for (i = 1; i <= 15; i++) {
    //     str = "strMeasure" + i.toString();
    //     if (drink[str] != null) {
    //       measurements.push(drink[str]);
    //     }
    //   }
    //   this.cocktail.measurements = measurements;
    //   this.addCocktail();
    // },

    // addCocktail() {
    //   db.collection("cocktails")
    //     .add({
    //       name: this.cocktail.name,
    //       instructions: this.cocktail.instructions,
    //       ingredients: this.cocktail.ingredients,
    //       measurements: this.cocktail.measurements,
    //     })
    //     .then(() => {
    //       console.log("Document successfully written!");
    //     })
    //     .catch((error) => {
    //       console.error("Error writing document: ", error);
    //     });
    // },
  },
};
</script>
