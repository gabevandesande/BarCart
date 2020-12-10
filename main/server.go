package main

import (
	"fmt"
	"log"
	"net/http"
)

func homePageHandler(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintf(w, "hello world")
	checkError(err)
}

func checkError(err error) {
	if err != nil {
		log.Panic(err)
	}
}

func main() {
	// Serve static files from the frontend/dist directory.
	fs := http.FileServer(http.Dir("../barcart/dist"))
	http.Handle("/", fs)

	// Start the server.
	fmt.Println("Server listening on port 8000")
	log.Panic(
		http.ListenAndServe(":8000", nil),
	)
}