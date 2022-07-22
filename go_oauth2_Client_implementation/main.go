package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

const clientID = "<your clientID>"
const clientSecret = "<your clientSecret>"

/*📝DTO to store the grabbed/parsed access_token*/
type OAuthAccessResponse struct {
	AccessToken string `json:"access_token"`
}

func main() {
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", fs)

	// to make external http request just like axios
	httpClient := http.Client{}

	/*Redirect route with handler*/
	http.HandleFunc("/oauth/redirect", func(w http.ResponseWriter, r *http.Request) {

		// STEP@1
		// grab the code in the url i.e request token attached by github oauth service provider
		err := r.ParseForm()
		if err != nil {
			fmt.Fprintf(os.Stdout, "could not parse query param code: %v", err)
			w.WriteHeader(http.StatusBadRequest)
		}
		code := r.FormValue("value")

		// STEP@2 to get access token
		// hit the github oauth service with parsed request token as code , client_id client_secret
		reqURL := fmt.Sprintf("https://github.com/login/oauth/access_token?client_id=%s&client_secret=%s&code=%s", clientID, clientSecret, code)
		req, err := http.NewRequest(http.MethodPost, reqURL, nil)
		if err != nil {
			fmt.Fprintf(os.Stdout, "could not create HTTP request: %v", err)
			w.WriteHeader(http.StatusBadRequest)
		}

		//📝 set header to get response in json
		req.Header.Set("accept", "application/json")

		// STEP@3 dispatch the request via httpClient created earlier
		res, err := httpClient.Do(req)
		if err != nil {
			fmt.Fprintf(os.Stdout, "could not send HTTP request: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
		}

		// runs just before exiting this function to make sure response body is not being altered
		defer res.Body.Close()

		// STEP@4 parse the response body to grab Oauth access token
		var t OAuthAccessResponse
		// store the response at address of t
		if err := json.NewDecoder(res.Body).Decode(&t); err != nil {
			fmt.Fprintf(os.Stdout, "could not parse JSON response: %v", err)
			w.WriteHeader(http.StatusBadRequest)
		}

		// STEP@5 Finally, send response to redirect the user to final welcome page in consumer application
		w.Header().Set("Location", "/welcome.html?access_token="+t.AccessToken)
		w.WriteHeader(http.StatusFound)
	})

	http.ListenAndServe(":3000", nil)
}
