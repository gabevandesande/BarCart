<template>
  <v-app>
    <v-main class="pa-5">
      <v-container>
        <v-row justify="center">
          <v-col md="4">
            <v-combobox
            label="Select ingredients"
              v-model="userIngredients"
              :items="all_ingredients"
              chips
              multiple
            >
            </v-combobox>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid>
        <v-row no-gutters>
          <v-col
            v-for="(cocktail, i) in filtered_cocktail_list"
            :key="i"
            md="4"
          >
            <v-card class="pa-5 ma-5 blue-grey--text" style="height: 300px">
              <div class="headline">
                <b>{{ cocktail.name }}</b>
              </div>
              <div>{{ cocktail.instructions }}</div>
              <div v-for="(ingredient, i) in cocktail.ingredients" :key="i">
                <b>{{ ingredient }}: </b>{{ cocktail.measurements[i] }}
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "./firebase";
const db = firebase.firestore();
const cocktailDb = db.collection("cocktails");

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
    userIngredients: [],
  }),

  created() {
    let cocktailsData = [];
    cocktailDb
      .orderBy("name")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cocktailsData.push({
            id: doc.id,
            name: doc.data().name,
            instructions: doc.data().instructions,
            ingredients: doc.data().ingredients,
            measurements: doc.data().measurements,
          });
        });
        this.allCocktails = cocktailsData;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },
  computed: {
    filtered_cocktail_list() {
      let checker = (arr, target) => target.every((v) => arr.includes(v));
      return this.allCocktails.filter((cocktail) => {
        return checker(cocktail.ingredients, this.userIngredients);
      });
    },

    all_ingredients() {
      var res = [];
      this.allCocktails.forEach((cocktail) => {
        res = res.concat(cocktail.ingredients);
      });
      return res;
    },
  },
  methods: {
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
