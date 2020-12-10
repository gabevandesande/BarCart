<template>
  <v-app>
    <v-main class="pa-5">
      <v-container class="section">
        <v-row><h1>BarCart</h1></v-row>
        <v-row justify="center"><h3>What do you have lying around?</h3></v-row>
        <v-row justify="center">
          <v-col md="3">
            <v-combobox
              label="Select Spirits"
              v-model="user_spirits"
              :items="all_spirits"
              chips
              multiple
            >
            </v-combobox>
          </v-col>
          <v-col md="3">
            <v-combobox
              label="Select ingredients"
              v-model="user_other_ingredients"
              :items="all_ingredients_except_spirits"
              chips
              multiple
            >
            </v-combobox>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid class="section">
        <div v-if="filtered_cocktail_list.length == 0">
          No recipes found with only selected ingredients, try selecting some
          more!
        </div>
        <v-row no-gutters>
          <v-col
            v-for="(cocktail, i) in filtered_cocktail_list"
            :key="i"
            md="4"
          >
            <v-card class="pa-5 ma-5 blue-grey--text" style="height: 400px">
              <div class="headline pb-2">
                <b>{{ cocktail.name }}</b>
              </div>
              <div class="pb-2">{{ cocktail.instructions }}</div>
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
    user_spirits: [],
    otherAlcohols: [
      "prosecco",
      "beer(Lager)",
      "champagne",
      "wine(red)",
      "wine(white)",
      "cider",
    ],
    user_other_ingredients: [],
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
            ingredients: doc.data().ingredients.map((i) => i.toLowerCase()),
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
        if (this.user_ingredients.length == 0) {
          return true;
        } else {
          return checker(this.user_ingredients, cocktail.ingredients);
        }
      });
    },

    all_ingredients_except_spirits() {
      var res = [];
      this.allCocktails.forEach((cocktail) => {
        res = res.concat(cocktail.ingredients.map((i) => i.toLowerCase()));
      });
      res = res.filter((i) => {
        if (this.all_spirits.includes(i)) {
          return false;
        } else {
          return true;
        }
      });
      return res.sort();
    },

    all_spirits() {
      return [
        "vodka",
        "gin",
        "whiskey",
        "rum (Light)",
        "rum (Dark)",
        "cognac",
        "scotch",
        "bourbon",
        "brandy",
        "rum",
        "everclear",
        "rum (Spiced)",
        "grain alcohol",
        "cachaca",
        "absinthe",
        "tequila",
        "mezcal",
        "sherry",
      ];
    },

    user_ingredients() {
      return [...this.user_spirits, ...this.user_other_ingredients]
    }
  },
  methods: {
    formatArrayCapitalize(a) {
      return a.map((i) => i.charAt(0).toUpperCase() + i.slice(1));
    },
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
<style lang="css">
.section {
  width: 1366px !important;
}
</style>